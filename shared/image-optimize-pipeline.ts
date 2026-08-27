import decodeJpeg from '@jsquash/jpeg/decode'
import decodePng from '@jsquash/png/decode'
import resize from '@jsquash/resize'
import decodeWebp from '@jsquash/webp/decode'
import encodeWebp from '@jsquash/webp/encode'
import {
  IMAGE_OPTIMIZE,
  pathnameWithWebpExtension,
  scaleToMaxEdge,
  shouldSkipImageOptimize,
  type RasterImage
} from './image-optimize'
import { ensureJsquashRuntime } from './jsquash-runtime'

export function rasterToImageData(raster: RasterImage): ImageData {
  const clamped = raster.data instanceof Uint8ClampedArray
    ? raster.data
    : new Uint8ClampedArray(raster.data)
  return new ImageData(clamped, raster.width, raster.height)
}

export interface OptimizedImageResult {
  buffer: ArrayBuffer
  contentType: string
  pathname?: string
  filename?: string
}

export async function decodeImage(buffer: ArrayBuffer, mime: string): Promise<RasterImage | null> {
  await ensureJsquashRuntime()
  let decoded: ImageData | null = null

  if (mime === 'image/jpeg' || mime === 'image/jpg') {
    decoded = await decodeJpeg(buffer) as ImageData | null
  } else if (mime === 'image/png') {
    decoded = await decodePng(buffer) as ImageData | null
  } else if (mime === 'image/webp') {
    decoded = await decodeWebp(buffer) as ImageData | null
  }

  if (!decoded) {
    return null
  }

  return {
    data: decoded.data instanceof Uint8ClampedArray
      ? new Uint8Array(decoded.data)
      : new Uint8Array(decoded.data),
    width: decoded.width,
    height: decoded.height
  }
}

/** Resize + WebP encode for blob storage (Workers + Node). */
export async function optimizeImageBuffer(
  buffer: ArrayBuffer,
  mime: string,
  opts?: { pathname?: string, filename?: string }
): Promise<OptimizedImageResult | null> {
  if (shouldSkipImageOptimize(mime, buffer.byteLength)) {
    return null
  }

  try {
    const decoded = await decodeImage(buffer, mime)

    if (!decoded) {
      return null
    }

    const target = scaleToMaxEdge(decoded.width, decoded.height, IMAGE_OPTIMIZE.maxEdgePx)
    let image: RasterImage = decoded

    if (target.width !== decoded.width || target.height !== decoded.height) {
      const resized = await resize(rasterToImageData(decoded), {
        width: target.width,
        height: target.height
      })

      if (!resized) {
        return null
      }

      image = {
        data: new Uint8Array(resized.data),
        width: resized.width,
        height: resized.height
      }
    }

    const webpBuffer = await encodeWebp(rasterToImageData(image), {
      quality: IMAGE_OPTIMIZE.webpQuality
    })

    if (!webpBuffer) {
      return null
    }

    return {
      buffer: webpBuffer,
      contentType: IMAGE_OPTIMIZE.outputMime,
      pathname: opts?.pathname ? pathnameWithWebpExtension(opts.pathname) : undefined,
      filename: opts?.filename
        ? opts.filename.replace(/\.[^./]+$/, IMAGE_OPTIMIZE.outputExt)
        : undefined
    }
  } catch {
    return null
  }
}
