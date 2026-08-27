<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { HeroBlock } from '#shared/schemas/blocks'
import { CAL_COM_URL } from '~/utils/navigation'

const props = withDefaults(defineProps<HeroBlock>(), {
  links: () => []
})

const defaultLinks: ButtonProps[] = [
  {
    label: 'Prendre rendez-vous',
    to: CAL_COM_URL,
    target: '_blank'
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

  return props.links.map(link => ({
    label: link.label,
    to: link.to,
    target: link.target,
    color: 'primary',
    variant: 'solid'
  }))
})
</script>

<template>
  <UPageHero
    :title="title"
    :description="description"
    orientation="horizontal"
    :links="links"
    :ui="{
      root: 'bg-default pt-16 pb-20 sm:pt-20 sm:pb-24',
      container: 'gap-8 lg:gap-16 items-center',
      title: 'text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-highlighted tracking-tight leading-[1.1]',
      description: 'text-base sm:text-lg text-muted leading-relaxed max-w-[36rem]',
      links: 'gap-3'
    }"
  >
    <HeroVisual />
  </UPageHero>
</template>
