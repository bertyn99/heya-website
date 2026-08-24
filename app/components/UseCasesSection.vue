<script setup lang="ts">
const useCases = [
  {
    title: 'Résidences Seniors',
    description: 'Animez les espaces communs et créez du lien entre résidents seniors grâce à des activités adaptées.',
    to: '/solutions/residences-seniors',
    image: '/images/use-cases/seniors.png',
    icon: 'i-lucide-users-round',
    spotlightColor: 'secondary' as const,
    iconClass: 'bg-secondary-100 text-secondary'
  },
  {
    title: 'Co-living',
    description: 'Renforcez la cohésion de vos colocataires avec des événements et une gestion simplifiée au quotidien.',
    to: '/solutions/co-living',
    image: '/images/use-cases/coliving.png',
    icon: 'i-lucide-house',
    spotlightColor: 'success' as const,
    iconClass: 'bg-success/15 text-success'
  },
  {
    title: 'Étudiants',
    description: 'Créez une vraie vie de campus en fédérant vos résidents autour d\'activités et d\'échanges spontanés.',
    to: '/solutions/residences-etudiantes',
    image: '/images/use-cases/etudiants.png',
    icon: 'i-lucide-graduation-cap',
    spotlightColor: 'info' as const,
    iconClass: 'bg-info/15 text-info'
  },
  {
    title: 'Inclusif',
    description: 'Favorisez l\'inclusion et l\'autonomie des résidents avec des outils pensés pour les accompagnants.',
    to: '/solutions/habitat-inclusif',
    image: '/images/use-cases/inclusif.png',
    icon: 'i-lucide-heart-handshake',
    spotlightColor: 'primary' as const,
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
    <UPageGrid class="gap-8 lg:grid-cols-2">
      <div
        v-for="item in useCases"
        :key="item.to"
        class="group relative min-h-[280px] overflow-hidden rounded-3xl shadow-[0_18px_40px_-12px_rgba(15,23,43,0.12)] sm:min-h-[358px]"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 via-[35%] to-black/75" />

        <UPageCard
          :to="item.to"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          variant="naked"
          spotlight
          :spotlight-color="item.spotlightColor"
          class="relative h-full min-h-[280px] bg-transparent sm:min-h-[358px]"
          :ui="{
            container: 'justify-end p-6 sm:p-8',
            leading: `flex size-10 items-center justify-center rounded-full ${item.iconClass}`,
            leadingIcon: 'size-5',
            title: 'text-[22px] font-semibold text-white',
            description: 'text-base leading-relaxed text-white',
            footer: 'pt-2'
          }"
        >
          <template #footer>
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-white">
              Découvrir
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </span>
          </template>
        </UPageCard>
      </div>
    </UPageGrid>
  </UPageSection>
</template>
