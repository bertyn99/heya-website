<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { footerProjectLinks, solutionLinks } from '~/utils/navigation'

const email = ref('')

const columns = computed<FooterColumn[]>(() => [
  {
    label: 'Le projet',
    children: footerProjectLinks.map(link => ({
      label: link.label,
      to: link.to
    }))
  },
  {
    label: 'Solutions',
    children: solutionLinks.map(link => ({
      label: link.label,
      to: link.to
    }))
  }
])
</script>

<template>
  <UFooter>
    <template #top>
      <div class="flex h-1 w-full">
        <div class="h-full flex-1 bg-activity-blue" />
        <div class="h-full flex-1 bg-activity-yellow" />
        <div class="h-full flex-1 bg-activity-orange" />
        <div class="h-full flex-1 bg-activity-violet" />
      </div>

      <UContainer class="py-12">
        <UFooterColumns :columns="columns">
          <template #left>
            <div class="space-y-4">
              <NuxtLink
                to="/"
                aria-label="Heya — Accueil"
              >
                <img
                  src="/images/brand/heya-wordmark.png"
                  alt="Heya"
                  class="h-12 w-auto brightness-0 invert"
                  width="68"
                  height="50"
                >
              </NuxtLink>
              <p class="text-sm italic text-inverted/80">
                La convivialité au quotidien
              </p>
              <UButton
                to="https://linkedin.com/company/heyaconvivialite"
                target="_blank"
                icon="i-lucide-linkedin"
                color="neutral"
                variant="outline"
                square
                aria-label="LinkedIn Heya"
              />
            </div>
          </template>

          <template #right>
            <div class="space-y-3">
              <p class="text-sm font-semibold text-inverted">
                Restez informé
              </p>
              <p class="text-sm">
                1 email par mois, jamais de spam
              </p>
              <form
                class="flex gap-2"
                @submit.prevent
              >
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="Votre email"
                  class="flex-1"
                />
                <UButton type="submit">
                  S'abonner
                </UButton>
              </form>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-xs">
        © {{ new Date().getFullYear() }} Heya — Fabrique des Collectifs
      </p>
    </template>

    <p class="text-xs">
      Fait à Nantes
    </p>

    <template #right>
      <div class="flex flex-wrap gap-4 text-xs">
        <span>Mentions légales</span>
        <span>Politique de confidentialité</span>
        <span>CGU</span>
      </div>
    </template>
  </UFooter>
</template>
