<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['habitat-inclusif']

useSeoMeta({
  title: 'Heya pour l\'habitat inclusif',
  description: data.subtitle
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
