<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Notre engagement | Heya — Réenchanter le quotidien en habitat partagé',
  description: 'Heya, né à Nantes en 2023 : mission, valeurs et parcours d\'Elise Furnon. Lutter contre l\'isolement, créer du lien en habitat partagé.'
})

const heroLinks: ButtonProps[] = [
  {
    label: 'Découvrir notre mission',
    to: '#mission',
    icon: 'i-lucide-rocket'
  }
]

const sectionUi = {
  root: '!py-16 sm:!py-20',
  container: '!gap-10',
  headline: 'border border-primary/50 text-primary rounded-full text-[10px] font-semibold uppercase tracking-widest'
}

const timeline = [
  { year: '2021', title: 'Naissance de l\'idée', description: 'La Fabrique des Collectifs dessine les premiers contours d\'habitat partagé innovant.', dotClass: 'bg-heya-orange' },
  { year: '2022', title: 'Premiers tests', description: 'Lancement des premiers projets pilotes à Nantes auprès d\'une communauté pionnière.', dotClass: 'bg-heya-yellow' },
  { year: '2023', title: 'Lancement officiel', description: 'Heya se déploie pour structurer et animer la vie collective en habitat partagé.', dotClass: 'bg-primary' },
  { year: '2026', title: 'Croissance nationale', description: 'Déploiement de notre solution dans plusieurs grandes métropoles françaises.', dotClass: 'bg-heya-violet' }
]

const missions = [
  { title: 'Créer du lien social', description: 'Lutter contre l\'isolement en encourageant la convivialité intergénérationnelle et l\'esprit de famille au quotidien.', iconClass: 'bg-heya-violet' },
  { title: 'Favoriser l\'inclusivité', description: 'Dépasser les barrières de langue, de génération, de handicap et de fracture numérique.', iconClass: 'bg-heya-teal' },
  { title: 'Simplifier le travail des équipes', description: 'Soulager conciergeries et équipes d\'animation grâce à un outil fluide et un accompagnement de proximité.', iconClass: 'bg-heya-blue' }
]

const awards = [
  { title: 'Prix de l\'Innovation Sociale', org: 'Région Pays de la Loire', tag: 'Innovation Sociale', tagClass: 'bg-[#5b8fb9]/12 text-[#5b8fb9]', barClass: 'bg-[#5b8fb9]', image: '/images/about/award-1.png' },
  { title: 'Lauréat Silver Economy', org: 'Ministère de la Santé', tag: 'Silver Economy', tagClass: 'bg-[#e0a542]/12 text-[#e0a542]', barClass: 'bg-[#e0a542]', image: '/images/about/award-2.png' },
  { title: 'Trophée Inclusion', org: 'Fondation de France', tag: 'Inclusion', tagClass: 'bg-[#d4763a]/12 text-[#d4763a]', barClass: 'bg-[#d4763a]', image: '/images/about/award-3.png' },
  { title: 'Prix Startup Logement', org: 'Union Sociale Habitat', tag: 'Startup', tagClass: 'bg-[#8b7ab8]/12 text-[#8b7ab8]', barClass: 'bg-[#8b7ab8]', image: '/images/about/award-4.png' }
]

const partners = [
  { name: 'Gérontopôle Autonomie Longévité', src: '/images/partners/gerontopole.png' },
  { name: 'Nantes Métropole Habitat', src: '/images/partners/nantes-metropole-habitat.png' },
  { name: 'Pépite Pays de la Loire', src: '/images/partners/pepite-pays-de-la-loire.png' },
  { name: 'Startups & Innovation Day', src: '/images/partners/startups-innovation-day.png' },
  { name: 'Équipe Heya', src: '/images/partners/equipe.png' },
  { name: 'Gérontopôle Pays de la Loire', src: '/images/partners/gerontopole.png' }
]

const ctaLinks: ButtonProps[] = [
  { label: 'Demander une démo', to: CAL_COM_URL, target: '_blank' }
]
</script>

<template>
  <div>
    <UPageHero
      title="Une aventure née d'une conviction"
      description="Heya est né d'une conviction simple : en habitat partagé, le lien social ne devrait pas dépendre d'un affichage mal lu ou d'une application de plus. Notre mission est de rendre la convivialité visible, accessible et mesurable."
      orientation="horizontal"
      :links="heroLinks"
      :ui="{
        root: 'bg-default !py-16 sm:!py-20',
        container: 'lg:!gap-12 items-center',
        wrapper: '!gap-6',
        title: 'text-4xl sm:text-5xl font-bold text-highlighted',
        description: 'text-muted text-base max-w-xl'
      }"
    >
      <img
        src="/images/about/hero-circle.png"
        alt="Moment convivial en habitat partagé"
        class="mx-auto size-[320px] rounded-full object-cover lg:size-[400px]"
        width="400"
        height="400"
      >
    </UPageHero>

    <UPageSection
      headline="La genèse"
      title="Notre parcours pas à pas"
      :ui="{ ...sectionUi, root: `${sectionUi.root} bg-[#f7f2e8]` }"
    >
      <div class="relative grid w-full gap-6 lg:grid-cols-4">
        <div class="pointer-events-none absolute inset-x-0 top-16 hidden h-0.5 bg-[#e8e1d5] lg:block" />
        <UPageCard
          v-for="item in timeline"
          :key="item.year"
          :title="item.title"
          :description="item.description"
          :ui="{
            root: 'rounded-[20px] p-8 gap-5',
            header: 'mb-0 gap-2',
            body: 'gap-3',
            title: 'text-[22px] font-bold',
            description: 'text-muted text-base'
          }"
        >
          <template #header>
            <span
              class="size-3 rounded-full ring-8 ring-[#f7f2e8]"
              :class="item.dotClass"
            />
            <p class="text-[40px] font-bold leading-none text-primary sm:text-5xl">
              {{ item.year }}
            </p>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <UPageSection
      id="mission"
      headline="Notre mission"
      title="Ce qui nous anime au quotidien"
      :ui="{ ...sectionUi, root: `${sectionUi.root} bg-default` }"
    >
      <div class="grid w-full gap-6 md:grid-cols-3">
        <UPageCard
          v-for="mission in missions"
          :key="mission.title"
          :title="mission.title"
          :description="mission.description"
          :ui="{
            root: 'rounded-2xl p-8 gap-5',
            header: 'mb-0',
            body: 'gap-3',
            description: 'text-muted'
          }"
        >
          <template #leading>
            <span
              class="size-11 shrink-0 rounded-full"
              :class="mission.iconClass"
            />
          </template>
        </UPageCard>
      </div>
    </UPageSection>

    <UPageSection
      orientation="horizontal"
      reverse
      headline="La fondatrice"
      title="Elise Furnon"
      :links="[{ label: 'Nous contacter', to: '/contact' }]"
      :ui="{
        root: 'bg-white !py-16 sm:!py-20',
        container: 'lg:!gap-16 items-center',
        wrapper: 'gap-3 items-start',
        headline: sectionUi.headline,
        title: 'text-4xl sm:text-5xl font-bold',
        description: 'text-muted text-base'
      }"
    >
      <template #description>
        <p class="text-lg font-medium text-primary">
          Fondatrice de Heya
        </p>
        <p class="text-muted">
          Designer à l'École de Design de Nantes, Elise imagine des solutions pour recréer du lien dans les habitats partagés. Convaincue que le bien-vivre collectif passe par des objets simples, elle a conçu Heya autour du totem et de la lampe relay.
        </p>
      </template>
      <div class="overflow-hidden rounded-3xl bg-primary">
        <img
          src="/images/about/elise.png"
          alt="Elise Furnon, fondatrice de Heya"
          class="h-[450px] w-full object-cover object-[center_20%]"
          width="640"
          height="450"
        >
      </div>
    </UPageSection>

    <UPageSection
      headline="Prix & récompenses"
      title="Des distinctions qui honorent notre démarche"
      :ui="sectionUi"
    >
      <div class="grid w-full gap-7 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="award in awards"
          :key="award.title"
          class="overflow-hidden rounded-[20px] border border-default bg-white shadow-md"
        >
          <img
            :src="award.image"
            :alt="award.title"
            class="h-40 w-full object-cover"
            width="302"
            height="160"
          >
          <div class="space-y-2.5 px-6 pb-5 pt-4">
            <UBadge
              :label="award.tag"
              :class="award.tagClass"
              variant="soft"
            />
            <h3 class="text-lg font-bold text-highlighted">
              {{ award.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ award.org }}
            </p>
          </div>
          <div
            class="h-[3px] w-full"
            :class="award.barClass"
          />
        </article>
      </div>
    </UPageSection>

    <UPageSection
      title="Ils nous soutiennent"
      description="Des partenaires institutionnels et des experts qui croient en notre mission de transformer la vie collective en habitat partagé."
      :ui="{
        root: 'bg-[#deede2] !py-16 sm:!py-20',
        container: '!gap-10',
        title: 'text-3xl font-semibold text-highlighted',
        description: 'text-muted max-w-xl mx-auto'
      }"
    >
      <div class="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        <UPageCard
          v-for="partner in partners"
          :key="partner.name"
          :ui="{
            root: 'rounded-xl bg-default ring-1 ring-[#e1d9ca] h-[160px] sm:h-[200px] p-4 flex items-center justify-center'
          }"
        >
          <img
            :src="partner.src"
            :alt="partner.name"
            class="max-h-28 w-full object-contain"
            width="153"
            height="156"
          >
        </UPageCard>
      </div>
    </UPageSection>

    <UPageCTA
      variant="naked"
      title="Prêt à transformer votre résidence ?"
      description="Découvrez comment Heya peut aider votre équipe à gagner du temps et à recréer du lien entre les résidents."
      :links="ctaLinks"
      class="rounded-none"
      :ui="{
        root: 'bg-[#231f1e] !py-16 sm:!py-20',
        container: 'flex-col items-center text-center !gap-8',
        title: 'text-3xl font-semibold text-white text-center',
        description: 'text-white/90 text-center max-w-xl mx-auto',
        links: 'justify-center mt-0'
      }"
    />
  </div>
</template>
