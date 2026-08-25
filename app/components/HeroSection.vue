<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'

const links: ButtonProps[] = [
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
</script>

<template>
  <UPageHero
    title="Créer du lien en habitat partagé"
    description="Un totem dans l'espace commun, des lampes chez chaque résident. Quelqu'un propose une activité, les lampes s'allument, tout le monde se retrouve."
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
