/**
 * IPX-compatible image URL parsing.
 * @see https://github.com/unjs/ipx — `/w_200,f_webp/{src}` or `/_/{src}`
 */

const IPX_KEY_ALIASES: Record<string, string> = {
  w: 'width',
  h: 'height',
  f: 'format',
  q: 'quality',
  s: 'resize',
  pos: 'position',
  b: 'background',
  a: 'animated'
}

const IPX_FLAG_KEYS = new Set([
  'enlarge',
  'flip',
  'flop',
  'grayscale',
  'normalize',
  'negate',
  'flatten',
  'animated',
  'a'
])

const MODIFIER_SEGMENT_RE = /^(?:_|(?:[a-z]+(?:_[^,/]*)?)(?:,(?:[a-z]+(?:_[^,/]*)?))*)$/i

export function parseIpxOperationsSegment(segment: string): Record<string, string> {
  if (!segment || segment === '_') {
    return {}
  }

  const operations: Record<string, string> = {}

  for (const part of segment.split(',')) {
    if (!part) {
      continue
    }

    const separator = part.indexOf('_')

    if (separator <= 0) {
      if (IPX_FLAG_KEYS.has(part)) {
        const key = IPX_KEY_ALIASES[part] ?? part
        operations[key] = 'true'
      }
      continue
    }

    const rawKey = part.slice(0, separator)
    const value = part.slice(separator + 1)
    const key = IPX_KEY_ALIASES[rawKey] ?? rawKey

    if (key === 'resize') {
      const [w, h] = value.split('x')
      if (w) {
        operations.width = w
      }
      if (h) {
        operations.height = h
      }
      operations.resize = value
      continue
    }

    operations[key] = value
  }

  return operations
}

export function isIpxModifiersSegment(segment: string) {
  if (!segment || segment.includes('/')) {
    return false
  }

  if (segment === '_') {
    return true
  }

  if (/\.[a-z0-9]+$/i.test(segment) && !segment.includes(',')) {
    return false
  }

  if (!segment.includes('_') && !segment.includes(',')) {
    return IPX_FLAG_KEYS.has(segment)
  }

  return MODIFIER_SEGMENT_RE.test(segment)
}

export function parseIpxImagePath(fullPath: string): {
  assetPath: string
  operations: Record<string, string>
  modifiersSegment: string | null
} {
  const normalized = fullPath.replace(/^\/+/, '')

  if (!normalized) {
    return { assetPath: '', operations: {}, modifiersSegment: null }
  }

  const slash = normalized.indexOf('/')

  if (slash <= 0) {
    return { assetPath: normalized, operations: {}, modifiersSegment: null }
  }

  const first = normalized.slice(0, slash)
  const rest = normalized.slice(slash + 1)

  if (!rest || !isIpxModifiersSegment(first)) {
    return { assetPath: normalized, operations: {}, modifiersSegment: null }
  }

  return {
    assetPath: rest,
    operations: parseIpxOperationsSegment(first),
    modifiersSegment: first
  }
}

export function hasImageTransformOps(operations: Record<string, string>) {
  return Boolean(
    operations.width
    || operations.height
    || operations.format
    || operations.quality
    || operations.fit
    || operations.resize
  )
}
