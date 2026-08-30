import type { PublicPage } from '#shared/types/public'
import { contentAssetUrl } from '#shared/media-url'

export async function usePublishedPage(slug: MaybeRefOrGetter<string>) {
  const slugRef = computed(() => toValue(slug))
  const request = useFetch<PublicPage>(() => `/api/pages/${slugRef.value}`)

  useHead({
    titleTemplate: '%s'
  })

  useSeoMeta({
    title: computed(() => request.data.value?.seo?.metaTitle?.trim() || request.data.value?.title || 'Heya'),
    description: computed(() => request.data.value?.seo?.metaDescription?.trim() || undefined),
    ogTitle: computed(() => request.data.value?.seo?.metaTitle?.trim() || request.data.value?.title || 'Heya'),
    ogDescription: computed(() => request.data.value?.seo?.metaDescription?.trim() || undefined),
    ogImage: computed(() => contentAssetUrl(request.data.value?.seo?.ogImage) || '/og-image.png'),
    twitterCard: 'summary_large_image'
  })

  const { data, error } = await request

  if (error.value || !data.value) {
    throw createError({
      statusCode: error.value?.statusCode || 404,
      statusMessage: 'Page introuvable',
      fatal: true
    })
  }

  return { page: data }
}
