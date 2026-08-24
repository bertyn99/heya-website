<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['residences-seniors']

useSeoMeta({
  title: 'Animation résidence seniors | Heya',
  description: data.subtitle
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
