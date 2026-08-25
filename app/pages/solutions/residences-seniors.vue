<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['residences-seniors']!

useSeoMeta({
  title: data.metaTitle,
  description: data.metaDescription
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
