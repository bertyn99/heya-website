<script setup lang="ts">
import type { SolutionPageData } from '~/data/solutions'
import { CAL_COM_URL } from '~/utils/navigation'

const props = defineProps<{
  data: SolutionPageData
}>()

const activeHelpStep = ref(0)

function selectHelpStep(index: number) {
  activeHelpStep.value = index
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-[#f7f3fb] py-16 sm:py-20">
      <UContainer>
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="space-y-5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {{ data.badge }}
            </p>
            <h1 class="text-3xl font-bold leading-tight text-heya-dark sm:text-5xl">
              {{ data.title }}
            </h1>
            <p class="text-base leading-relaxed text-[#78716c]">
              {{ data.subtitle }}
            </p>

            <div class="flex flex-col gap-3 sm:flex-row">
              <UButton
                :to="CAL_COM_URL"
                target="_blank"
                class="rounded-md bg-secondary font-semibold text-white hover:bg-secondary/90"
              >
                Demander une démo
              </UButton>
              <UButton
                to="/#offres"
                variant="outline"
                class="rounded-md border-secondary/55 text-secondary/85"
              >
                Voir les offres
              </UButton>
            </div>

            <ul class="space-y-2.5 pt-2">
              <li
                v-for="chip in data.proofChips"
                :key="chip"
                class="flex items-center gap-2 text-sm text-[#6b7380]"
              >
                <span class="size-1.5 shrink-0 rounded-full bg-primary" />
                {{ chip }}
              </li>
            </ul>
          </div>

          <div class="overflow-hidden rounded-3xl border-[3px] border-secondary shadow-lg">
            <img
              :src="data.heroImage"
              :alt="data.title"
              class="aspect-[4/3] w-full object-cover"
              width="480"
              height="360"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Pour qui & Défis -->
    <section class="bg-heya-cream py-20 sm:py-24">
      <UContainer>
        <div class="mx-auto mb-16 max-w-3xl border-b border-[#e2e8f0] pb-8 text-center">
          <p class="text-sm font-semibold uppercase text-heya-accent">
            Pour qui &amp; Défis
          </p>
          <h2 class="mt-3 text-3xl font-bold text-heya-dark sm:text-4xl">
            {{ data.audienceTitle }}
          </h2>
          <p class="mt-4 text-lg text-heya-dark-border">
            {{ data.audienceSubtitle }}
          </p>
        </div>

        <div class="space-y-16">
          <!-- Personas -->
          <div class="space-y-6">
            <div>
              <p class="text-sm font-semibold text-heya-accent">
                Pour qui
              </p>
              <h3 class="mt-2 text-2xl font-bold text-heya-dark sm:text-3xl">
                Trois profils, trois besoins clairs
              </h3>
              <p class="mt-2 text-heya-dark-border">
                Découvrez rapidement qui utilise Heya et ce qu'ils attendent au quotidien.
              </p>
            </div>
            <div class="grid gap-4 lg:grid-cols-3">
              <article
                v-for="persona in data.personas"
                :key="persona.title"
                class="flex gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4"
              >
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  :class="persona.iconBgClass"
                >
                  <UIcon
                    :name="persona.icon"
                    class="size-5 text-heya-dark"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-heya-dark">
                    {{ persona.title }}
                  </h4>
                  <p class="mt-1 text-sm text-[#7d756c]">
                    {{ persona.description }}
                  </p>
                </div>
              </article>
            </div>
          </div>

          <!-- Challenges -->
          <div class="space-y-6">
            <div>
              <p class="text-sm font-semibold text-heya-accent">
                Les défis
              </p>
              <h3 class="mt-2 text-2xl font-bold text-heya-dark sm:text-3xl">
                {{ data.challengesTitle }}
              </h3>
              <p class="mt-2 text-heya-dark-border">
                {{ data.challengesSubtitle }}
              </p>
            </div>
            <div class="space-y-6">
              <article
                v-for="challenge in data.challenges"
                :key="challenge.num"
                class="flex gap-6 rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm"
              >
                <div
                  class="flex size-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                  :class="challenge.markerClass"
                >
                  {{ challenge.num }}
                </div>
                <div>
                  <h4 class="text-xl font-bold text-heya-dark">
                    {{ challenge.title }}
                  </h4>
                  <p class="mt-3 text-base text-[#7d756c]">
                    {{ challenge.description }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Comment Heya aide -->
    <section class="bg-[#f0f4ff] py-20 sm:py-24">
      <UContainer>
        <div class="grid items-start gap-12 lg:grid-cols-2">
          <div class="space-y-8">
            <div class="space-y-4">
              <UBadge
                label="Comment Heya aide"
                variant="outline"
                class="text-xs uppercase"
              />
              <h2 class="text-3xl font-bold text-heya-dark sm:text-5xl">
                {{ data.helpTitle }}
              </h2>
              <p class="text-base text-heya-dark-border">
                {{ data.helpSubtitle }}
              </p>
            </div>

            <div class="space-y-0">
              <button
                v-for="(step, index) in data.helpSteps"
                :key="step.num"
                type="button"
                class="flex w-full gap-6 border-b border-[#e2e8f0] py-6 text-left transition-colors"
                :class="activeHelpStep === index ? 'text-heya-dark' : 'text-[#62748e]'"
                @click="selectHelpStep(index)"
              >
                <div
                  class="w-1 shrink-0 rounded-sm"
                  :class="activeHelpStep === index ? 'bg-heya-purple-cta' : 'bg-[#f1f5f9]'"
                />
                <div class="space-y-1">
                  <p class="text-base font-semibold">
                    {{ step.num }}
                  </p>
                  <p class="text-base font-semibold">
                    {{ step.title }}
                  </p>
                  <p
                    v-if="activeHelpStep === index"
                    class="text-sm leading-relaxed"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div class="overflow-hidden rounded-2xl">
            <img
              :src="data.helpImage"
              :alt="data.helpTitle"
              class="w-full object-cover"
              width="491"
              height="726"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Bénéfices -->
    <section class="bg-white py-20 sm:py-24">
      <UContainer>
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <p class="text-[11px] font-semibold uppercase tracking-widest text-[#c66b3d]">
            Bénéfices
          </p>
          <h2 class="mt-3 text-3xl font-bold text-heya-dark">
            {{ data.benefitsTitle }}
          </h2>
          <p class="mt-3 text-[#6b6258]">
            {{ data.benefitsSubtitle }}
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Équipe -->
          <article class="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
            <div class="mb-6">
              <h3 class="text-2xl font-semibold text-heya-dark">
                Pour l'équipe
              </h3>
              <p class="mt-2 text-heya-dark-border">
                Conciergerie, animation et terrain au quotidien.
              </p>
            </div>
            <ul class="flex-1 space-y-4">
              <li
                v-for="feature in data.teamBenefits"
                :key="feature.title"
                class="flex gap-3"
              >
                <UIcon
                  :name="feature.icon"
                  class="mt-0.5 size-5 shrink-0 text-heya-accent"
                />
                <div>
                  <p class="font-semibold text-heya-dark">
                    {{ feature.title }}
                  </p>
                  <p
                    v-if="feature.description"
                    class="text-sm text-heya-dark-border"
                  >
                    {{ feature.description }}
                  </p>
                </div>
              </li>
            </ul>
            <UButton
              :to="CAL_COM_URL"
              target="_blank"
              class="mt-8 w-fit rounded-md bg-heya-accent text-white hover:bg-heya-accent/90"
            >
              Commencer
            </UButton>
          </article>

          <!-- Direction -->
          <article class="flex flex-col rounded-2xl border border-[#e2e8f0] bg-[#fff7ed] p-8 shadow-sm">
            <div class="mb-6">
              <h3 class="text-2xl font-semibold text-heya-dark">
                Pour la direction
              </h3>
              <p class="mt-2 text-heya-dark-border">
                Pilotage, fréquentation et valorisation de l'action sociale.
              </p>
            </div>
            <div class="grid flex-1 gap-4 sm:grid-cols-2">
              <div
                v-for="metric in data.directionMetrics"
                :key="metric.title"
                class="rounded-lg border border-[#e2e8f0] bg-white p-4"
              >
                <div class="mb-2 flex items-center gap-2">
                  <UIcon
                    :name="metric.icon"
                    class="size-5 text-heya-accent"
                  />
                  <p class="text-sm font-semibold text-heya-dark">
                    {{ metric.title }}
                  </p>
                </div>
                <p class="text-xs text-heya-dark-border">
                  {{ metric.description }}
                </p>
              </div>
            </div>
            <UButton
              :to="CAL_COM_URL"
              target="_blank"
              class="mt-8 w-fit rounded-md bg-heya-accent text-white hover:bg-heya-accent/90"
            >
              Commencer
            </UButton>
          </article>
        </div>

        <p class="mx-auto mt-10 max-w-3xl text-center text-sm text-[#6b6258]">
          {{ data.benefitsFootnote }}
        </p>
      </UContainer>
    </section>

    <!-- Témoignages -->
    <section class="bg-heya-cream py-20 sm:py-24">
      <UContainer>
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="font-semibold text-heya-accent">
            Témoignages
          </p>
          <h2 class="mt-3 text-3xl font-bold text-heya-dark sm:text-5xl">
            Ce qu'en disent les équipes et les résidents
          </h2>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <blockquote
            v-for="item in data.testimonials"
            :key="item.name"
            class="flex flex-col rounded-2xl border border-[#e5e0d9] bg-white p-8"
          >
            <div class="mb-5 flex items-center gap-4">
              <img
                v-if="item.avatar"
                :src="item.avatar"
                :alt="item.name"
                class="size-14 rounded-full object-cover"
                width="56"
                height="56"
              >
              <div
                v-else
                class="flex size-14 items-center justify-center rounded-full bg-heya-violet/20"
              >
                <UIcon
                  name="i-lucide-user"
                  class="size-6 text-heya-violet"
                />
              </div>
              <div>
                <p class="font-semibold text-heya-dark">
                  {{ item.name }}
                </p>
                <p class="text-sm text-heya-dark-border">
                  {{ item.role }}
                </p>
              </div>
            </div>
            <p class="flex-1 text-base leading-relaxed text-heya-dark">
              « {{ item.quote }} »
            </p>
          </blockquote>
        </div>
      </UContainer>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-20 sm:py-24">
      <UContainer class="max-w-4xl">
        <h2 class="mb-8 text-3xl font-bold text-heya-dark">
          {{ data.faqTitle }}
        </h2>
        <UAccordion
          :items="data.faq.map(item => ({
            label: item.question,
            content: item.answer
          }))"
        />
      </UContainer>
    </section>

    <!-- Final CTA -->
    <section class="bg-[#231f1e] py-20 text-center">
      <UContainer class="max-w-2xl space-y-5">
        <h2 class="text-3xl font-semibold text-white sm:text-4xl">
          {{ data.ctaTitle }}
        </h2>
        <p class="text-base text-[#bfbab5]">
          {{ data.ctaSubtitle }}
        </p>
        <UButton
          :to="CAL_COM_URL"
          target="_blank"
          size="lg"
          class="rounded-md bg-heya-accent font-semibold text-white hover:bg-heya-accent/90"
        >
          Prendre rendez-vous
        </UButton>
      </UContainer>
    </section>

    <!-- Cross-links -->
    <section class="bg-[#deede2] py-16 text-center">
      <UContainer>
        <h2 class="text-2xl font-semibold text-heya-dark sm:text-3xl">
          Heya s'adapte aussi à d'autres habitats partagés
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-[#78716c]">
          Même principe, des enjeux différents selon le public.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <NuxtLink
            v-for="link in data.relatedSolutions"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-2xl border border-[#e6e1da] bg-white px-7 py-6 text-sm font-medium text-heya-dark shadow-sm transition-shadow hover:shadow-md"
          >
            <span
              class="size-3 rounded-full"
              :class="link.dotClass"
            />
            {{ link.label }}
            <span class="text-lg text-heya-violet">→</span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>
