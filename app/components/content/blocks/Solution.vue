<script setup lang="ts">
import type { SolutionBlock } from '#shared/schemas/blocks'
import { solutions } from '~/data/solutions'

const props = defineProps<SolutionBlock>()

const data = computed(() => solutions[props.slug])

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Solution inconnue : ${props.slug}`
  })
}
</script>

<template>
  <SolutionPageLayout :data="data!" />
</template>
