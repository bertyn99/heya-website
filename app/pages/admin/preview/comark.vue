<script setup lang="ts">
import { comarkPreviewMarkdown } from '#shared/content/comark-preview'

definePageMeta({
  layout: 'admin',
  auth: 'user'
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-neutral-900">
        Aperçu Comark
      </h1>
      <p class="mt-1 text-sm text-neutral-500">
        Test du renderer CMS sans modifier la landing publique.
      </p>
    </div>

    <UCard>
      <HeyaMarkdown :markdown="comarkPreviewMarkdown" />
    </UCard>
  </div>
</template>
