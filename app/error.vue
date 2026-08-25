<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: isNotFound.value ? 'Page introuvable | Heya' : 'Une erreur est survenue | Heya',
  robots: 'noindex'
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <UApp>
    <div class="flex min-h-dvh flex-col bg-default">
      <AppHeader />
      <UMain class="flex-1">
        <UPageHero
          :headline="String(error.statusCode)"
          :title="isNotFound ? 'Cette page n’existe pas' : 'Quelque chose s’est mal passé'"
          :description="isNotFound
            ? 'Le lien est peut-être ancien, ou la page a été déplacée. Revenez à l’accueil pour retrouver le totem, les offres et le contact.'
            : 'Réessayez dans un instant, ou revenez à l’accueil.'"
          :ui="{
            root: 'bg-default py-24',
            container: 'items-center text-center',
            headline: 'text-primary font-semibold tabular tracking-tight text-sm',
            title: 'text-4xl sm:text-5xl font-bold text-highlighted',
            description: 'text-muted max-w-xl mx-auto',
            links: 'justify-center'
          }"
        >
          <template #links>
            <UButton
              size="lg"
              class="rounded-lg"
              @click="goHome"
            >
              Retour à l’accueil
            </UButton>
            <UButton
              to="/contact"
              color="neutral"
              variant="outline"
              size="lg"
              class="rounded-lg"
            >
              Nous écrire
            </UButton>
          </template>
        </UPageHero>
      </UMain>
      <AppFooter />
    </div>
  </UApp>
</template>
