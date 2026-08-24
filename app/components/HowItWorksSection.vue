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
  >
    <div class="flex flex-col gap-5">
      <UPageCard
        v-for="step in steps"
        :key="step.num"
        :title="step.title"
        :description="step.description"
        orientation="horizontal"
        variant="soft"
        :class="step.cardClass"
        :ui="{
          root: 'rounded-[20px] ring-0',
          container: 'items-center p-7 sm:p-9',
          title: 'text-xl font-bold text-highlighted',
          description: 'text-sm text-muted max-w-lg'
        }"
      >
        <template #header>
          <UBadge
            :label="step.num"
            variant="soft"
            class="rounded-full"
            :class="step.accentClass"
          />
        </template>

        <img
          :src="step.image"
          :alt="step.imageAlt"
          class="h-auto w-full rounded-xl object-contain sm:w-[300px]"
          width="300"
          height="148"
          loading="lazy"
        >
      </UPageCard>
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
