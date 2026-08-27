<script setup lang="ts">
import type { ProblemBlock } from '#shared/types/blocks'

const SOLUTION_ICON_CLASSES = [
  'bg-step-blue text-step-blue-fg',
  'bg-step-gold text-step-gold-fg',
  'bg-step-green text-step-green-fg'
] as const

const props = withDefaults(defineProps<ProblemBlock>(), {
  badge: 'Le constat'
})

function solutionIconClass(index: number) {
  return SOLUTION_ICON_CLASSES[index % SOLUTION_ICON_CLASSES.length]
}
</script>

<template>
  <section
    id="constat"
    class="relative overflow-hidden bg-heya-dark-footer py-24 sm:py-28"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-24 size-[480px] -translate-x-1/2 rounded-full bg-activity-teal/10 blur-[120px]"
      aria-hidden="true"
    />

    <UContainer class="relative">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <UBadge
          :label="props.badge"
          color="primary"
          variant="soft"
          size="sm"
          class="mb-5 bg-primary/10 text-[11px] font-semibold tracking-wide text-primary"
        />

        <h2 class="text-4xl font-semibold leading-tight tracking-tight text-[#f1ede6] sm:text-[40px]">
          {{ props.title }}
          <span
            v-if="props.titleAccent"
            class="block font-bold text-primary"
          >
            {{ props.titleAccent }}
          </span>
        </h2>

        <p
          v-if="props.description"
          class="mx-auto mt-5 max-w-xl text-lg leading-7 text-[#a39e96]"
        >
          {{ props.description }}
        </p>
      </div>

      <div class="grid items-center gap-7 lg:grid-cols-[1fr_auto_1fr]">
        <div class="space-y-3.5">
          <div
            v-for="item in (props.problems ?? [])"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border border-white/10 bg-heya-dark-muted/80 p-5"
          >
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-inverted/25 p-2.5 text-dimmed">
              <UIcon
                :name="item.icon"
                class="size-[22px]"
              />
            </div>
            <div class="min-w-0">
              <p class="text-[15px] font-semibold text-[#f1ede6]">
                {{ item.title }}
              </p>
              <p class="mt-1 text-[13px] leading-snug text-[#a39e96]">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="hidden lg:block">
          <ProblemRelayVisual />
        </div>

        <div class="space-y-3.5">
          <div
            v-for="(item, index) in (props.solutions ?? [])"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border-[1.5px] border-activity-teal/35 bg-default p-5 shadow-[0_6px_20px_rgba(0,191,135,0.12)]"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl p-2.5"
              :class="solutionIconClass(index)"
            >
              <UIcon
                :name="item.icon"
                class="size-[22px]"
              />
            </div>
            <div class="min-w-0">
              <p class="text-[15px] font-semibold text-highlighted">
                {{ item.title }}
              </p>
              <p class="mt-1 text-[13px] leading-snug text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 lg:hidden">
        <ProblemRelayVisual />
      </div>
    </UContainer>
  </section>
</template>
