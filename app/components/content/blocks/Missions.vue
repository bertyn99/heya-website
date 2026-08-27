<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  items: {
    title: string
    description: string
    tone: 'violet' | 'teal' | 'blue'
  }[]
}>()

const toneClass = {
  violet: 'bg-heya-violet',
  teal: 'bg-heya-teal',
  blue: 'bg-heya-blue'
} as const
</script>

<template>
  <UPageSection
    id="mission"
    :headline="props.headline"
    :title="props.title"
    :ui="{ root: '!py-16 sm:!py-20 bg-default' }"
  >
    <div class="grid w-full gap-6 md:grid-cols-3">
      <UPageCard
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :ui="{
          root: 'rounded-2xl p-8 gap-5',
          header: 'mb-0',
          body: 'gap-3',
          description: 'text-muted'
        }"
      >
        <template #leading>
          <span
            class="size-11 shrink-0 rounded-full"
            :class="toneClass[item.tone]"
          />
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
