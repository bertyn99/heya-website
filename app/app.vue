<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
})

useSeoMeta({
  title: 'Créer du lien en habitat partagé',
  description: 'Heya connecte les résidents en habitat partagé : totem convivial, lampes relay, dashboard pour les équipes.',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630
})
</script>

<template>
  <UApp>
    <a
      href="#contenu-principal"
      class="skip-link"
    >
      Aller au contenu
    </a>
    <div
      class="site-grain"
      aria-hidden="true"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
