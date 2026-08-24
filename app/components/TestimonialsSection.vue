<script setup lang="ts">
const testimonials = [
  {
    quote: 'Depuis l\'installation de Heya, les voisins se retrouvent vraiment. On se propose des activités, on s\'entraide. C\'est exactement ce qu\'il nous fallait.',
    name: 'Marie Dupont',
    role: 'Résidente',
    badge: 'Résidente',
    image: '/images/testimonials/portrait-1.png'
  },
  {
    quote: 'On ne court plus après l\'info. Les résidents se retrouvent d\'eux-mêmes, et on voit enfin ce qui mobilise.',
    name: 'Sophie Martin',
    role: 'Directrice de résidence',
    badge: 'Directrice de résidence',
    image: '/images/testimonials/portrait-1.png'
  }
]

const current = ref(0)

function prev() {
  current.value = (current.value - 1 + testimonials.length) % testimonials.length
}

function next() {
  current.value = (current.value + 1) % testimonials.length
}

const active = computed(() => testimonials[current.value]!)
</script>

<template>
  <UPageSection
    id="temoignages"
    headline="Témoignages"
    title="Ce qu'en disent les équipes et les résidents"
    description="Découvrez les retours de structures équipées Heya. (Contenu réel à fournir par la cliente.)"
  >
    <UPageCard
      variant="subtle"
      orientation="horizontal"
      :ui="{
        root: 'overflow-hidden rounded-2xl bg-muted',
        container: 'p-0 sm:p-0 lg:grid-cols-[380px_1fr]',
        title: 'text-xl font-bold sm:text-2xl',
        description: 'hidden'
      }"
    >
      <img
        :src="active.image"
        :alt="`Portrait de ${active.name}`"
        class="hidden h-full min-h-[400px] w-full object-cover lg:block"
        width="380"
        height="684"
      >

      <template #header>
        <UBadge
          :label="active.badge"
          color="primary"
          variant="soft"
          class="rounded-full"
        />
      </template>

      <template #title>
        « {{ active.quote }} »
      </template>

      <template #footer>
        <div class="flex items-end justify-between gap-4">
          <UUser
            :name="active.name"
            :description="active.role"
          />
          <div class="flex gap-2">
            <UButton
              icon="i-lucide-arrow-left"
              variant="outline"
              color="neutral"
              square
              aria-label="Témoignage précédent"
              @click="prev"
            />
            <UButton
              icon="i-lucide-arrow-right"
              variant="outline"
              color="neutral"
              square
              aria-label="Témoignage suivant"
              @click="next"
            />
          </div>
        </div>
      </template>
    </UPageCard>
  </UPageSection>
</template>
