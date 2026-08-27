<script setup lang="ts">
import { solutions } from '~/data/solutions'

const props = defineProps<{
  slug: string
}>()

const data = computed(() => solutions[props.slug])
const imageBroken = ref(false)

watch(() => props.slug, () => {
  imageBroken.value = false
})

const showImage = computed(() => Boolean(data.value?.heroImage) && !imageBroken.value)
</script>

<template>
  <div class="cms-page-builder-compact-solution flex gap-4 bg-heya-neutral-50 p-5 sm:p-6">
    <div class="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-heya-neutral-700 to-heya-neutral-900">
      <img
        v-if="showImage"
        :src="data?.heroImage"
        :alt="data?.heroImageAlt || data?.title || ''"
        class="absolute inset-0 size-full object-cover"
        @error="imageBroken = true"
      >
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-[11px] font-semibold uppercase tracking-widest text-primary">
        Gabarit de page habitat
      </p>
      <h3 class="mt-1 text-lg font-semibold tracking-tight text-highlighted">
        {{ data?.badge || 'Habitat' }}
      </h3>
      <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
        {{ data?.subtitle || 'Choisissez un habitat dans le panneau Modifier. Ce bloc remplit toute la page /solutions/…, ce n\'est pas une section de landing.' }}
      </p>
    </div>
  </div>
</template>
