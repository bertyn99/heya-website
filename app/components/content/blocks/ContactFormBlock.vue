<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  description?: string
}>()

const headline = computed(() => props.headline?.trim() || undefined)
</script>

<template>
  <UPageSection
    id="contact-form"
    :headline="headline"
    :title="props.title"
    :description="props.description"
    :ui="{
      root: 'bg-heya-dark-footer',
      headline: 'text-primary',
      title: 'text-inverted',
      description: 'text-[#aaa297]'
    }"
  >
    <div class="w-full max-w-2xl">
      <ContactForm />
    </div>
  </UPageSection>
</template>
