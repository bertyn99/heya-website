export const CONTENT_IMAGE_ASPECTS = [
  { value: '16:9', label: '16:9', className: 'aspect-[16/9]' },
  { value: '4:3', label: '4:3', className: 'aspect-[4/3]' },
  { value: '3:2', label: '3:2', className: 'aspect-[3/2]' },
  { value: '1:1', label: '1:1', className: 'aspect-square' },
  { value: '3:4', label: '3:4', className: 'aspect-[3/4]' }
] as const

export type ContentImageAspect = (typeof CONTENT_IMAGE_ASPECTS)[number]['value']

export const DEFAULT_CONTENT_IMAGE_ASPECT: ContentImageAspect = '4:3'

const ASPECT_RE = /^(\d+):(\d+)$/

export function isContentImageAspect(value: string | null | undefined): value is ContentImageAspect {
  if (!value) {
    return false
  }
  return CONTENT_IMAGE_ASPECTS.some(item => item.value === value)
}

export function parseImageAspectFromTitle(title: string | null | undefined): ContentImageAspect | null {
  const trimmed = title?.trim()
  if (!trimmed || !ASPECT_RE.test(trimmed)) {
    return null
  }
  return isContentImageAspect(trimmed) ? trimmed : null
}

export function contentImageAspectClass(
  aspect: string | null | undefined,
  fallback: ContentImageAspect | null = null
): string | null {
  const key = parseImageAspectFromTitle(aspect) ?? fallback
  if (!key) {
    return null
  }
  return CONTENT_IMAGE_ASPECTS.find(item => item.value === key)?.className ?? null
}

export function contentImageClassList(
  title: string | null | undefined,
  extras?: string | null
): string {
  const aspectClass = contentImageAspectClass(title, null)
  return [
    'cms-editor-image',
    'max-w-full',
    'w-full',
    'rounded-xl',
    aspectClass ? 'object-cover' : 'h-auto',
    aspectClass,
    extras
  ].filter(Boolean).join(' ')
}

export function isLikelyBrokenContentImageSrc(src: string | null | undefined): boolean {
  if (!src) {
    return true
  }
  if (src.startsWith('blob:') || src.startsWith('data:')) {
    return false
  }
  if (src.includes('/api/media/') || src.startsWith('media/')) {
    return false
  }
  if (src.startsWith('/images/blog/') || src.startsWith('/images/brand/')) {
    return false
  }
  return src.startsWith('/images/')
}

export function pathnameFromContentImageSrc(src: string): string | null {
  const raw = src.trim()
  if (!raw) {
    return null
  }

  let path = raw
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    try {
      path = new URL(raw).pathname
    } catch {
      return null
    }
  }

  path = path.replace(/^\/+/, '')
  if (path.startsWith('api/media/')) {
    path = path.slice('api/media/'.length)
  }
  return path.startsWith('media/') ? path : null
}
