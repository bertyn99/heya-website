<script setup lang="ts">
import { footerProjectLinks, solutionLinks } from '~/utils/navigation'

const email = ref('')
</script>

<template>
  <UFooter
    :ui="{
      root: 'bg-heya-dark-footer text-[#aaa293]',
      top: 'border-0',
      bottom: 'border-t border-[#333] py-4'
    }"
  >
    <template #top>
      <div class="flex h-1 w-full">
        <div class="h-full flex-1 bg-[#5b8fb9]" />
        <div class="h-full flex-1 bg-[#e8c547]" />
        <div class="h-full flex-1 bg-primary" />
        <div class="h-full flex-1 bg-[#784a7f]" />
      </div>

      <UContainer class="px-20 py-12">
        <div class="grid gap-12 lg:grid-cols-[260px_140px_140px_minmax(0,320px)] lg:justify-between">
          <div class="space-y-4">
            <NuxtLink
              to="/"
              aria-label="Heya — Accueil"
            >
              <img
                src="/images/brand/heya-logo-lockup.png"
                alt="Heya"
                class="h-[50px] w-[68px] object-contain"
                width="68"
                height="50"
              >
            </NuxtLink>
            <p class="text-[10px] font-light italic text-[#aaa293]">
              La convivialité au quotidien
            </p>
            <a
              href="https://linkedin.com/company/heyaconvivialite"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex size-5 items-center justify-center rounded-md bg-[#0077b5] text-white"
              aria-label="LinkedIn Heya"
            >
              <UIcon
                name="i-lucide-linkedin"
                class="size-3"
              />
            </a>
          </div>

          <nav aria-label="Le projet">
            <p class="mb-3 text-sm font-semibold text-white">
              Le projet
            </p>
            <ul class="space-y-2 text-xs">
              <li
                v-for="link in footerProjectLinks"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="text-[#aaa293] transition-colors hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Solutions">
            <p class="mb-3 text-sm font-semibold text-white">
              Solutions
            </p>
            <ul class="space-y-2 text-xs">
              <li
                v-for="link in solutionLinks"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="text-[#aaa293] transition-colors hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="space-y-3.5 lg:max-w-[320px]">
            <p class="text-sm font-semibold text-white">
              Restez informé
            </p>
            <p class="text-xs text-[#aaa293]">
              1 email par mois, jamais de spam
            </p>
            <form
              class="flex gap-3"
              @submit.prevent
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Votre email"
                class="flex-1"
                :ui="{
                  base: 'h-11 rounded-lg border-[#aaa293]/30 bg-heya-dark-muted text-white placeholder:text-[#aaa293]'
                }"
              />
              <UButton
                type="submit"
                class="h-11 shrink-0 rounded-lg px-5"
              >
                S'abonner
              </UButton>
            </form>
          </div>
        </div>
      </UContainer>
    </template>

    <template #bottom>
      <UContainer class="px-20">
        <div class="flex flex-col gap-4 text-[10px] font-light sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ new Date().getFullYear() }} Heya — Fabrique des Collectifs</p>
          <a
            href="https://bertynboulikou.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary transition-opacity hover:opacity-80"
          >
            Réalisé par Bertyn Boulikou
          </a>
          <div class="flex flex-wrap gap-4">
            <span>Mentions légales</span>
            <span>Politique de confidentialité</span>
            <span>CGU</span>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>
