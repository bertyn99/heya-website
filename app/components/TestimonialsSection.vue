<script setup lang="ts">
const testimonials = [
  {
    quote: 'Depuis l\'installation de Heya, les voisins se retrouvent vraiment. On se propose des activités, on s\'entraide. C\'est exactement ce qu\'il nous fallait.',
    name: 'Marie Dupont',
    role: 'Résidente *(placeholder)*',
    badge: 'Résidente',
    image: '/images/testimonials/portrait-1.png'
  },
  {
    quote: 'On ne court plus après l\'info. Les résidents se retrouvent d\'eux-mêmes, et on voit enfin ce qui mobilise.',
    name: 'Sophie Martin',
    role: 'Directrice de résidence *(placeholder)*',
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
    :ui="{
      headline: 'text-primary font-semibold normal-case tracking-normal text-base'
    }"
    headline="Témoignages"
    title="Ce qu'en disent les équipes et les résidents"
    description="Découvrez les retours de structures équipées Heya. *(Contenu réel à fournir par la cliente.)*"
  >
    <div
      class="flex h-[684px] overflow-hidden rounded-2xl bg-muted max-lg:h-auto max-lg:flex-col"
    >
      <img
        :src="active.image"
        :alt="`Portrait de ${active.name}`"
        class="h-[280px] w-full shrink-0 object-cover lg:h-auto lg:w-[380px]"
        width="380"
        height="684"
      >

      <div
        class="flex min-h-[400px] flex-1 flex-col gap-6 border border-[#e5dcd0] bg-white px-8 py-10 sm:px-12 sm:py-14 lg:min-h-0 lg:border-y lg:border-r lg:border-l-0"
      >
        <UBadge
          :label="active.badge"
          color="primary"
          variant="soft"
          class="w-fit rounded-full bg-primary/10 text-primary"
        />

        <blockquote class="text-xl font-bold leading-snug text-highlighted sm:text-[22px] lg:text-2xl">
          « {{ active.quote }} »
        </blockquote>

        <div class="mt-auto flex justify-end gap-2">
          <UButton
            icon="i-lucide-arrow-left"
            variant="outline"
            color="neutral"
            square
            class="rounded-full"
            aria-label="Témoignage précédent"
            @click="prev"
          />
          <UButton
            icon="i-lucide-arrow-right"
            variant="outline"
            color="neutral"
            square
            class="rounded-full"
            aria-label="Témoignage suivant"
            @click="next"
          />
        </div>
      </div>

      <div class="flex flex-col gap-3 bg-muted px-8 py-10 lg:w-[304px] lg:px-8 lg:py-14">
        <p class="font-semibold text-highlighted">
          {{ active.name }}
        </p>
        <p class="text-sm text-muted">
          {{ active.role }}
        </p>
      </div>
    </div>
  </UPageSection>
</template>
