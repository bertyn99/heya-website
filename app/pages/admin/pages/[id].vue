<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const route = useRoute()
const store = useAdminMockStore()

const pageId = computed(() => route.params.id as string)
const page = computed(() => store.findPage(pageId.value))
</script>

<template>
  <AdminContentEditorDetailLayout
    resource-label="Pages"
    resource-to="/admin/pages"
    :title="page?.title"
    :subtitle="page?.slug"
    :loading="false"
  >
    <AdminContentPageForm
      v-if="page"
      :page-id="page.id"
      :initial="page"
    />

    <UAlert
      v-else
      color="error"
      title="Page introuvable"
      description="Cette page n'existe pas dans les fixtures locales."
      class="mx-auto max-w-lg"
    />
  </AdminContentEditorDetailLayout>
</template>
