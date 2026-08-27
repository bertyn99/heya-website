/**
 * Public URL for a CMS blob. Pass IPX modifiers for on-demand transforms, e.g. `w_200,f_webp`.
 * Uses `/api/media` so it does not collide with static `public/images/**`.
 */
export const MEDIA_IMAGE_IPX = {
  thumb: 'w_400,f_webp,q_80',
  picker: 'w_320,f_webp,q_80',
  coverPreview: 'w_800,f_webp,q_82',
  detail: 'w_1200,f_webp,q_85'
} as const

export function mediaPublicUrl(pathname: string, modifiers?: string) {
  const path = pathname.replace(/^\/+/, '')

  if (!modifiers || modifiers === '_') {
    return `/api/media/${path}`
  }

  return `/api/media/${modifiers}/${path}`
}

export function mediaThumbnailUrl(pathname: string) {
  return mediaPublicUrl(pathname, MEDIA_IMAGE_IPX.thumb)
}

export function toMediaAssetPath(src: string) {
  return src
    .replace(/^\/+/, '')
    .replace(/^api\/media\//, '')
}
