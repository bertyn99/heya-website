<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const plans: PricingPlanProps[] = [
  {
    badge: 'Idéal pour valider sur site',
    title: 'Test',
    description: 'Prêtez le dispositif Heya (totem + lampes relay) sur 3, 6 ou 12 mois, sans engagement long terme.',
    features: [
      'Totem + lampes relay selon le nombre de logements',
      'Installation et formation équipe (1h)',
      'Dashboard de participation',
      'Accompagnement pendant la période de test'
    ],
    button: {
      label: 'Demander un devis test',
      to: '/contact',
      color: 'neutral',
      variant: 'outline'
    }
  },
  {
    badge: 'Recommandé',
    title: 'Location',
    description: 'Location du dispositif Heya avec maintenance et mises à jour. Pour animer votre habitat sans investissement initial lourd.',
    features: [
      'Matériel en location',
      'Maintenance incluse',
      'Dashboard et support email',
      'Renouvellement ou passage à l\'achat possible'
    ],
    highlight: true,
    button: {
      label: 'Demander un devis location',
      to: '/contact'
    }
  },
  {
    badge: 'Pour un déploiement durable',
    title: 'Achat',
    description: 'Acquisition du dispositif Heya pour votre structure. Accompagnement dédié, formation sur site, support prioritaire.',
    features: [
      'Totem et lampes relay en propriété',
      'Formation sur site',
      'Support prioritaire',
      'Dashboard complet'
    ],
    button: {
      label: 'Nous contacter',
      to: '/contact',
      color: 'neutral',
      variant: 'outline'
    }
  }
]

const faq = [
  {
    label: 'Combien de temps dure l\'installation ?',
    content: 'Une demi-journée pour poser le totem et les lampes relay, plus 1h de formation avec l\'équipe sur site.'
  },
  {
    label: 'Puis-je essayer avant de m\'engager ?',
    content: 'Oui. L\'offre Test prête le dispositif sur 3, 6 ou 12 mois, sans engagement au-delà de la période choisie.'
  },
  {
    label: 'Quels types de résidences ?',
    content: 'Résidences seniors, foyers jeunes travailleurs, co-living, copropriétés, résidences étudiantes, habitats inclusifs.'
  },
  {
    label: 'Y a-t-il un support dédié ?',
    content: 'Support email pour la Location. Support prioritaire et formation sur site pour l\'Achat.'
  }
]
</script>

<template>
  <UPageSection
    id="offres"
    headline="Nos offres"
    title="Tester, louer ou acheter"
    description="Trois formules pour adapter Heya à votre structure et à votre rythme de déploiement."
  >
    <UPricingPlans :plans="plans" />

    <template #footer>
      <div class="mx-auto w-full max-w-2xl">
        <h3 class="mb-6 text-center text-xl font-bold text-highlighted">
          Questions fréquentes
        </h3>
        <UAccordion :items="faq" />
      </div>
    </template>
  </UPageSection>
</template>
