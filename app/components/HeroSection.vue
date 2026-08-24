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
      root: 'bg-default py-20',
      container: 'gap-8 lg:gap-16',
      title: 'text-4xl sm:text-5xl font-bold text-highlighted',
      description: 'text-base text-muted max-w-none',
      links: 'gap-4'
    }"
  >
    <HeroVisual />
  </UPageHero>
</template>
