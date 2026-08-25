<script setup lang="ts">
import { heyaHeroCentered } from '~/utils/heya-ui'

useSeoMeta({
  title: 'Politique de confidentialité',
  description: 'Comment Heya traite les données du formulaire de contact et des demandes de démo.'
})
</script>

<template>
  <UPage>
    <UPageHero
      headline="Légal"
      title="Politique de confidentialité"
      :ui="heyaHeroCentered"
    />

    <UPageSection :ui="{ root: 'pt-0 pb-20' }">
      <div class="prose prose-neutral max-w-[65ch] text-toned">
        <p>
          Heya collecte uniquement les informations nécessaires pour répondre à une demande
          de démo, de devis ou de rendez-vous.
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Données collectées
        </h2>
        <p>
          Formulaire de contact : prénom, nom, email, téléphone (optionnel), type de résidence,
          durée de test envisagée, message.
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Finalité
        </h2>
        <p>
          Traiter votre demande et vous recontacter sous 24h. Aucune revente,
          aucun envoi publicitaire non sollicité.
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Conservation et droits
        </h2>
        <p>
          Les données sont conservées le temps du suivi commercial, puis supprimées.
          Pour accéder, rectifier ou supprimer vos données :
          <a href="mailto:elise@heyaconvivialite.fr">elise@heyaconvivialite.fr</a>.
        </p>

        <h2 class="mt-10 text-xl font-semibold text-highlighted">
          Cookies
        </h2>
        <p>
          Ce site n’utilise pas de cookies publicitaires. Seuls des cookies techniques
          éventuellement nécessaires au fonctionnement peuvent être déposés.
        </p>
      </div>
    </UPageSection>
  </UPage>
</template>
