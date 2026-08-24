<script setup lang="ts">
const useCases = [
  {
    title: 'Résidences Seniors',
    description: 'Animez les espaces communs et créez du lien entre résidents seniors grâce à des activités adaptées.',
    to: '/solutions/residences-seniors',
    image: '/images/use-cases/seniors.png',
    icon: 'i-lucide-users-round',
    iconClass: 'bg-secondary-100 text-secondary'
  },
  {
    title: 'Co-living',
    description: 'Renforcez la cohésion de vos colocataires avec des événements et une gestion simplifiée au quotidien.',
    to: '/solutions/co-living',
    image: '/images/use-cases/coliving.png',
    icon: 'i-lucide-house',
    iconClass: 'bg-success/15 text-success'
  },
  {
    title: 'Étudiants',
    description: 'Créez une vraie vie de campus en fédérant vos résidents autour d\'activités et d\'échanges spontanés.',
    to: '/solutions/residences-etudiantes',
    image: '/images/use-cases/etudiants.png',
    icon: 'i-lucide-graduation-cap',
    iconClass: 'bg-info/15 text-info'
  },
  {
    title: 'Inclusif',
    description: 'Favorisez l\'inclusion et l\'autonomie des résidents avec des outils pensés pour les accompagnants.',
    to: '/solutions/habitat-inclusif',
    image: '/images/use-cases/inclusif.png',
    icon: 'i-lucide-heart-handshake',
    iconClass: 'bg-primary-100 text-primary'
  }
]
</script>

<template>
  <UPageSection
    id="pour-qui"
    headline="Pour qui ?"
    title="Heya pour tous les habitats partagés"
  >
    <div class="flex flex-col gap-8">
      <div class="grid gap-8 lg:grid-cols-2">
        <NuxtLink
          v-for="item in useCases.slice(0, 2)"
          :key="item.to"
          :to="item.to"
          class="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-[0_18px_40px_-12px_rgba(15,23,43,0.12)] sm:h-[358px] sm:p-8"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 via-[35%] to-black/75" />

          <div class="relative space-y-3">
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full"
                :class="item.iconClass"
              >
                <UIcon
                  :name="item.icon"
                  class="size-5"
                />
              </div>
              <h3 class="text-[22px] font-semibold text-white">
                {{ item.title }}
              </h3>
            </div>
            <p class="text-base leading-relaxed text-white">
              {{ item.description }}
            </p>
            <span class="inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-white">
              Découvrir
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </span>
          </div>
        </NuxtLink>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <NuxtLink
          v-for="item in useCases.slice(2)"
          :key="item.to"
          :to="item.to"
          class="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-[0_18px_40px_-12px_rgba(15,23,43,0.12)] sm:h-[358px] sm:p-8"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 via-[35%] to-black/75" />

          <div class="relative space-y-3">
            <div class="flex items-center gap-3.5">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full"
                :class="item.iconClass"
              >
                <UIcon
                  :name="item.icon"
                  class="size-5"
                />
              </div>
              <h3 class="text-[22px] font-semibold text-white">
                {{ item.title }}
              </h3>
            </div>
            <p class="text-base leading-relaxed text-white">
              {{ item.description }}
            </p>
            <span class="inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-white">
              Découvrir
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </UPageSection>
</template>
