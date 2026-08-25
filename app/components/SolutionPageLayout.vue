<script setup lang="ts">
import type { SolutionPageData } from '~/data/solutions'
import { CAL_COM_URL } from '~/utils/navigation'
import { heyaEyebrow, heyaSectionHeadline } from '~/utils/heya-ui'

const props = defineProps<{
  data: SolutionPageData
}>()

const activeHelpStep = ref(0)
const activeTestimonial = ref(0)

const challengeSurfaces = [
  { card: 'bg-step-blue', num: 'text-step-blue-fg bg-step-blue-fg/20' },
  { card: 'bg-step-gold', num: 'text-step-gold-fg bg-step-gold-fg/20' },
  { card: 'bg-step-green', num: 'text-step-green-fg bg-step-green-fg/20' }
] as const

const highlightSurfaces = [
  'bg-step-blue',
  'bg-step-gold',
  'bg-step-green',
  'bg-primary/10'
] as const

const highlightOffsets = ['', 'lg:mt-10', '', 'lg:mt-10'] as const

const currentTestimonial = computed(() => {
  return props.data.testimonials[activeTestimonial.value] ?? props.data.testimonials[0]!
})

function selectHelpStep(index: number) {
  activeHelpStep.value = index
}

function prevTestimonial() {
  const total = props.data.testimonials.length
  activeTestimonial.value = (activeTestimonial.value - 1 + total) % total
}

function nextTestimonial() {
  const total = props.data.testimonials.length
  activeTestimonial.value = (activeTestimonial.value + 1) % total
}
</script>

<template>
  <div>
    <!-- Hero: split + photo -->
    <section class="bg-default pt-14 pb-16 sm:pt-16 sm:pb-24">
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div class="space-y-5">
            <p :class="heyaEyebrow">
              {{ data.badge }}
            </p>
            <h1 class="max-w-[18ch] text-3xl font-bold leading-[1.1] tracking-tight text-highlighted sm:text-5xl">
              {{ data.title }}
            </h1>
            <p class="max-w-[42ch] text-base leading-relaxed text-muted sm:text-lg">
              {{ data.subtitle }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row">
              <UButton
                :to="CAL_COM_URL"
                target="_blank"
                size="lg"
              >
                Demander une démo
              </UButton>
              <UButton
                to="/#offres"
                color="neutral"
                variant="outline"
                size="lg"
              >
                Voir les offres
              </UButton>
            </div>

            <ul class="space-y-2.5 pt-2">
              <li
                v-for="chip in data.proofChips"
                :key="chip"
                class="flex items-center gap-2.5 text-sm text-muted"
              >
                <span class="size-1.5 shrink-0 rounded-full bg-primary" />
                {{ chip }}
              </li>
            </ul>
          </div>

          <div class="overflow-hidden rounded-[1.25rem] shadow-(--shadow-heya)">
            <img
              :src="data.heroImage"
              :alt="data.heroImageAlt"
              class="aspect-[4/3] w-full object-cover"
              width="720"
              height="540"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Pour qui: sticky editorial list -->
    <section class="bg-muted py-20 sm:py-24">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header class="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p :class="heyaSectionHeadline">
              Pour qui
            </p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
              {{ data.audienceTitle }}
            </h2>
            <p class="mt-4 max-w-[36ch] text-base leading-relaxed text-muted">
              {{ data.audienceSubtitle }}
            </p>
          </header>

          <ul class="divide-y divide-default border-y border-default lg:col-span-8">
            <li
              v-for="persona in data.personas"
              :key="persona.title"
              class="flex gap-5 py-7 first:pt-6 last:pb-6 sm:gap-6"
            >
              <span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:size-14">
                <UIcon
                  :name="persona.icon"
                  class="size-6"
                />
              </span>
              <div class="min-w-0 pt-0.5">
                <h3 class="text-lg font-semibold tracking-tight text-highlighted sm:text-xl">
                  {{ persona.title }}
                </h3>
                <p class="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted sm:text-base">
                  {{ persona.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </UContainer>
    </section>

    <!-- Défis: colored bands, not another divider list -->
    <section class="bg-default py-20 sm:pb-28 sm:pt-24">
      <UContainer>
        <header class="mb-12 max-w-2xl">
          <p :class="heyaSectionHeadline">
            Les défis
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ data.challengesTitle }}
          </h2>
          <p class="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
            {{ data.challengesSubtitle }}
          </p>
        </header>

        <ol class="flex flex-col gap-5">
          <li
            v-for="(challenge, index) in data.challenges"
            :key="challenge.num"
            class="grid items-start gap-5 rounded-[1.25rem] p-7 sm:grid-cols-[5.5rem_1fr] sm:gap-8 sm:p-9"
            :class="challengeSurfaces[index % challengeSurfaces.length]?.card"
          >
            <span
              class="inline-flex size-12 items-center justify-center rounded-full text-sm font-semibold tabular"
              :class="challengeSurfaces[index % challengeSurfaces.length]?.num"
              aria-hidden="true"
            >
              {{ challenge.num }}
            </span>
            <div class="min-w-0">
              <h3 class="text-xl font-semibold tracking-tight text-highlighted sm:text-2xl">
                {{ challenge.title }}
              </h3>
              <p class="mt-3 max-w-[58ch] text-base leading-relaxed text-muted">
                {{ challenge.description }}
              </p>
            </div>
          </li>
        </ol>
      </UContainer>
    </section>

    <!-- Comment Heya aide: interactive steps + illustration -->
    <section class="bg-white py-20 sm:py-24">
      <UContainer>
        <div class="grid items-start gap-12 lg:grid-cols-2">
          <div class="space-y-8">
            <div class="space-y-4">
              <p :class="heyaEyebrow">
                Comment Heya aide
              </p>
              <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
                {{ data.helpTitle }}
              </h2>
              <p class="max-w-[46ch] text-base leading-relaxed text-muted">
                {{ data.helpSubtitle }}
              </p>
            </div>

            <div>
              <button
                v-for="(step, index) in data.helpSteps"
                :key="step.num"
                type="button"
                class="flex w-full gap-5 border-b border-default py-6 text-left transition-colors duration-200"
                :class="activeHelpStep === index ? 'text-highlighted' : 'text-muted'"
                :aria-expanded="activeHelpStep === index"
                @click="selectHelpStep(index)"
              >
                <div
                  class="w-1 shrink-0 rounded-full"
                  :class="activeHelpStep === index ? 'bg-primary' : 'bg-heya-neutral-200'"
                />
                <div class="min-w-0 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest tabular text-primary">
                    {{ step.num }}
                  </p>
                  <p class="text-base font-semibold">
                    {{ step.title }}
                  </p>
                  <p
                    v-if="activeHelpStep === index"
                    class="pt-1 text-sm leading-relaxed text-muted"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </button>
            </div>

            <UButton
              :to="CAL_COM_URL"
              target="_blank"
              color="neutral"
              variant="outline"
            >
              Découvrir Heya en démo
            </UButton>
          </div>

          <div class="flex min-h-[22rem] items-center justify-center rounded-[1.25rem] bg-muted p-6 sm:min-h-[28rem] sm:p-10 lg:sticky lg:top-28">
            <img
              :src="data.helpImage"
              :alt="data.helpImageAlt"
              class="w-full object-contain"
              width="640"
              height="360"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Bénéfices: matrix table or staggered highlights -->
    <section class="bg-muted py-20 sm:pb-28 sm:pt-24">
      <UContainer>
        <header class="mb-12 max-w-2xl">
          <p :class="heyaSectionHeadline">
            Bénéfices
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ data.benefitsTitle }}
          </h2>
        </header>

        <div
          v-if="data.benefitsLayout === 'matrix' && data.benefitRows"
        >
          <div
            class="mb-3 hidden grid-cols-12 gap-8 lg:grid"
            aria-hidden="true"
          >
            <div class="col-span-4" />
            <p class="col-span-4 text-sm font-medium text-highlighted">
              L'équipe
            </p>
            <p class="col-span-4 text-sm font-medium text-highlighted">
              La direction
            </p>
          </div>

          <ol class="border-t border-heya-neutral-300">
            <li
              v-for="(row, index) in data.benefitRows"
              :key="row.title"
              class="grid gap-4 border-b border-heya-neutral-300 py-8 sm:py-10 lg:grid-cols-12 lg:items-start lg:gap-8"
            >
              <h3 class="flex items-baseline gap-4 text-lg font-semibold tracking-tight text-highlighted sm:text-xl lg:col-span-4">
                <span
                  class="shrink-0 text-sm font-semibold tabular text-primary/50"
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                {{ row.title }}
              </h3>

              <div class="lg:col-span-4">
                <p class="mb-1 text-sm font-medium text-highlighted lg:hidden">
                  L'équipe
                </p>
                <p class="max-w-[32ch] text-base leading-relaxed text-muted">
                  {{ row.team }}
                </p>
              </div>

              <div class="lg:col-span-4">
                <p class="mb-1 text-sm font-medium text-highlighted lg:hidden">
                  La direction
                </p>
                <p class="max-w-[32ch] text-base leading-relaxed text-muted">
                  {{ row.direction }}
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div
          v-else-if="data.benefitsLayout === 'highlights' && data.benefitHighlights"
          class="grid gap-5 md:grid-cols-2"
        >
          <article
            v-for="(item, index) in data.benefitHighlights"
            :key="item.title"
            class="rounded-[1.25rem] p-8"
            :class="[highlightSurfaces[index % highlightSurfaces.length], highlightOffsets[index % highlightOffsets.length]]"
          >
            <h3 class="text-2xl font-bold tracking-tight text-highlighted">
              {{ item.title }}
            </h3>
            <p class="mt-3 max-w-[36ch] text-sm leading-relaxed text-toned">
              {{ item.description }}
            </p>
          </article>
        </div>

        <p
          v-if="data.benefitsFootnote"
          class="mt-10 max-w-[48ch] text-sm leading-relaxed text-muted"
        >
          {{ data.benefitsFootnote }}
        </p>
      </UContainer>
    </section>

    <!-- Cas d'usage: editorial story + photo -->
    <section class="bg-default py-20 sm:pb-28 sm:pt-24">
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div class="relative overflow-hidden rounded-[1.25rem] lg:col-span-6">
            <img
              :src="data.useCase.image"
              :alt="data.useCase.imageAlt"
              class="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              width="720"
              height="576"
            >
            <span class="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-highlighted backdrop-blur-sm">
              <span
                class="size-2 rounded-full"
                :class="data.useCase.activityColorClass"
              />
              {{ data.useCase.activityLabel }}
            </span>
          </div>

          <div class="lg:col-span-6">
            <p :class="heyaSectionHeadline">
              Cas d'usage
            </p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
              {{ data.useCase.title }}
            </h2>
            <p class="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
              {{ data.useCase.story }}
            </p>
            <blockquote class="relative mt-8 max-w-[52ch] border-l-2 border-primary pl-5 text-base leading-relaxed text-highlighted">
              {{ data.useCase.outcome }}
            </blockquote>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Témoignages: one featured quote, not twin cards -->
    <section class="bg-muted py-20 sm:py-24">
      <UContainer>
        <header class="mb-10 max-w-2xl">
          <p :class="heyaSectionHeadline">
            Témoignages
          </p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            Ce qu'en disent les équipes et les résidents
          </h2>
        </header>

        <div class="flex overflow-hidden rounded-[1.25rem] bg-default max-lg:flex-col">
          <div class="flex h-56 w-full shrink-0 items-center justify-center bg-step-gold lg:h-auto lg:w-64">
            <img
              v-if="currentTestimonial.avatar"
              :src="currentTestimonial.avatar"
              :alt="currentTestimonial.name"
              class="size-28 rounded-[1.5rem] object-cover"
              width="112"
              height="112"
            >
            <span
              v-else
              class="flex size-28 items-center justify-center rounded-[1.5rem] bg-white text-3xl font-semibold tabular text-primary"
              aria-hidden="true"
            >
              {{ currentTestimonial.initials }}
            </span>
          </div>

          <div class="flex min-h-80 flex-1 flex-col gap-6 px-8 py-10 sm:px-12 sm:py-14 lg:min-h-96">
            <UBadge
              :label="currentTestimonial.badge"
              color="primary"
              variant="soft"
              class="w-fit rounded-md bg-primary/10 text-primary"
            />

            <blockquote class="text-xl font-semibold leading-snug tracking-tight text-highlighted sm:text-2xl">
              « {{ currentTestimonial.quote }} »
            </blockquote>

            <div class="mt-auto flex items-center justify-between gap-4">
              <div>
                <p class="font-semibold text-highlighted">
                  {{ currentTestimonial.name }}
                </p>
                <p class="text-sm text-muted">
                  {{ currentTestimonial.role }}
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
                  @click="prevTestimonial"
                />
                <UButton
                  icon="i-lucide-arrow-right"
                  variant="outline"
                  color="neutral"
                  square
                  class="rounded-full"
                  aria-label="Témoignage suivant"
                  @click="nextTestimonial"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- FAQ: two-column list, not accordion -->
    <section class="bg-white py-20 sm:py-24">
      <UContainer>
        <h2 class="mb-10 max-w-2xl text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
          {{ data.faqTitle }}
        </h2>
        <div class="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          <article
            v-for="item in data.faq"
            :key="item.question"
          >
            <h3 class="text-base font-semibold text-highlighted">
              {{ item.question }}
            </h3>
            <p class="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
              {{ item.answer }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- Cross-links before the dark closer -->
    <section class="bg-muted py-20 sm:py-24">
      <UContainer>
        <header class="mx-auto mb-10 max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            Heya s'adapte aussi à d'autres habitats partagés
          </h2>
          <p class="mx-auto mt-3 max-w-[40ch] text-muted">
            Même principe, des enjeux différents selon le public.
          </p>
        </header>

        <div class="grid gap-5 sm:grid-cols-3">
          <NuxtLink
            v-for="link in data.relatedSolutions"
            :key="link.to"
            :to="link.to"
            class="group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[1.25rem] p-6 shadow-(--shadow-heya) transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              :src="link.image"
              :alt="link.label"
              class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-linear-to-b from-black/0 via-[#2a2520]/25 to-[#2a2520]/80" />
            <div class="relative">
              <p class="text-lg font-semibold text-white">
                {{ link.label }}
              </p>
              <span class="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white">
                Découvrir
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Final CTA -->
    <section class="bg-heya-dark-footer py-20 text-center sm:py-24">
      <UContainer class="max-w-2xl space-y-5">
        <h2 class="text-3xl font-semibold text-white sm:text-4xl">
          {{ data.ctaTitle }}
        </h2>
        <p class="text-base leading-relaxed text-[#bfbab5]">
          {{ data.ctaSubtitle }}
        </p>
        <UButton
          :to="CAL_COM_URL"
          target="_blank"
          size="lg"
        >
          Prendre rendez-vous
        </UButton>
      </UContainer>
    </section>
  </div>
</template>
