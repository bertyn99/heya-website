<script setup lang="ts">
interface ProblemItem {
  title: string
  description: string
  icon: string
  iconClass: string
}

const problems: ProblemItem[] = [
  {
    title: 'Isolation des résidents',
    description: 'Chacun dans son appart, peu d\'occasions de se croiser',
    icon: 'i-lucide-users',
    iconClass: 'bg-inverted/25 text-dimmed'
  },
  {
    title: 'Communication manuelle',
    description: 'Affichages, mails, allers-retours sans fin',
    icon: 'i-lucide-megaphone',
    iconClass: 'bg-inverted/25 text-dimmed'
  },
  {
    title: 'Gestion administrative lourde',
    description: 'L\'équipe court après l\'info au lieu de l\'animer',
    icon: 'i-lucide-clipboard-list',
    iconClass: 'bg-inverted/25 text-dimmed'
  }
]

const solutions: ProblemItem[] = [
  {
    title: 'Communauté active',
    description: 'Les résidents proposent et rejoignent des activités',
    icon: 'i-lucide-users-round',
    iconClass: 'bg-step-blue/40 text-step-blue-fg'
  },
  {
    title: 'Communication centralisée',
    description: 'Une info, un totem : tout le monde est au courant',
    icon: 'i-lucide-radio',
    iconClass: 'bg-step-gold/40 text-step-gold-fg'
  },
  {
    title: 'Équipe libérée',
    description: 'Moins de logistique, plus de présence sur le terrain',
    icon: 'i-lucide-lamp',
    iconClass: 'bg-step-green/40 text-step-green-fg'
  }
]
</script>

<template>
  <section
    id="constat"
    class="relative overflow-hidden bg-inverted py-24 sm:py-28"
  >
    <!-- Ambient glow — subtle teal only -->
    <div
      class="pointer-events-none absolute -left-24 -top-20 size-[480px] rounded-full bg-activity-teal/[0.08] blur-[120px]"
      aria-hidden="true"
    />

    <UContainer class="relative">
      <!-- Editorial header -->
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <UBadge
          label="Le constat"
          color="warning"
          variant="soft"
          size="sm"
          class="mb-5 uppercase tracking-widest"
        />

        <h2 class="text-3xl font-semibold leading-tight text-[#f1ede6] sm:text-4xl">
          Le quotidien des résidences,
          <span class="block font-bold text-activity-teal">
            sans lien entre les habitants
          </span>
        </h2>

        <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#a39e96]">
          Des résidents isolés, des équipes qui diffusent l'info à la main, des espaces communs sous-utilisés. Et si on remettait le lien au centre ?
        </p>
      </div>

      <!-- Bridge layout -->
      <div class="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-7">
        <!-- Problems -->
        <div class="space-y-3.5">
          <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-[#a39e96]">
            Sans Heya
          </p>

          <div
            v-for="item in problems"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border border-heya-dark-border bg-heya-dark-muted/80 p-5 backdrop-blur-sm"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl"
              :class="item.iconClass"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
              />
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-[#f1ede6]">
                {{ item.title }}
              </p>
              <p class="mt-0.5 text-sm leading-snug text-[#a39e96]">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Relay network visual -->
        <div class="hidden lg:block">
          <ProblemRelayVisual />
        </div>

        <!-- Solutions -->
        <div class="space-y-3.5">
          <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-activity-teal">
            Avec Heya
          </p>

          <div
            v-for="item in solutions"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border-[1.5px] border-activity-teal/35 bg-default p-5"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl"
              :class="item.iconClass"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
              />
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-heya-dark">
                {{ item.title }}
              </p>
              <p class="mt-0.5 text-sm leading-snug text-heya-dark-border">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: show network between columns -->
      <div class="mt-10 lg:hidden">
        <ProblemRelayVisual />
      </div>
    </UContainer>
  </section>
</template>
