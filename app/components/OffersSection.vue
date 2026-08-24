<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const plans: PricingPlanProps[] = [
  {
    title: 'Essentiel',
    description: 'Idéal pour démarrer et animer votre résidence.',
    price: '390€/mois',
    features: [
      'Jusqu\'à 50 résidents',
      'Animateur communautaire IA',
      'Tableau de bord équipe',
      'Support email',
      'Onboarding guidé'
    ],
    button: {
      label: 'Commencer',
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
    title: 'Pro',
    description: 'Pour les équipes qui veulent aller plus loin.',
    price: '490€/mois',
    features: [
      'Résidents illimités',
      'Animateur IA avancé',
      'Analytics & rapports',
      'Support prioritaire',
      'Intégrations API'
    ],
    highlight: true,
    ui: {
      root: 'rounded-[10px] border border-primary bg-primary p-8 ring-0',
      title: 'text-2xl font-normal text-white',
      description: 'text-base text-white',
      price: 'text-3xl font-normal text-white',
      featureIcon: 'text-white',
      featureTitle: 'text-sm text-white'
    },
    button: {
      label: 'Commencer',
      to: '/contact',
      block: true,
      color: 'neutral',
      variant: 'solid',
      class: 'bg-white text-primary hover:bg-white/90'
    }
  },
  {
    title: 'Sur Mesure',
    description: 'Pour les grandes structures multi-résidences.',
    price: 'Sur devis',
    features: [
      'Multi-résidences',
      'IA personnalisée',
      'Accompagnement dédié',
      'SLA garanti',
      'Formation sur site'
    ],
    button: {
      label: 'Nous contacter',
      to: '/contact',
      block: true
    }
  }
]

const faq = [
  {
    label: 'Combien de temps dure l\'installation ?',
    content: 'Une demi-journée pour poser le totem et les lampes relay, plus 1h de formation avec l\'équipe sur site.',
    icon: 'i-lucide-info'
  },
  {
    label: 'Puis-je essayer avant de m\'engager ?',
    content: 'Oui. L\'offre Test prête le dispositif sur 3, 6 ou 12 mois, sans engagement au-delà de la période choisie.',
    icon: 'i-lucide-info'
  },
  {
    label: 'Quels types de résidences ?',
    content: 'Résidences seniors, foyers jeunes travailleurs, co-living, copropriétés, résidences étudiantes, habitats inclusifs.',
    icon: 'i-lucide-info'
  },
  {
    label: 'Y a-t-il un support dédié ?',
    content: 'Support email pour la Location. Support prioritaire et formation sur site pour l\'Achat.',
    icon: 'i-lucide-info'
  }
]
</script>

<template>
  <UPageSection
    id="offres"
    :ui="{
      root: 'bg-default',
      headline: 'border border-primary/50 text-primary text-[10px] font-semibold uppercase tracking-widest',
      title: 'text-3xl font-semibold text-highlighted',
      footer: 'mt-8 w-full'
    }"
    headline="Nos offres"
    title="Tester, louer ou acheter"
  >
    <template #body>
      <UPricingPlans
        :plans="plans"
        class="w-full"
      />
    </template>

    <template #footer>
      <div class="w-full overflow-hidden rounded-lg bg-elevated ring ring-default">
        <UAccordion
          :items="faq"
          type="single"
          :default-value="'0'"
          class="w-full"
          :ui="{
            root: 'w-full',
            item: 'border-b border-default bg-elevated px-3.5 last:border-b-0',
            trigger: 'py-3.5 font-semibold text-highlighted',
            leadingIcon: 'text-primary size-5',
            trailingIcon: 'text-dimmed size-5',
            body: 'pb-3.5 text-muted'
          }"
        />
      </div>
    </template>
  </UPageSection>
</template>
