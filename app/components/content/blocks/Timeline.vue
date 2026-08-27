<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  items: {
    year: string
    title: string
    description: string
    tone: 'orange' | 'yellow' | 'primary' | 'violet'
  }[]
}>()

const dotClass = {
  orange: 'bg-heya-orange',
  yellow: 'bg-heya-yellow',
  primary: 'bg-primary',
  violet: 'bg-heya-violet'
} as const
</script>

<template>
  <UPageSection
    :headline="props.headline"
    :title="props.title"
    :ui="{ root: '!py-16 sm:!py-20 bg-muted' }"
  >
    <div class="relative grid w-full gap-6 lg:grid-cols-4">
      <div class="pointer-events-none absolute inset-x-0 top-16 hidden h-0.5 bg-heya-neutral-200 lg:block" />
      <UPageCard
        v-for="item in props.items"
        :key="item.year"
        :title="item.title"
        :description="item.description"
        :ui="{
          root: 'rounded-[1.25rem] p-8 gap-5',
          header: 'mb-0 gap-2',
          body: 'gap-3',
          title: 'text-[22px] font-bold',
          description: 'text-muted text-base'
        }"
      >
        <template #header>
          <span
            class="size-3 rounded-full ring-8 ring-muted"
            :class="dotClass[item.tone]"
          />
          <p class="text-[40px] font-bold leading-none text-primary sm:text-5xl">
            {{ item.year }}
          </p>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
