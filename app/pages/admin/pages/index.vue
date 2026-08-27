<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  auth: 'user'
})
</script>

<template>
  <AdminContentListPanel
    title="Pages"
    panel-id="pages"
    content-type="page"
    create-label="Nouvelle page"
  />
</template>
