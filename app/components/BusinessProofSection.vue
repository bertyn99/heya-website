<script setup lang="ts">
const partners = [
  { name: 'Gérontopôle Autonomie Longévité', logo: '/images/partners/gerontopole.png' },
  { name: 'Nantes Métropole Habitat', logo: '/images/partners/nantes-metropole-habitat.png' },
  { name: 'Pépite Pays de la Loire', logo: '/images/partners/pepite-pays-de-la-loire.png' },
  { name: 'Startups & Innovation Day', logo: '/images/partners/startups-innovation-day.png' }
]
</script>

<template>
  <UPageSection>
    <UPageLogos title="Ils nous font confiance">
      <div class="flex flex-wrap items-center justify-center gap-8">
        <img
          v-for="partner in partners"
          :key="partner.name"
          :src="partner.logo"
          :alt="partner.name"
          class="h-12 w-auto max-w-28 object-contain opacity-70 grayscale transition-opacity duration-200 hover:opacity-100 hover:grayscale-0"
          width="120"
          height="60"
        >
      </div>
    </UPageLogos>
  </UPageSection>
</template>
