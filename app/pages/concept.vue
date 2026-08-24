<script setup lang="ts">
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Heya c\'est quoi ? | Totem, lampes relay et dashboard',
  description: 'Découvrez le concept Heya : totem dans l\'espace commun, lampe relay dans chaque logement, 4 couleurs d\'activités, dashboard pour les équipes.'
})

const products = [
  {
    label: 'Le boîtier',
    title: 'Le totem interactif',
    description: 'Installé dans l\'espace commun, le totem permet de proposer une activité en quelques secondes grâce à 4 emplacements couleur.',
    features: ['Interface physique, sans menu compliqué', 'Accessible à tous les profils', 'Point central de la vie collective'],
    bg: 'bg-heya-step-blue',
    icon: 'i-lucide-box'
  },
  {
    label: 'La lampe',
    title: 'La lampe relay',
    description: 'Dans chaque appartement, la lampe relay s\'allume dans la couleur de l\'activité proposée. Un signal simple et visible.',
    features: ['Signal discret mais impossible à manquer', 'Pas de compte, pas de WiFi côté résident', 'Relie le logement privé à la vie commune'],
    bg: 'bg-heya-step-gold',
    icon: 'i-lucide-lamp'
  }
]

const activities = [
  { color: 'bg-heya-blue', label: 'Jeux de société', examples: 'Cartes, échecs, jeux de plateau' },
  { color: 'bg-heya-yellow', label: 'Activité extérieure', examples: 'Balades, jardinage, sorties' },
  { color: 'bg-heya-orange', label: 'Activité manuelle', examples: 'Ateliers créatifs, bricolage' },
  { color: 'bg-heya-violet', label: 'Café / discussions', examples: 'Moments conviviaux, échanges' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer>
        <div class="mx-auto max-w-3xl text-center">
          <p class="mb-4 text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
            Le concept
          </p>
          <h1 class="text-4xl font-bold text-heya-dark sm:text-5xl">
            Créer du lien en habitat partagé
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-heya-dark-border">
            Un totem dans l'espace commun, des lampes dans chaque logement. Les résidents proposent des activités, les lampes s'allument, le lien se crée. Sans écran complexe, sans application obligatoire.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <UButton
              to="#produits"
              class="rounded-full bg-heya-accent text-white"
            >
              Découvrir le produit
            </UButton>
            <UButton
              :to="CAL_COM_URL"
              target="_blank"
              variant="outline"
              class="rounded-full border-heya-dark text-heya-dark"
            >
              Voir une démo
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Products -->
    <section
      id="produits"
      class="bg-white py-16 sm:py-20"
    >
      <UContainer>
        <SectionHeader
          label="Les produits"
          title="Deux objets, un seul objectif"
          description="Le totem dans l'espace commun et la lampe relay dans chaque logement. Ensemble, ils transforment une intention en moment partagé."
          align="center"
          class="mx-auto mb-14"
        />
        <div class="grid gap-8 md:grid-cols-2">
          <article
            v-for="product in products"
            :key="product.title"
            class="rounded-2xl p-8"
            :class="product.bg"
          >
            <div class="mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/80">
              <UIcon :name="product.icon" class="size-8 text-heya-dark" />
            </div>
            <p class="text-xs font-semibold uppercase tracking-widest text-heya-dark-border">
              {{ product.label }}
            </p>
            <h3 class="mt-2 text-2xl font-bold text-heya-dark">
              {{ product.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-heya-dark-border">
              {{ product.description }}
            </p>
            <ul class="mt-4 space-y-2">
              <li
                v-for="feature in product.features"
                :key="feature"
                class="flex items-center gap-2 text-sm text-heya-dark-border"
              >
                <UIcon name="i-lucide-check" class="size-4 text-heya-teal" />
                {{ feature }}
              </li>
            </ul>
          </article>
        </div>
      </UContainer>
    </section>

  <!-- How it works -->
    <HowItWorksSection />

    <!-- Activities -->
    <section class="bg-[#deede2] py-16 sm:py-20">
      <UContainer>
        <SectionHeader
          label="Les activités"
          title="4 couleurs, 4 types d'activités"
          description="Chaque résidence définit le sens de chaque couleur. Configuration éditable par l'équipe."
          align="center"
          class="mx-auto mb-14"
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="activity in activities"
            :key="activity.label"
            class="rounded-2xl bg-white p-6 text-center"
          >
            <div
              class="mx-auto mb-4 size-12 rounded-full"
              :class="activity.color"
            />
            <h3 class="font-bold text-heya-dark">
              {{ activity.label }}
            </h3>
            <p class="mt-2 text-sm text-heya-dark-border">
              {{ activity.examples }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Dashboard preview -->
    <section class="bg-heya-dark py-16 sm:py-20">
      <UContainer>
        <SectionHeader
          label="Nos solutions"
          title="Un dashboard pour piloter la vie collective"
          description="Participation en temps réel, activités en cours, indicateurs pour la direction."
          align="center"
          label-class="text-heya-teal"
          class="mx-auto mb-14 [&_h2]:text-[#f1ede6] [&_p]:text-[#a39e96]"
        />
        <div class="mx-auto max-w-4xl rounded-2xl bg-heya-dark-muted p-8">
          <div class="grid gap-4 sm:grid-cols-4">
            <div
              v-for="(color, i) in ['bg-heya-yellow', 'bg-heya-step-green-fg', 'bg-heya-step-blue-fg', 'bg-heya-violet']"
              :key="i"
              class="rounded-xl bg-white/10 p-4"
            >
              <div class="mb-2 h-2 w-12 rounded" :class="color" />
              <div class="h-16 rounded bg-white/5" />
            </div>
          </div>
          <div class="mt-4 grid gap-4 lg:grid-cols-2">
            <div class="h-48 rounded-xl bg-white/10" />
            <div class="space-y-2">
              <div
                v-for="j in 5"
                :key="j"
                class="flex items-center gap-2 rounded-lg bg-white/5 p-3"
              >
                <span class="size-2 rounded-full bg-heya-orange" />
                <span class="h-2 flex-1 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <ContactCtaSection />
  </div>
</template>
