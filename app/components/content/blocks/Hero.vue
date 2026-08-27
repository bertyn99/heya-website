<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { HeroBlock } from '#shared/types/blocks'
import { CAL_COM_URL } from '~/utils/navigation'
import { blockLinksToButtons } from '~/utils/block-buttons'
import { heyaHeroCentered, heyaHeroSplit } from '~/utils/heya-ui'

const props = withDefaults(defineProps<HeroBlock>(), {
  links: () => [],
  layout: 'split'
})

const defaultLinks: ButtonProps[] = [
  {
    label: 'Prendre rendez-vous',
    to: CAL_COM_URL,
    target: '_blank',
    color: 'primary',
    variant: 'solid'
  },
  {
    label: 'Voir le produit',
    to: '/concept',
    color: 'neutral',
    variant: 'outline'
  }
]

const links = computed<ButtonProps[]>(() => {
  if (props.links.length === 0) {
    return defaultLinks
  }
  return blockLinksToButtons(props.links)
})

const imageBroken = ref(false)

watch(() => props.image, () => {
  imageBroken.value = false
})

const customImage = computed(() => {
  const src = props.image?.trim()
  if (!src || imageBroken.value) {
    return null
  }
  return src
})

const isCenter = computed(() => props.layout === 'center')
const headline = computed(() => props.headline?.trim() || undefined)
</script>

<template>
  <UPageHero
    :headline="headline"
    :title="title"
    :description="description?.trim() || undefined"
    :orientation="isCenter ? 'vertical' : 'horizontal'"
    :links="links"
    :ui="isCenter ? heyaHeroCentered : heyaHeroSplit"
  >
    <img
      v-if="customImage"
      :src="customImage"
      :alt="title"
      class="mx-auto w-full object-cover shadow-(--shadow-heya)"
      :class="isCenter ? 'mt-4 max-w-3xl rounded-[1.75rem]' : 'max-w-[704px] rounded-[1.75rem]'"
      :style="isCenter ? 'aspect-ratio: 16 / 9' : 'aspect-ratio: 704 / 560'"
      @error="imageBroken = true"
    >
    <HeroVisual v-else-if="!isCenter" />
  </UPageHero>
</template>
