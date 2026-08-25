<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const plans: PricingPlanProps[] = [
  {
    title: 'Test',
    description: 'Prêtez le dispositif sur 3, 6 ou 12 mois, sans engagement long terme.',
    price: 'Sur devis',
    billingCycle: '3, 6 ou 12 mois',
    tagline: 'Pour valider sur site',
    features: [
      'Totem + lampes relay selon le nombre de logements',
      'Installation et formation équipe (1h)',
      'Dashboard de participation',
      'Accompagnement pendant la période de test'
    ],
    button: {
      label: 'Demander un devis',
      to: '/contact',
      block: true
    }
  },
  {
    badge: {
      label: 'Recommandé',
      color: 'neutral',
      variant: 'solid',
      class: 'bg-inverted text-white'
    },
    title: 'Location',
    description: 'Animer l\'habitat sans investissement initial lourd, maintenance incluse.',
    price: 'Sur devis',
    billingCycle: 'mensuel',
    tagline: 'Le rythme le plus choisi',
    highlight: true,
    scale: true,
    features: [
      'Matériel en location',
      'Maintenance incluse',
      'Dashboard et support email',
      'Renouvellement ou passage à l\'achat'
    ],
    ui: {
      root: 'rounded-[1.25rem] border border-primary bg-primary p-8 ring-0',
      title: 'text-2xl font-semibold text-white',
      description: 'text-base text-white/90',
      price: 'text-3xl font-semibold text-white tabular',
      billingCycle: 'text-white/80',
      tagline: 'text-white/80',
      featureIcon: 'text-white',
      featureTitle: 'text-sm text-white'
    },
    button: {
      label: 'Demander un devis',
      to: '/contact',
      block: true,
      color: 'neutral',
      variant: 'solid',
      class: 'bg-white text-primary hover:bg-white/90'
    }
  },
  {
    title: 'Achat',
    description: 'Acquisition du dispositif pour un déploiement durable dans votre structure.',
    price: 'Sur devis',
    tagline: 'Pour un déploiement durable',
    features: [
      'Totem et lampes relay en propriété',
      'Formation sur site',
      'Support prioritaire',
      'Dashboard complet'
    ],
    button: {
      label: 'Nous écrire',
      to: '/contact',
      block: true
    }
  }
]

const faq = [
  {
    question: 'Combien de temps dure l\'installation ?',
    answer: 'Une demi-journée pour poser le totem et les lampes relay, plus 1h de formation avec l\'équipe sur site.'
  },
  {
    question: 'Puis-je essayer avant de m\'engager ?',
    answer: 'Oui. L\'offre Test prête le dispositif sur 3, 6 ou 12 mois, sans engagement au-delà de la période choisie.'
  },
  {
    question: 'Quels types de résidences ?',
    answer: 'Résidences seniors, foyers jeunes travailleurs, co-living, copropriétés, résidences étudiantes, habitats inclusifs.'
  },
  {
    question: 'Y a-t-il un support dédié ?',
    answer: 'Support email pour la Location. Support prioritaire et formation sur site pour l\'Achat.'
  }
]
</script>

<template>
  <UPageSection
    id="offres"
    :ui="{
      root: 'bg-default',
      headline: 'text-[11px] font-semibold uppercase tracking-widest text-primary',
      title: 'text-3xl font-semibold text-highlighted tracking-tight',
      footer: 'mt-12 w-full'
    }"
    headline="Nos offres"
    title="Tester, louer ou acheter"
    description="Trois formules pour adapter Heya à votre structure et à votre rythme de déploiement."
  >
    <template #body>
      <UPricingPlans
        :plans="plans"
        class="w-full"
      />
    </template>

    <template #footer>
      <div class="grid w-full gap-x-10 gap-y-8 border-t border-default pt-10 sm:grid-cols-2">
        <div
          v-for="item in faq"
          :key="item.question"
        >
          <h3 class="text-base font-semibold text-highlighted">
            {{ item.question }}
          </h3>
          <p class="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
