<script setup lang="ts">
import type { SolutionBlock } from '#shared/types/blocks'
import { solutions } from '~/data/solutions'

const props = defineProps<SolutionBlock>()

const data = computed(() => solutions[props.slug])
</script>

<template>
  <SolutionPageLayout
    v-if="data"
    :data="data"
  />
  <UPageSection
    v-else
    title="Page solution introuvable"
    :description="`Aucun habitat ne correspond à « ${props.slug} ». Choisissez un habitat dans le panneau Modifier.`"
  />
</template>
