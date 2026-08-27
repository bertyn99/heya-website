<script setup lang="ts">
import { blockLinksToButtons } from '~/utils/block-buttons'
import { heyaEyebrow } from '~/utils/heya-ui'

const props = withDefaults(defineProps<{
  headline?: string
  title: string
  role?: string
  description?: string
  image?: string
  imageAlt?: string
  links?: {
    label: string
    to: string
    target?: '_blank' | '_self'
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
    icon?: string
  }[]
}>(), {
  links: () => []
})

const links = computed(() => blockLinksToButtons(props.links))
const imageBroken = ref(false)

watch(() => props.image, () => {
  imageBroken.value = false
})
</script>

<template>
  <UPageSection
    orientation="horizontal"
    reverse
    :headline="props.headline"
    :title="props.title"
    :links="links"
    :ui="{
      root: 'bg-white !py-16 sm:!py-20',
      container: 'lg:!gap-16 items-center',
      wrapper: 'gap-3 items-start',
      headline: heyaEyebrow,
      title: 'text-4xl sm:text-5xl font-bold',
      description: 'text-muted text-base'
    }"
  >
    <template
      v-if="props.role || props.description"
      #description
    >
      <p
        v-if="props.role"
        class="text-lg font-medium text-primary"
      >
        {{ props.role }}
      </p>
      <p
        v-if="props.description"
        class="text-muted"
      >
        {{ props.description }}
      </p>
    </template>
    <div class="flex h-[450px] items-center justify-center overflow-hidden rounded-3xl bg-primary">
      <img
        v-if="props.image && !imageBroken"
        :src="props.image"
        :alt="props.imageAlt || props.title"
        class="h-full w-full object-cover object-center"
        width="695"
        height="745"
        @error="imageBroken = true"
      >
    </div>
  </UPageSection>
</template>
