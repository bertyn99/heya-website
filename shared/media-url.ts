/** Public URL for a CMS blob stored under `media/`. Static brand assets stay in `/images/`. */
export function mediaPublicUrl(pathname: string) {
  const path = pathname.replace(/^\/+/, '')
  return `/api/media/${path}`
}

export function mediaThumbnailUrl(pathname: string) {
  return mediaPublicUrl(pathname)
}

export function toMediaAssetPath(src: string) {
  return src
    .replace(/^\/+/, '')
    .replace(/^api\/media\//, '')
}
