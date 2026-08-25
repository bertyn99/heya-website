<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'
import { heyaHeroCentered } from '~/utils/heya-ui'

useSeoMeta({
  title: 'Contact | Demande de démo et devis',
  description: 'Contactez Heya pour une démo, un devis Test/Location/Achat ou un rendez-vous avec Elise Furnon. Réponse sous 24h.'
})

const links: ButtonProps[] = [
  {
    label: 'Prendre rendez-vous',
    to: CAL_COM_URL,
    target: '_blank',
    icon: 'i-lucide-calendar'
  },
  {
    label: 'Remplir le formulaire',
    to: '#contact',
    color: 'neutral',
    variant: 'outline'
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
      :ui="heyaHeroCentered"
    />

    <ContactCtaSection />
  </div>
</template>
