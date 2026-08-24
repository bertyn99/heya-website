<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['residences-etudiantes']

useSeoMeta({
  title: 'Heya pour les résidences étudiantes',
  description: data.subtitle
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
