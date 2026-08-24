<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Contact Heya | Demande de démo et devis',
  description: 'Contactez Heya pour une démo, un devis Test/Location/Achat ou un rendez-vous avec Elise Furnon. Réponse sous 24h.'
})

const links: ButtonProps[] = [
  {
    label: 'Réserver sur Cal.com',
    to: CAL_COM_URL,
    target: '_blank',
    icon: 'i-lucide-calendar'
  }
]
</script>

<template>
  <div>
    <UPageHero
      headline="Contact"
      title="Parlons de votre habitat partagé"
      description="Demandez une démo personnalisée, un devis pour une période de test (3, 6 ou 12 mois), ou un rendez-vous avec l'équipe Heya. Nous répondons sous 24h."
      :links="links"
      :ui="{
        root: 'bg-default py-20',
        container: 'items-center text-center',
        headline: 'text-primary text-[11px] font-semibold uppercase tracking-widest',
        title: 'text-4xl font-bold',
        description: 'text-muted max-w-2xl mx-auto',
        links: 'justify-center'
      }"
    />

    <ContactCtaSection />
  </div>
</template>
