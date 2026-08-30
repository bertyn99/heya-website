<script setup lang="ts">
import { HOME_PAGE_SLUG } from '#shared/page-hierarchy'
import HeyaMarkdown from '~/components/content/HeyaMarkdown.vue'

const route = useRoute()
const slug = computed(() => {
  const raw = route.params.slug
  const parts = Array.isArray(raw) ? raw : [raw]
  return parts.filter(Boolean).join('/')
})

if (!slug.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page introuvable',
    fatal: true
  })
}

if (slug.value === HOME_PAGE_SLUG) {
  await navigateTo('/', { redirectCode: 301, replace: true })
}

const { page } = await usePublishedPage(slug)
</script>

<template>
  <HeyaMarkdown :markdown="page.contentMd" />
</template>
