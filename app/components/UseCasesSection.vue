<script setup lang="ts">
const useCases = [
  {
    title: 'Résidences seniors',
    description: 'Animez les espaces communs et créez du lien entre résidents grâce à des activités adaptées.',
    to: '/solutions/residences-seniors',
    image: '/images/use-cases/seniors.png',
    featured: true
  },
  {
    title: 'Co-living',
    description: 'Renforcez la cohésion sans recruter un community manager à temps plein.',
    to: '/solutions/co-living',
    image: '/images/use-cases/coliving.png',
    featured: false
  },
  {
    title: 'Résidences étudiantes',
    description: 'Fédérez vos résidents autour d\'activités spontanées, sans application à installer.',
    to: '/solutions/residences-etudiantes',
    image: '/images/use-cases/etudiants.png',
    featured: false
  },
  {
    title: 'Habitat inclusif',
    description: 'Un signal visible pour tous les profils, pensé avec les accompagnants.',
    to: '/solutions/habitat-inclusif',
    image: '/images/use-cases/inclusif.png',
    featured: false
  }
]
</script>

<template>
  <UPageSection
    id="pour-qui"
    headline="Pour qui"
    title="Heya pour tous les habitats partagés"
  >
    <div class="grid w-full gap-6 lg:grid-cols-3 lg:grid-rows-3">
      <NuxtLink
        v-for="item in useCases"
        :key="item.to"
        :to="item.to"
        class="group relative flex min-h-60 flex-col justify-end overflow-hidden rounded-[1.25rem] p-6 shadow-(--shadow-heya) transition-transform duration-300 hover:-translate-y-1 sm:p-8"
        :class="item.featured ? 'lg:col-span-2 lg:row-span-3 lg:min-h-130' : 'lg:min-h-0'"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-linear-to-b from-black/0 via-[#2a2520]/20 to-[#2a2520]/80" />

        <div class="relative space-y-3">
          <h3
            class="font-semibold text-white"
            :class="item.featured ? 'text-2xl sm:text-3xl' : 'text-xl'"
          >
            {{ item.title }}
          </h3>
          <p class="max-w-[42ch] text-sm leading-relaxed text-white/90 sm:text-base">
            {{ item.description }}
          </p>
          <span class="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-white">
            Découvrir
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </NuxtLink>
    </div>
  </UPageSection>
</template>
