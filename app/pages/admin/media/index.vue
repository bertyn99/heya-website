<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  auth: 'user'
})
</script>

<template>
  <AppDashboardPanel id="media">
    <template #header>
      <AppDashboardNavbar title="Médias" />
    </template>

    <template #body>
      <UAlert
        color="info"
        variant="subtle"
        title="À venir"
        description="Médiathèque R2 + picker pour le CMS."
      />
    </template>
  </AppDashboardPanel>
</template>
