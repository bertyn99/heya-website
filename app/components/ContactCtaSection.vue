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
      root: 'bg-inverted py-20',
      container: 'items-start gap-16',
      title: 'text-3xl font-semibold text-inverted',
      description: 'text-[#e2e8f0]',
      links: 'mt-2'
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
      <p class="mt-2 text-xs text-[#90a1b9]">
        Une réponse sous 24h. Vos données sont protégées.
      </p>
    </template>

    <div class="w-full rounded-2xl bg-heya-dark-muted p-8">
      <h3 class="mb-6 text-lg font-semibold text-inverted">
        Demandez une démo
      </h3>
      <ContactForm />
    </div>
  </UPageCTA>
</template>
