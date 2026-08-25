<script setup lang="ts">
import { heyaHeroCentered } from '~/utils/heya-ui'

useSeoMeta({
  title: 'Mentions légales',
  description: 'Éditeur, hébergeur et contacts légaux du site heyaconvivialite.fr.'
})
</script>

<template>
  <UPage>
    <UPageHero
      headline="Légal"
      title="Mentions légales"
      :ui="heyaHeroCentered"
    />

    <UPageSection :ui="{ root: 'pt-0 pb-20' }">
      <div class="prose prose-neutral max-w-[65ch] text-toned">
        <h2 class="text-xl font-semibold text-highlighted">
          Éditeur
        </h2>
        <p>
          Le site <strong>heyaconvivialite.fr</strong> est édité par Heya — Fabrique des Collectifs,
          projet porté par Elise Furnon, basée à Nantes, Pays de la Loire.
        </p>
        <p>
          Contact : <a href="mailto:elise@heyaconvivialite.fr">elise@heyaconvivialite.fr</a>
          · 06 76 72 14 67
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Hébergement
        </h2>
        <p>
          Le site est destiné à être hébergé en France (Vercel ou Netlify).
          Les coordonnées précises de l’hébergeur seront indiquées à la mise en production.
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Propriété intellectuelle
        </h2>
        <p>
          Textes, visuels, marque et éléments graphiques de Heya sont protégés.
          Toute reproduction non autorisée est interdite.
        </p>
      </div>
    </UPageSection>
  </UPage>
</template>
