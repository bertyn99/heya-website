<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Heya c\'est quoi ? | Totem, lampes relay et dashboard',
  description: 'Découvrez le concept Heya : totem dans l\'espace commun, lampe relay dans chaque logement, 4 couleurs d\'activités, dashboard pour les équipes.'
})

const links: ButtonProps[] = [
  { label: 'Découvrir le produit', to: '#produits' },
  {
    label: 'Voir une démo',
    to: CAL_COM_URL,
    target: '_blank',
    color: 'neutral',
    variant: 'outline'
  }
]

const products = [
  {
    label: 'Le boîtier',
    title: 'Le totem interactif',
    description: 'Installé dans l\'espace commun, le totem permet aux résidents de proposer une activité en quelques secondes grâce à 4 emplacements couleur.',
    image: '/images/concept/totem.png',
    imageAlt: 'Totem Heya avec quatre emplacements couleur'
  },
  {
    label: 'La lampe',
    title: 'La lampe relais',
    description: 'Dans chaque appartement, la lampe s\'allume dans la couleur de l\'activité proposée. Un signal simple et visible pour créer du lien.',
    image: '/images/concept/lampe.png',
    imageAlt: 'Lampe relais Heya allumée'
  }
]

const stats = [
  { value: '-32%', title: 'Sollicitations conciergerie', description: 'Moins de questions répétitives', featured: true, valueClass: 'text-primary' },
  { value: '+45%', title: 'Participation résidents', description: 'Plus d\'activités proposées', valueClass: 'text-heya-teal' },
  { value: '1h', title: 'Formation équipe', description: 'Prise en main rapide', valueClass: 'text-heya-blue' },
  { value: '0', title: 'Maintenance', description: 'Fonctionne en autonomie', valueClass: 'text-heya-violet' }
]

const activities = [
  { title: 'Jeux de société', description: 'Parties de cartes, échecs, jeux de plateau entre voisins.', icon: 'i-lucide-gamepad-2', cardClass: 'bg-[#e6f5ff] border-heya-blue', iconClass: 'bg-heya-blue' },
  { title: 'Activité extérieure', description: 'Balades, jardinage, sorties dans le quartier.', icon: 'i-lucide-map-pin', cardClass: 'bg-[#fff8e6] border-heya-yellow', iconClass: 'bg-heya-yellow' },
  { title: 'Activité manuelle', description: 'Ateliers créatifs, bricolage, cuisine ensemble.', icon: 'i-lucide-paintbrush', cardClass: 'bg-[#fff2e6] border-heya-orange', iconClass: 'bg-heya-orange' },
  { title: 'Café / discussions', description: 'Moments conviviaux autour d\'un café ou d\'un thé.', icon: 'i-lucide-coffee', cardClass: 'bg-[#f3eeff] border-heya-violet', iconClass: 'bg-heya-violet' }
]

const installSteps = [
  { title: 'Audit sur site', description: 'Identification des espaces communs et du nombre d\'appartements.', image: '/images/concept/install-1.png' },
  { title: 'Pose des boîtiers', description: 'Installation du totem et des lampes par notre équipe.', image: '/images/concept/install-2.png' },
  { title: 'Formation & lancement', description: '1h de formation conciergerie, puis les résidents prennent le relais.', image: '/images/concept/install-3.png' }
]
</script>

<template>
  <div>
    <UPageHero
      headline="Le concept"
      title="Créer du lien en habitat partagé"
      description="Un totem dans l'espace commun, des lampes dans chaque appartement. Les résidents proposent des activités, les lampes s'allument, le lien se crée."
      :links="links"
      :ui="{
        root: 'bg-default py-24',
        container: 'items-center text-center',
        headline: 'border border-primary/50 text-primary text-[10px] font-semibold uppercase',
        title: 'text-5xl font-bold text-highlighted max-w-3xl mx-auto',
        description: 'text-xl text-muted max-w-2xl mx-auto',
        links: 'justify-center'
      }"
    />

    <UPageSection
      id="produits"
      headline="Les produits"
      title="Deux objets, un seul objectif"
      description="Le totem dans l'espace commun et la lampe dans chaque logement."
      :ui="{ root: 'bg-white' }"
    >
      <div class="grid w-full gap-8 md:grid-cols-2">
        <UPageCard
          v-for="product in products"
          :key="product.title"
          :title="product.title"
          :description="product.description"
          :ui="{
            root: 'rounded-[20px] p-8 text-center',
            header: 'flex w-full flex-col items-center',
            wrapper: 'items-center text-center',
            leading: 'justify-center',
            title: 'text-xl font-semibold',
            description: 'text-muted'
          }"
        >
          <template #header>
            <img
              :src="product.image"
              :alt="product.imageAlt"
              class="mx-auto block h-[220px] w-auto max-w-full object-contain"
              width="280"
              height="220"
            >
            <p class="mt-5 text-[11px] font-semibold uppercase tracking-widest text-primary">
              {{ product.label }}
            </p>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <HowItWorksSection />

    <UPageSection
      headline="Dashboard"
      title="Suivez la vie de votre résidence"
      description="Données réelles des résidences équipées"
      :ui="{
        root: 'bg-inverted',
        headline: 'text-primary',
        title: 'text-inverted',
        description: 'text-[#aaa297]'
      }"
    >
      <img
        src="/images/concept/dashboard.png"
        alt="Aperçu du dashboard Heya"
        class="w-full rounded-[20px] object-cover shadow-xl"
        width="1040"
        height="616"
      >
    </UPageSection>

    <UPageSection
      headline="Qualité & impact"
      title="Des résultats mesurables"
    >
      <div class="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UPageCard
          v-for="stat in stats"
          :key="stat.title"
          :title="stat.title"
          :description="stat.description"
          :class="stat.featured ? 'bg-[#deede2]' : 'bg-elevated'"
          :ui="{
            root: 'rounded-[20px] text-center',
            title: 'text-sm font-semibold',
            description: 'text-sm text-muted'
          }"
        >
          <template #header>
            <p
              class="text-4xl font-bold lg:text-5xl"
              :class="stat.valueClass"
            >
              {{ stat.value }}
            </p>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <UPageSection
      headline="Les activités"
      title="4 couleurs, 4 types d'activités"
      description="Ces activités sont personnalisables et peuvent évoluer selon vos envies."
      :ui="{ root: 'bg-default' }"
    >
      <div class="grid w-full gap-8 md:grid-cols-2">
        <UPageCard
          v-for="activity in activities"
          :key="activity.title"
          :title="activity.title"
          :description="activity.description"
          :class="activity.cardClass"
          :ui="{
            root: 'rounded-2xl border-2 p-10 ring-0',
            title: 'text-[22px] font-bold',
            description: 'text-muted'
          }"
        >
          <template #leading>
            <div
              class="flex size-[72px] items-center justify-center rounded-full text-white"
              :class="activity.iconClass"
            >
              <UIcon
                :name="activity.icon"
                class="size-7"
              />
            </div>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <UPageSection
      headline="Installation"
      title="Opérationnel en une demi-journée"
    >
      <div class="grid w-full gap-8 md:grid-cols-3">
        <UPageCard
          v-for="step in installSteps"
          :key="step.title"
          :title="step.title"
          :description="step.description"
          :ui="{
            root: 'rounded-2xl border border-[#c8e6d7] p-6 text-center',
            title: 'text-lg font-semibold',
            description: 'text-sm text-muted'
          }"
        >
          <template #header>
            <img
              :src="step.image"
              :alt="step.title"
              class="mx-auto h-40 w-full rounded-xl object-cover"
              width="240"
              height="160"
            >
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <ContactCtaSection />
  </div>
</template>
