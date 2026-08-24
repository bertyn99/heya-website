<script setup lang="ts">
import { solutions } from '~/data/solutions'

const data = solutions['co-living']

useSeoMeta({
  title: 'Heya pour le co-living | Créer du lien entre colocataires',
  description: data.subtitle
})
</script>

<template>
  <SolutionPageLayout :data="data" />
</template>
