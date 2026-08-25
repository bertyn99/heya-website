<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['co-living']!

useSeoMeta({
  title: data.metaTitle,
  description: data.metaDescription
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
