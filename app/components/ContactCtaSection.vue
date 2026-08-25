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
      root: 'bg-heya-dark-footer py-20',
      container: 'items-center gap-12 lg:gap-16',
      title: 'text-3xl font-semibold text-white sm:text-4xl',
      description: 'text-[#e8e2d8]',
      links: 'mt-4'
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
      <p class="mt-2 text-xs text-[#aaa293]">
        Une réponse sous 24h. Vos données sont protégées.
      </p>
    </template>

    <div class="w-full rounded-[2rem] bg-[#2d2925] p-6 sm:p-8">
      <h3 class="mb-6 text-xl font-semibold text-white">
        Demandez une démo
      </h3>
      <ContactForm />
    </div>
  </UPageCTA>
</template>
