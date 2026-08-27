import { IMAGE_OPTIMIZE } from './image-optimize'

export const IMAGE_DELIVERY = {
  maxEdgePx: IMAGE_OPTIMIZE.maxEdgePx,
  defaultQuality: 85,
  minQuality: 1,
  maxQuality: 100
} as const

export const MEDIA_BLOB_PREFIX = 'media/'
export const PUBLIC_IMAGE_PREFIX = 'images/'

/** IPX modifiers implemented by jSquash delivery (others are ignored). */
export const SUPPORTED_DELIVERY_OPERATION_KEYS = new Set([
  'width',
  'height',
  'format',
  'quality',
  'fit',
  'resize',
  'enlarge'
])

export function isAllowedMediaAssetPath(assetPath: string) {
  const normalized = assetPath.replace(/^\/+/, '')

  if (normalized.includes('..') || normalized.includes('\\')) {
    return false
  }

  return normalized.startsWith(MEDIA_BLOB_PREFIX)
    || normalized.startsWith(PUBLIC_IMAGE_PREFIX)
}

export function isCmsBlobPath(assetPath: string) {
  return assetPath.replace(/^\/+/, '').startsWith(MEDIA_BLOB_PREFIX)
}

export function sanitizeDeliveryOperations(
  operations: Record<string, string>
): Record<string, string> {
  const out: Record<string, string> = {}

  for (const [key, value] of Object.entries(operations)) {
    if (SUPPORTED_DELIVERY_OPERATION_KEYS.has(key)) {
      out[key] = value
    }
  }

  return out
}

export function clampDeliveryDimension(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    return undefined
  }

  return Math.min(Math.round(value), IMAGE_DELIVERY.maxEdgePx)
}

export function clampDeliveryQuality(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) {
    return IMAGE_DELIVERY.defaultQuality
  }

  return Math.min(IMAGE_DELIVERY.maxQuality, Math.max(IMAGE_DELIVERY.minQuality, Math.round(value)))
}

export function allowsUpscale(operations: Record<string, string>) {
  return operations.enlarge === 'true'
}

/** IPX `f_auto`: pick WebP / JPEG from Accept (no AVIF encoder in jSquash). */
export function resolveDeliveryFormat(
  format: string | undefined,
  acceptHeader: string | null | undefined
): string | undefined {
  if (!format || format === 'auto') {
    const accept = acceptHeader?.toLowerCase() ?? ''

    if (accept.includes('image/webp')) {
      return 'webp'
    }

    if (accept.includes('image/jpeg') || accept.includes('image/jpg')) {
      return 'jpeg'
    }

    return 'webp'
  }

  return format
}
