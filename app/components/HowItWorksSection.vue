<script setup lang="ts">
const steps = [
  {
    num: '01',
    title: 'Proposer une activité',
    description: 'Au totem, un résident crée une activité avec son porte-clés : jeux, café, balade… Chacun choisit le code couleur.',
    cardClass: 'bg-step-blue',
    accentClass: 'text-step-blue-fg bg-step-blue-fg/20',
    image: '/images/how-it-works/etape-1-cles.png',
    imageAlt: 'Un résident propose une activité au totem avec son porte-clés Heya'
  },
  {
    num: '02',
    title: 'Les relais s\'allument',
    description: 'Les lampes dans chaque appartement s\'illuminent de la couleur de l\'activité. Impossible de manquer l\'invitation.',
    cardClass: 'bg-step-gold',
    accentClass: 'text-step-gold-fg bg-step-gold-fg/20',
    image: '/images/how-it-works/etape-2-lampe.png',
    imageAlt: 'Une lampe-relais s\'allume dans un appartement avec la couleur de l\'activité'
  },
  {
    num: '03',
    title: 'Se retrouver ensemble',
    description: 'Les voisins rejoignent l\'activité dans les espaces communs. Le lien se crée naturellement.',
    cardClass: 'bg-step-green',
    accentClass: 'text-step-green-fg bg-step-green-fg/20',
    image: '/images/how-it-works/etape-3-cartes.png',
    imageAlt: 'Des résidents se retrouvent dans le couloir grâce à leurs cartes Heya'
  }
]

const activityLegend = [
  { label: 'Jeux', colorClass: 'bg-activity-blue' },
  { label: 'Extérieur', colorClass: 'bg-activity-yellow' },
  { label: 'Manuel', colorClass: 'bg-activity-orange' },
  { label: 'Café', colorClass: 'bg-activity-violet' }
]
</script>

<template>
  <UPageSection
    id="comment-ca-marche"
    headline="Comment ça marche"
    title="Une méthode propre, un accompagnement humain"
    description="Un résident propose une activité au totem. Les lampes s'allument chez chacun. Il n'y a plus qu'à se retrouver dans le salon."
    :ui="{
      description: 'max-w-[40rem]'
    }"
  >
    <div class="flex w-full flex-col gap-5">
      <article
        v-for="(step, index) in steps"
        :key="step.num"
        class="grid items-center gap-6 rounded-[1.25rem] p-7 sm:grid-cols-2 sm:gap-10 sm:p-9"
        :class="step.cardClass"
      >
        <div
          class="space-y-4"
          :class="index % 2 === 1 ? 'sm:order-2' : ''"
        >
          <span
            class="inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold tabular"
            :class="step.accentClass"
          >
            {{ step.num }}
          </span>
          <h3 class="text-xl font-bold tracking-tight text-highlighted">
            {{ step.title }}
          </h3>
          <p class="max-w-lg text-sm leading-relaxed text-muted">
            {{ step.description }}
          </p>
        </div>

        <div
          class="flex min-h-44 items-center justify-center"
          :class="index % 2 === 1 ? 'sm:order-1' : ''"
        >
          <img
            :src="step.image"
            :alt="step.imageAlt"
            class="mx-auto block h-auto max-h-48 w-auto max-w-full object-contain"
            width="300"
            height="200"
            loading="lazy"
          >
        </div>
      </article>
    </div>

    <template #footer>
      <div class="flex flex-wrap items-center justify-center gap-5">
        <div
          v-for="item in activityLegend"
          :key="item.label"
          class="flex items-center gap-1.5"
        >
          <span
            class="size-2 rounded-full"
            :class="item.colorClass"
          />
          <span class="text-xs text-muted">
            {{ item.label }}
          </span>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
