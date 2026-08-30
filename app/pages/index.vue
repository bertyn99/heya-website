<script setup lang="ts">
import { HOME_PAGE_SLUG } from '#shared/page-hierarchy'
import HeyaMarkdown from '~/components/content/HeyaMarkdown.vue'

const { page } = await usePublishedPage(HOME_PAGE_SLUG)
</script>

<template>
  <HeyaMarkdown :markdown="page.contentMd" />
</template>
