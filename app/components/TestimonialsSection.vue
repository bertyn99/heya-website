<script setup lang="ts">
const testimonials = [
  {
    quote: 'Depuis l\'installation de Heya, les voisins se retrouvent vraiment. On se propose des activités, on s\'entraide. C\'est exactement ce qu\'il nous fallait.',
    name: 'Claire Renaud',
    role: 'Résidente, habitat partagé à Nantes',
    badge: 'Résidente',
    initials: 'CR'
  },
  {
    quote: 'On ne court plus après l\'info. Les résidents se retrouvent d\'eux-mêmes, et on voit enfin ce qui mobilise.',
    name: 'Nadia Benali',
    role: 'Directrice de résidence',
    badge: 'Direction',
    initials: 'NB'
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
      headline: 'text-[11px] font-semibold uppercase tracking-widest text-primary'
    }"
    headline="Témoignages"
    title="Ce qu'en disent les équipes et les résidents"
    description="Des retours de structures équipées. Les citations ci-dessous sont des exemples en attendant les témoignages clients."
  >
    <div class="flex overflow-hidden rounded-[1.25rem] bg-muted max-lg:flex-col">
      <div class="flex h-70 w-full shrink-0 items-center justify-center bg-heya-step-gold lg:h-auto lg:w-70">
        <span
          class="flex size-28 items-center justify-center rounded-[1.5rem] bg-white text-3xl font-semibold tabular text-primary"
          aria-hidden="true"
        >
          {{ active.initials }}
        </span>
      </div>

      <div class="flex min-h-90 flex-1 flex-col gap-6 border border-heya-neutral-200 bg-white px-8 py-10 sm:px-12 sm:py-14 lg:min-h-105 lg:border-y lg:border-r lg:border-l-0">
        <UBadge
          :label="active.badge"
          color="primary"
          variant="soft"
          class="w-fit rounded-md bg-primary/10 text-primary"
        />

        <blockquote class="text-xl font-semibold leading-snug tracking-tight text-highlighted sm:text-[22px] lg:text-2xl">
          « {{ active.quote }} »
        </blockquote>

        <div class="mt-auto flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold text-highlighted">
              {{ active.name }}
            </p>
            <p class="text-sm text-muted">
              {{ active.role }}
            </p>
          </div>
          <div class="flex gap-2">
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
      </div>
    </div>
  </UPageSection>
</template>
