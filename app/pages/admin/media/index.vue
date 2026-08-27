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
      <AdminMediaLibrary />
    </template>
  </AppDashboardPanel>
</template>
