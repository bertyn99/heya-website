import decodeJpeg from '@jsquash/jpeg/decode'
import decodePng from '@jsquash/png/decode'
import resize from '@jsquash/resize'
import decodeWebp from '@jsquash/webp/decode'
import encodeWebp from '@jsquash/webp/encode'
import { ensureJsquashRuntime } from './jsquash-runtime'

/** CMS uploads → WebP in R2 / local blob. No on-demand IPX. */
export const IMAGE_OPTIMIZE = {
  maxEdgePx: 2560,
  webpQuality: 82,
  skipWebpUnderBytes: 512 * 1024,
  outputMime: 'image/webp',
  outputExt: '.webp'
} as const

export type RasterImage = {
  data: Uint8Array
  width: number
  height: number
}

export function pathnameWithWebpExtension(pathname: string) {
  const slash = pathname.lastIndexOf('/')
  const dir = slash >= 0 ? pathname.slice(0, slash + 1) : ''
  const file = slash >= 0 ? pathname.slice(slash + 1) : pathname
  const base = file.replace(/\.[^./]+$/, '')
  return `${dir}${base}${IMAGE_OPTIMIZE.outputExt}`
}

export function scaleToMaxEdge(width: number, height: number, maxEdge: number) {
  const longest = Math.max(width, height)

  if (longest <= maxEdge) {
    return { width, height }
  }

  const ratio = maxEdge / longest
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  }
}

function shouldSkipImageOptimize(mime: string, byteLength: number) {
  if (!mime.startsWith('image/')) {
    return true
  }

  if (mime === IMAGE_OPTIMIZE.outputMime && byteLength <= IMAGE_OPTIMIZE.skipWebpUnderBytes) {
    return true
  }

  return false
}

function rasterToImageData(raster: RasterImage): ImageData {
  const clamped = raster.data instanceof Uint8ClampedArray
    ? raster.data
    : new Uint8ClampedArray(raster.data)
  return new ImageData(clamped, raster.width, raster.height)
}

async function decodeImage(buffer: ArrayBuffer, mime: string): Promise<RasterImage | null> {
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

export type IngestOptimizeResult
  = { kind: 'skipped' }
    | { kind: 'ok', buffer: ArrayBuffer, contentType: string, pathname?: string }
    | { kind: 'failed', error: Error }

/** Resize + WebP encode for blob storage (Workers + Node). */
export async function optimizeImageBuffer(
  buffer: ArrayBuffer,
  mime: string,
  opts?: { pathname?: string }
): Promise<IngestOptimizeResult> {
  if (shouldSkipImageOptimize(mime, buffer.byteLength)) {
    return { kind: 'skipped' }
  }

  try {
    const decoded = await decodeImage(buffer, mime)

    if (!decoded) {
      return { kind: 'failed', error: new Error(`Décodage impossible (${mime})`) }
    }

    const target = scaleToMaxEdge(decoded.width, decoded.height, IMAGE_OPTIMIZE.maxEdgePx)
    let image: RasterImage = decoded

    if (target.width !== decoded.width || target.height !== decoded.height) {
      const resized = await resize(rasterToImageData(decoded), {
        width: target.width,
        height: target.height
      })

      if (!resized) {
        return { kind: 'failed', error: new Error('Redimensionnement jsquash impossible') }
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
      return { kind: 'failed', error: new Error('Encodage WebP impossible') }
    }

    return {
      kind: 'ok',
      buffer: webpBuffer,
      contentType: IMAGE_OPTIMIZE.outputMime,
      pathname: opts?.pathname ? pathnameWithWebpExtension(opts.pathname) : undefined
    }
  } catch (error) {
    return {
      kind: 'failed',
      error: error instanceof Error ? error : new Error('Optimisation image échouée')
    }
  }
}
