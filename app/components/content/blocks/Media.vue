<script setup lang="ts">
const props = withDefaults(defineProps<{
  headline?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  tone?: 'light' | 'dark'
}>(), {
  tone: 'dark'
})

const imageBroken = ref(false)
const isDark = computed(() => props.tone === 'dark')
</script>

<template>
  <UPageSection
    :headline="props.headline"
    :title="props.title"
    :description="props.description"
    :ui="{
      root: isDark ? 'bg-heya-dark-footer' : 'bg-default',
      headline: isDark ? 'text-primary' : undefined,
      title: isDark ? 'text-inverted' : undefined,
      description: isDark ? 'text-[#aaa297]' : undefined
    }"
  >
    <img
      v-if="props.image && !imageBroken"
      :src="props.image"
      :alt="props.imageAlt || props.title"
      class="w-full rounded-[1.25rem] object-cover shadow-(--shadow-heya)"
      width="1040"
      height="616"
      @error="imageBroken = true"
    >
  </UPageSection>
</template>
