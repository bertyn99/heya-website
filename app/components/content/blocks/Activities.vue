<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  description?: string
  items: {
    title: string
    description: string
    icon: string
    tone: 'blue' | 'yellow' | 'orange' | 'violet'
  }[]
}>()

const toneClass = {
  blue: { card: 'bg-[#e6f5ff] border-heya-blue', icon: 'bg-heya-blue' },
  yellow: { card: 'bg-[#fff8e6] border-heya-yellow', icon: 'bg-heya-yellow' },
  orange: { card: 'bg-[#fff2e6] border-heya-orange', icon: 'bg-heya-orange' },
  violet: { card: 'bg-[#f3eeff] border-heya-violet', icon: 'bg-heya-violet' }
} as const
</script>

<template>
  <UPageSection
    :headline="props.headline"
    :title="props.title"
    :description="props.description"
    :ui="{ root: 'bg-default' }"
  >
    <div class="grid w-full gap-8 md:grid-cols-2">
      <UPageCard
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :class="toneClass[item.tone].card"
        :ui="{
          root: 'rounded-[1.25rem] border-2 p-10 ring-0',
          title: 'text-[22px] font-bold',
          description: 'text-muted'
        }"
      >
        <template #leading>
          <div
            class="flex size-[72px] items-center justify-center rounded-full text-white"
            :class="toneClass[item.tone].icon"
          >
            <UIcon
              :name="item.icon"
              class="size-7"
            />
          </div>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
