<script setup lang="ts">
import type { TestimonialsBlock } from '#shared/types/blocks'

const props = withDefaults(defineProps<TestimonialsBlock>(), {
  headline: 'Témoignages'
})

const current = ref(0)

watch(() => props.items.length, (length) => {
  if (current.value >= length) {
    current.value = Math.max(0, length - 1)
  }
})

function prev() {
  if (!props.items.length) {
    return
  }
  current.value = (current.value - 1 + props.items.length) % props.items.length
}

function next() {
  if (!props.items.length) {
    return
  }
  current.value = (current.value + 1) % props.items.length
}

const active = computed(() => props.items[current.value] ?? props.items[0])
</script>

<template>
  <UPageSection
    id="temoignages"
    :headline="props.headline"
    :title="props.title"
    :description="props.description"
  >
    <div
      v-if="active"
      class="flex overflow-hidden rounded-[1.25rem] bg-muted max-lg:flex-col"
    >
      <div class="flex h-70 w-full shrink-0 items-center justify-center bg-heya-step-gold lg:h-auto lg:w-70">
        <span
          class="flex size-28 items-center justify-center rounded-[1.5rem] bg-white text-3xl font-semibold tabular text-primary"
          aria-hidden="true"
        >
          {{ active.initials || active.name.slice(0, 2).toUpperCase() }}
        </span>
      </div>

      <div class="flex min-h-90 flex-1 flex-col gap-6 border border-heya-neutral-200 bg-white px-8 py-10 sm:px-12 sm:py-14 lg:min-h-105 lg:border-y lg:border-r lg:border-l-0">
        <UBadge
          v-if="active.badge"
          :label="active.badge"
          color="primary"
          variant="soft"
          class="w-fit rounded-md bg-primary/10 text-primary"
        />

        <blockquote class="text-xl font-semibold leading-snug tracking-tight text-highlighted sm:text-[22px] lg:text-2xl">
          « {{ active.quote }} »
        </blockquote>

        <div class="mt-auto flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold text-highlighted">
              {{ active.name }}
            </p>
            <p class="text-sm text-muted">
              {{ active.role }}
            </p>
          </div>
          <div
            v-if="props.items.length > 1"
            class="flex gap-2"
          >
            <UButton
              icon="i-lucide-arrow-left"
              variant="outline"
              color="neutral"
              square
              class="rounded-full"
              aria-label="Témoignage précédent"
              @click="prev"
            />
            <UButton
              icon="i-lucide-arrow-right"
              variant="outline"
              color="neutral"
              square
              class="rounded-full"
              aria-label="Témoignage suivant"
              @click="next"
            />
          </div>
        </div>
      </div>
    </div>
  </UPageSection>
</template>
