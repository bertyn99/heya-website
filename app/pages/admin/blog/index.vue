<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  auth: 'user'
})
</script>

<template>
  <AdminContentListPanel
    title="Blog"
    panel-id="blog"
    content-type="post"
    create-label="Nouvel article"
    :show-slug-column="false"
  />
</template>
