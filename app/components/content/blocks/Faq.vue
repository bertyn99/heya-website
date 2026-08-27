<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title?: string
  items: {
    question: string
    answer: string
  }[]
}>()

const title = computed(() => props.title?.trim() || undefined)
const headline = computed(() => props.headline?.trim() || undefined)
</script>

<template>
  <UPageSection
    :headline="headline"
    :title="title"
    :ui="{
      footer: 'mt-0 w-full'
    }"
  >
    <div class="grid w-full gap-x-10 gap-y-8 sm:grid-cols-2">
      <div
        v-for="item in props.items"
        :key="item.question"
      >
        <h3 class="text-base font-semibold text-highlighted">
          {{ item.question }}
        </h3>
        <p class="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </UPageSection>
</template>
