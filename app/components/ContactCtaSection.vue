<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'

const links: ButtonProps[] = [
  {
    label: 'Prendre rendez-vous',
    to: CAL_COM_URL,
    target: '_blank',
    icon: 'i-lucide-calendar'
  }
]
</script>

<template>
  <UPageCTA
    id="contact"
    variant="solid"
    orientation="horizontal"
    title="Et si on recréait du lien ?"
    description="Heya aide votre équipe à animer la résidence sans surcharge. On installe, on forme, on accompagne. Vous observez le lien se recréer."
    :links="links"
    class="rounded-none"
    :ui="{
      root: 'bg-inverted',
      title: 'text-inverted',
      description: 'text-dimmed'
    }"
  >
    <template #body>
      <ul class="space-y-4">
        <li
          v-for="item in [
            'Une démo personnalisée à votre rythme',
            'Un accompagnement pour la mise en place',
            'Des outils simples pour vos équipes'
          ]"
          :key="item"
          class="flex items-center gap-3 text-sm font-semibold text-inverted"
        >
          <span class="size-3 shrink-0 rounded-full bg-primary" />
          {{ item }}
        </li>
      </ul>
    </template>

    <UPageCard
      variant="subtle"
      title="Demandez une démo"
      class="bg-neutral-800 ring-0"
      :ui="{
        title: 'text-inverted',
        container: 'p-8'
      }"
    >
      <ContactForm />
    </UPageCard>
  </UPageCTA>
</template>
