<script setup lang="ts">
import type { RichtextBlock } from '#shared/types/blocks'

const props = defineProps<RichtextBlock>()
</script>

<template>
  <UPageSection
    :ui="{
      root: 'bg-default',
      container: 'max-w-3xl'
    }"
  >
    <div
      class="prose prose-neutral max-w-none"
      :class="props.class"
    >
      <slot />
    </div>
  </UPageSection>
</template>
