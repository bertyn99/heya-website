/** Public URL for a CMS blob stored under `media/`. Static brand assets stay in `/images/`. */
export function mediaPublicUrl(pathname: string) {
  const path = pathname.replace(/^\/+/, '')
  return `/api/media/${path}`
}

export function contentAssetUrl(src: string | null | undefined): string | undefined {
  if (!src) {
    return undefined
  }

  if (/^https?:\/\//u.test(src) || src.startsWith('/images/') || src.startsWith('/og-')) {
    return src
  }

  if (src.startsWith('/api/media/')) {
    return src
  }

  return mediaPublicUrl(src)
}

export function mediaThumbnailUrl(pathname: string) {
  return mediaPublicUrl(pathname)
}

export function toMediaAssetPath(src: string) {
  return src
    .replace(/^\/+/, '')
    .replace(/^api\/media\//, '')
}
