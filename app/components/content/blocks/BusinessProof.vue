<script setup lang="ts">
import type { BusinessProofBlock } from '#shared/types/blocks'

const props = withDefaults(defineProps<BusinessProofBlock>(), {
  title: 'Ils nous font confiance',
  partners: () => [
    { name: 'Gérontopôle Autonomie Longévité', logo: '/images/partners/gerontopole.png' },
    { name: 'Nantes Métropole Habitat', logo: '/images/partners/nantes-metropole-habitat.png' },
    { name: 'Pépite Pays de la Loire', logo: '/images/partners/pepite-pays-de-la-loire.png' },
    { name: 'Startups & Innovation Day', logo: '/images/partners/startups-innovation-day.png' }
  ]
})

const brokenLogos = ref<string[]>([])

function logoSrc(src: string) {
  return brokenLogos.value.includes(src) ? '' : src
}

function markBroken(src: string) {
  if (!brokenLogos.value.includes(src)) {
    brokenLogos.value = [...brokenLogos.value, src]
  }
}

const visiblePartners = computed(() =>
  props.partners.filter(partner => partner.logo && logoSrc(partner.logo))
)
</script>

<template>
  <UPageSection>
    <UPageLogos :title="props.title">
      <div class="flex flex-wrap items-center justify-center gap-8">
        <img
          v-for="partner in visiblePartners"
          :key="partner.name"
          :src="partner.logo"
          :alt="partner.name"
          class="h-12 w-auto max-w-28 object-contain opacity-70 grayscale transition-opacity duration-200 hover:opacity-100 hover:grayscale-0"
          width="120"
          height="60"
          @error="markBroken(partner.logo)"
        >
        <p
          v-if="!visiblePartners.length"
          class="text-sm text-muted"
        >
          {{ props.title }}
        </p>
      </div>
    </UPageLogos>
  </UPageSection>
</template>
