<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { ContactCtaBlock } from '#shared/types/blocks'
import { CAL_COM_URL } from '~/utils/navigation'

const props = withDefaults(defineProps<ContactCtaBlock>(), {
  bullets: () => [
    'Une démo personnalisée à votre rythme',
    'Un accompagnement pour la mise en place',
    'Des outils simples pour vos équipes'
  ],
  footnote: 'Une réponse sous 24h. Vos données sont protégées.'
})

const links: ButtonProps[] = [
  {
    label: 'Prendre rendez-vous',
    to: CAL_COM_URL,
    target: '_blank',
    icon: 'i-lucide-calendar'
  }
]
</script>

<template>
  <UPageCTA
    id="contact"
    variant="solid"
    orientation="horizontal"
    :title="props.title"
    :description="props.description"
    :links="links"
    class="rounded-none"
    :ui="{
      root: 'bg-heya-dark-footer py-20',
      container: 'items-center gap-12 lg:gap-16',
      title: 'text-3xl font-semibold text-white sm:text-4xl',
      description: 'text-[#e8e2d8]',
      links: 'mt-4'
    }"
  >
    <template #body>
      <ul class="space-y-4">
        <li
          v-for="item in props.bullets"
          :key="item"
          class="flex items-center gap-3 text-sm font-semibold text-inverted"
        >
          <span class="size-3 shrink-0 rounded-full bg-primary" />
          {{ item }}
        </li>
      </ul>
      <p
        v-if="props.footnote"
        class="mt-2 text-xs text-[#aaa293]"
      >
        {{ props.footnote }}
      </p>
    </template>
  </UPageCTA>
</template>
