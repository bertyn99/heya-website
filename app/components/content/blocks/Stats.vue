<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  items: {
    value: string
    title: string
    description?: string
    featured?: boolean
    accent?: 'primary' | 'teal' | 'blue' | 'violet'
  }[]
}>()

const accentClass = {
  primary: 'text-primary',
  teal: 'text-heya-teal',
  blue: 'text-heya-blue',
  violet: 'text-heya-violet'
} as const
</script>

<template>
  <UPageSection
    :headline="props.headline"
    :title="props.title"
  >
    <div class="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
      <UPageCard
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :class="item.featured ? 'bg-step-green' : 'bg-elevated'"
        :ui="{
          root: 'rounded-[1.25rem] text-center',
          title: 'text-sm font-semibold',
          description: 'text-sm text-muted'
        }"
      >
        <template #header>
          <p
            class="text-4xl font-bold tabular lg:text-5xl"
            :class="accentClass[item.accent ?? 'primary']"
          >
            {{ item.value }}
          </p>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
