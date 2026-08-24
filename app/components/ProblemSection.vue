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
    icon: 'i-lucide-lamp-wall-down',
    iconClass: 'bg-inverted/25 text-dimmed'
  },
  {
    title: 'Gestion administrative lourde',
    description: 'L\'équipe court après l\'info au lieu de l\'animer',
    icon: 'i-lucide-file-check',
    iconClass: 'bg-inverted/25 text-dimmed'
  }
]

const solutions: ProblemItem[] = [
  {
    title: 'Communauté active',
    description: 'Les résidents proposent et rejoignent des activités',
    icon: 'i-lucide-users-round',
    iconClass: 'bg-step-blue text-step-blue-fg'
  },
  {
    title: 'Communication centralisée',
    description: 'Une info, un totem : tout le monde est au courant',
    icon: 'i-lucide-scroll',
    iconClass: 'bg-step-gold text-step-gold-fg'
  },
  {
    title: 'Équipe libérée',
    description: 'Moins de logistique, plus de présence sur le terrain',
    icon: 'i-lucide-lamp',
    iconClass: 'bg-step-green text-step-green-fg'
  }
]
</script>

<template>
  <section
    id="constat"
    class="relative overflow-hidden bg-inverted py-24 sm:py-28"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-24 size-[480px] -translate-x-1/2 rounded-full bg-activity-teal/10 blur-[120px]"
      aria-hidden="true"
    />

    <UContainer class="relative">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <UBadge
          label="LE CONSTAT"
          color="primary"
          variant="soft"
          size="sm"
          class="mb-5 bg-primary/10 text-[10px] uppercase tracking-widest text-primary"
        />

        <h2 class="text-[40px] font-semibold leading-tight text-[#f1ede6]">
          Le quotidien des résidences,
          <span class="block font-bold text-primary">
            sans lien entre les habitants
          </span>
        </h2>

        <p class="mx-auto mt-5 max-w-xl text-lg leading-7 text-[#a39e96]">
          Des résidents isolés, des équipes qui diffusent l'info à la main, des espaces communs sous-utilisés. Et si on remettait le lien au centre ?
        </p>
      </div>

      <div class="grid items-center gap-7 lg:grid-cols-[1fr_auto_1fr]">
        <div class="space-y-3.5">
          <div
            v-for="item in problems"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border border-heya-dark-border bg-heya-dark-muted/80 p-5 backdrop-blur-sm"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl p-2.5"
              :class="item.iconClass"
            >
              <UIcon
                :name="item.icon"
                class="size-[22px]"
              />
            </div>
            <div class="min-w-0">
              <p class="text-[15px] font-semibold text-[#f1ede6]">
                {{ item.title }}
              </p>
              <p class="mt-1 text-[13px] leading-snug text-[#a39e96]">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="hidden lg:block">
          <ProblemRelayVisual />
        </div>

        <div class="space-y-3.5">
          <div
            v-for="item in solutions"
            :key="item.title"
            class="flex items-center gap-4 rounded-2xl border-[1.5px] border-activity-teal/35 bg-default p-5 shadow-[0_6px_20px_rgba(0,191,135,0.12)]"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-xl p-2.5"
              :class="item.iconClass"
            >
              <UIcon
                :name="item.icon"
                class="size-[22px]"
              />
            </div>
            <div class="min-w-0">
              <p class="text-[15px] font-semibold text-highlighted">
                {{ item.title }}
              </p>
              <p class="mt-1 text-[13px] leading-snug text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 lg:hidden">
        <ProblemRelayVisual />
      </div>
    </UContainer>
  </section>
</template>
