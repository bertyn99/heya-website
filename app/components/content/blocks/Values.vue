<script setup lang="ts">
import type { ValuesBlock } from '#shared/schemas/blocks'

const props = defineProps<ValuesBlock>()

const toneClasses: Record<ValuesBlock['items'][number]['tone'], { bg: string, offset: string }> = {
  blue: { bg: 'bg-heya-step-blue', offset: '' },
  gold: { bg: 'bg-heya-step-gold', offset: 'md:mt-10' },
  green: { bg: 'bg-heya-step-green', offset: 'md:mt-20' }
}
</script>

<template>
  <UPageSection
    id="valeurs"
    :headline="props.headline ?? 'Nos valeurs'"
    :title="props.title"
    :description="props.description"
    :ui="{
      root: 'bg-white',
      description: 'max-w-[40rem]'
    }"
  >
    <div class="grid w-full gap-5 md:grid-cols-3">
      <article
        v-for="value in props.items"
        :key="value.title"
        class="rounded-[1.25rem] p-8 transition-transform duration-200 hover:-translate-y-1"
        :class="[toneClasses[value.tone].bg, toneClasses[value.tone].offset]"
      >
        <h3 class="text-3xl font-bold tracking-tight text-highlighted">
          {{ value.title }}
        </h3>
        <p class="mt-4 max-w-[32ch] text-sm leading-relaxed text-toned">
          {{ value.description }}
        </p>
      </article>
    </div>
  </UPageSection>
</template>
