<script setup lang="ts">
const values = [
  {
    title: 'Simple',
    description: 'Pas d\'écran complexe, pas d\'application obligatoire. Le totem et la lampe relay parlent à tout le monde.',
    icon: 'i-lucide-sparkles',
    bg: 'bg-heya-step-blue'
  },
  {
    title: 'Inclusif',
    description: 'Accessible aux personnes âgées, aux étudiants internationaux, aux personnes en fracture numérique.',
    icon: 'i-lucide-heart-handshake',
    bg: 'bg-heya-step-gold'
  },
  {
    title: 'Ludique',
    description: 'Proposer une activité devient un geste léger. La convivialité repart du quotidien, pas d\'un planning imposé.',
    icon: 'i-lucide-party-popper',
    bg: 'bg-heya-step-green'
  }
]
</script>

<template>
  <section
    id="valeurs"
    class="bg-white py-20 sm:py-24"
  >
    <UContainer>
      <SectionHeader
        label="Nos valeurs"
        title="Simple, inclusif, ludique"
        description="Heya dépasse les barrières de langue, de génération, de handicap et de fracture numérique."
        align="center"
        label-class="text-heya-terracotta"
        class="mx-auto mb-14"
      />

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="value in values"
          :key="value.title"
          class="rounded-2xl border border-heya-dark-border/10 p-8"
          :class="value.bg"
        >
          <div class="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/80">
            <UIcon
              :name="value.icon"
              class="size-6 text-heya-dark"
            />
          </div>
          <h3 class="text-xl font-bold text-heya-dark">
            {{ value.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-heya-dark-border">
            {{ value.description }}
          </p>
        </article>
      </div>
    </UContainer>
  </section>
</template>
