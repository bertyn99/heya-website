<script setup lang="ts">
import type { BlockTone, HowItWorksBlock } from '#shared/types/blocks'

const props = withDefaults(defineProps<HowItWorksBlock>(), {
  headline: 'Comment ça marche'
})

const toneClasses: Record<BlockTone, { card: string, accent: string }> = {
  blue: { card: 'bg-step-blue', accent: 'text-step-blue-fg bg-step-blue-fg/20' },
  gold: { card: 'bg-step-gold', accent: 'text-step-gold-fg bg-step-gold-fg/20' },
  green: { card: 'bg-step-green', accent: 'text-step-green-fg bg-step-green-fg/20' }
}

const activityLegend = [
  { label: 'Jeux', colorClass: 'bg-activity-blue' },
  { label: 'Extérieur', colorClass: 'bg-activity-yellow' },
  { label: 'Manuel', colorClass: 'bg-activity-orange' },
  { label: 'Café', colorClass: 'bg-activity-violet' }
]

const brokenImages = ref<string[]>([])

function stepImage(src?: string) {
  return src && !brokenImages.value.includes(src) ? src : ''
}

function markBroken(src: string) {
  if (!brokenImages.value.includes(src)) {
    brokenImages.value = [...brokenImages.value, src]
  }
}
</script>

<template>
  <UPageSection
    id="comment-ca-marche"
    :headline="props.headline"
    :title="props.title"
    :description="props.description"
    :ui="{
      description: 'max-w-[40rem]'
    }"
  >
    <div class="flex w-full flex-col gap-5">
      <article
        v-for="(step, index) in (props.steps ?? [])"
        :key="`${step.num}-${index}`"
        class="grid items-center gap-6 rounded-[1.25rem] p-7 sm:grid-cols-2 sm:gap-10 sm:p-9"
        :class="toneClasses[step.tone].card"
      >
        <div
          class="space-y-4"
          :class="index % 2 === 1 ? 'sm:order-2' : ''"
        >
          <span
            class="inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold tabular"
            :class="toneClasses[step.tone].accent"
          >
            {{ step.num }}
          </span>
          <h3 class="text-xl font-bold tracking-tight text-highlighted">
            {{ step.title }}
          </h3>
          <p class="max-w-lg text-sm leading-relaxed text-muted">
            {{ step.description }}
          </p>
        </div>

        <div
          class="flex min-h-44 items-center justify-center"
          :class="index % 2 === 1 ? 'sm:order-1' : ''"
        >
          <img
            v-if="stepImage(step.image)"
            :src="step.image"
            :alt="step.imageAlt || step.title"
            class="mx-auto block h-auto max-h-48 w-auto max-w-full object-contain"
            width="300"
            height="200"
            loading="lazy"
            @error="markBroken(step.image!)"
          >
          <div
            v-else
            class="flex size-full min-h-44 items-center justify-center rounded-xl border border-dashed border-default/60 text-muted"
          >
            <UIcon
              name="i-lucide-image"
              class="size-8"
            />
          </div>
        </div>
      </article>
    </div>

    <template #footer>
      <div class="flex flex-wrap items-center justify-center gap-5">
        <div
          v-for="item in activityLegend"
          :key="item.label"
          class="flex items-center gap-1.5"
        >
          <span
            class="size-2 rounded-full"
            :class="item.colorClass"
          />
          <span class="text-xs text-muted">
            {{ item.label }}
          </span>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
