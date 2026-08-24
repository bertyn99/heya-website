<script setup lang="ts">
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Notre engagement | Heya — Réenchanter le quotidien en habitat partagé',
  description: 'Heya, né à Nantes en 2023 : mission, valeurs et parcours d\'Elise Furnon. Lutter contre l\'isolement, créer du lien en habitat partagé.'
})

const timeline = [
  { year: '2021', title: 'Naissance de l\'idée', description: 'La Fabrique des Collectifs dessine les premiers contours d\'habitats partagés innovants à Nantes.' },
  { year: '2022', title: 'Premiers tests', description: 'Lancement de projets pilotes auprès de communautés pionnières.' },
  { year: '2023', title: 'Lancement officiel de Heya', description: 'Elise Furnon structure le projet : totem, lampes relay, dashboard.' },
  { year: '2024–2026', title: 'Déploiement et élargissement', description: 'Heya s\'adapte à de nouveaux types d\'habitat : seniors, étudiants, co-living, inclusif.' }
]

const timelineColors = ['bg-heya-step-blue-fg', 'bg-heya-yellow', 'bg-heya-orange', 'bg-heya-violet']

const missions = [
  { title: 'Créer du lien social', description: 'Lutter contre l\'isolement et la sédentarité en habitat partagé.', icon: 'i-lucide-heart' },
  { title: 'Favoriser l\'inclusivité', description: 'Dépasser les barrières de langue, de génération, de handicap et de fracture numérique.', icon: 'i-lucide-accessibility' },
  { title: 'Simplifier le travail des équipes', description: 'Soulager conciergeries et équipes d\'animation grâce à un outil fluide et concret.', icon: 'i-lucide-wrench' }
]

const awards = [
  { title: 'Fabrique des Collectifs', year: '2023', color: 'text-heya-step-gold-fg' },
  { title: 'École de Design de Nantes', year: '2023', color: 'text-heya-accent' },
  { title: 'Prix innovation habitat', year: '2024', color: 'text-heya-step-green-fg' },
  { title: 'Résidence pilote', year: '2025', color: 'text-heya-violet' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer>
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="space-y-6">
            <p class="text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
              Notre engagement
            </p>
            <h1 class="text-3xl font-bold leading-tight text-heya-dark sm:text-4xl">
              Réenchanter le quotidien en passant de bons moments ensemble
            </h1>
            <p class="text-lg leading-relaxed text-heya-dark-border">
              Heya est né d'une conviction simple : en habitat partagé, le lien social ne devrait pas dépendre d'un affichage mal lu ou d'une application de plus.
            </p>
            <UButton
              to="#mission"
              class="rounded-full bg-heya-accent text-white"
            >
              Découvrir notre mission
            </UButton>
          </div>
          <div class="flex justify-center">
            <div class="relative size-80">
              <div class="absolute inset-0 rounded-full bg-heya-accent/10" />
              <div class="absolute inset-8 rounded-full bg-heya-accent/20" />
              <div class="absolute inset-16 flex items-center justify-center rounded-full bg-white shadow-md">
                <UIcon name="i-lucide-heart-handshake" class="size-20 text-heya-accent" />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Timeline -->
    <section class="bg-white py-16 sm:py-20">
      <UContainer>
        <SectionHeader
          label="La genèse"
          title="Notre parcours pas à pas"
          align="center"
          class="mx-auto mb-14"
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(item, i) in timeline"
            :key="item.year"
            class="text-center"
          >
            <p
              class="mb-2 text-xs font-semibold"
              :class="timelineColors[i]"
            >
              {{ item.year }}
            </p>
            <div class="mx-auto mb-3 size-5 rounded-full bg-heya-violet/30" />
            <div class="rounded-xl border border-[#e1d9ca] bg-heya-cream p-5">
              <h3 class="font-semibold text-heya-dark">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm text-heya-dark-border">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Mission -->
    <section
      id="mission"
      class="bg-[#deede2] py-16 sm:py-20"
    >
      <UContainer>
        <SectionHeader
          label="Notre mission"
          title="Ce qui nous anime au quotidien"
          align="center"
          class="mx-auto mb-14"
        />
        <div class="grid gap-6 md:grid-cols-3">
          <article
            v-for="mission in missions"
            :key="mission.title"
            class="rounded-2xl bg-white p-8 text-center"
          >
            <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-heya-cream">
              <UIcon :name="mission.icon" class="size-7 text-heya-accent" />
            </div>
            <h3 class="font-bold text-heya-dark">
              {{ mission.title }}
            </h3>
            <p class="mt-2 text-sm text-heya-dark-border">
              {{ mission.description }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Founder -->
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer>
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="flex justify-center">
            <div class="relative size-72">
              <div class="absolute inset-0 rounded-full bg-heya-accent/15" />
              <div class="absolute inset-6 rounded-full bg-heya-accent/25" />
              <div class="absolute inset-12 flex items-center justify-center rounded-full bg-white shadow-md">
                <UIcon name="i-lucide-user" class="size-16 text-heya-accent" />
              </div>
            </div>
          </div>
          <div class="space-y-5">
            <p class="text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
              La fondatrice
            </p>
            <h2 class="text-3xl font-bold text-heya-dark">
              Elise Furnon
            </h2>
            <p class="leading-relaxed text-heya-dark-border">
              Designer à l'École de Design de Nantes, Elise imagine des solutions pour recréer du lien dans les habitats partagés. Convaincue que le bien-vivre collectif passe par des objets simples et des moments partagés, elle a conçu Heya autour du totem et de la lampe relay.
            </p>
            <p class="text-sm text-heya-dark-border">
              elise@heyaconvivialite.fr · 06 76 72 14 67
            </p>
            <UButton
              to="/contact"
              class="rounded-full bg-heya-accent text-white"
            >
              Nous contacter
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Awards -->
    <section class="bg-heya-step-gold py-16 sm:py-20">
      <UContainer>
        <SectionHeader
          label="Prix & récompenses"
          title="Reconnu par nos pairs"
          align="center"
          label-class="text-heya-step-gold-fg"
          class="mx-auto mb-14"
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="award in awards"
            :key="award.title"
            class="rounded-2xl border border-[#e1d9ca] bg-white p-8 text-center"
          >
            <UIcon name="i-lucide-award" class="mx-auto mb-4 size-12 text-heya-step-gold-fg" />
            <h3 class="font-semibold text-heya-dark">
              {{ award.title }}
            </h3>
            <p
              class="mt-2 text-sm font-medium"
              :class="award.color"
            >
              {{ award.year }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Partners -->
    <section class="bg-white py-16 sm:py-20">
      <UContainer>
        <SectionHeader
          label="Ils nous soutiennent"
          title="Nos partenaires et institutions"
          align="center"
          class="mx-auto mb-14"
        />
        <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
          <div
            v-for="i in 12"
            :key="i"
            class="flex aspect-square items-center justify-center rounded-xl bg-heya-cream"
          >
            <UIcon name="i-lucide-building-2" class="size-8 text-heya-dark-border/40" />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <section class="bg-heya-dark py-16">
      <UContainer class="text-center">
        <h2 class="text-2xl font-bold text-[#f1ede6]">
          Envie d'en savoir plus ?
        </h2>
        <UButton
          :to="CAL_COM_URL"
          target="_blank"
          class="mt-6 rounded-full bg-heya-accent px-8 text-white"
        >
          Prendre rendez-vous
        </UButton>
      </UContainer>
    </section>
  </div>
</template>
