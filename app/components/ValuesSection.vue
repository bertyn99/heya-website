<script setup lang="ts">
const values = [
  {
    title: 'Simple',
    description: 'Pas d\'écran complexe, pas d\'application obligatoire. Le totem et la lampe relay parlent à tout le monde.',
    bg: 'bg-heya-step-blue',
    offset: ''
  },
  {
    title: 'Inclusif',
    description: 'Accessible aux personnes âgées, aux étudiants internationaux, aux personnes en fracture numérique.',
    bg: 'bg-heya-step-gold',
    offset: 'md:mt-10'
  },
  {
    title: 'Ludique',
    description: 'Proposer une activité devient un geste léger. La convivialité repart du quotidien, pas d\'un planning imposé.',
    bg: 'bg-heya-step-green',
    offset: 'md:mt-20'
  }
]
</script>

<template>
  <UPageSection
    id="valeurs"
    headline="Nos valeurs"
    title="Simple, inclusif, ludique"
    description="Heya dépasse les barrières de langue, de génération, de handicap et de fracture numérique."
    :ui="{
      root: 'bg-white',
      description: 'max-w-[40rem]'
    }"
  >
    <div class="grid w-full gap-5 md:grid-cols-3">
      <article
        v-for="value in values"
        :key="value.title"
        class="rounded-[1.25rem] p-8 transition-transform duration-200 hover:-translate-y-1"
        :class="[value.bg, value.offset]"
      >
        <h3 class="text-3xl font-bold tracking-tight text-highlighted">
          {{ value.title }}
        </h3>
        <p class="mt-4 max-w-[32ch] text-sm leading-relaxed text-toned">
          {{ value.description }}
        </p>
      </article>
    </div>
  </UPageSection>
</template>
