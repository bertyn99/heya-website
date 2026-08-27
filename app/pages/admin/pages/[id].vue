<script setup lang="ts">
import { apiErrorMessage } from '~/utils/api-error'
import { mapAdminPage, type AdminPageApi } from '~/utils/admin-mappers'
import type { AdminPageRecord } from '#shared/types/admin'

definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const route = useRoute()
const { loggedIn } = useUserSession()

const pageId = computed(() => route.params.id as string)

const { data: page, status, error, refresh } = useFetch(
  () => `/api/admin/pages/${pageId.value}`,
  {
    server: false,
    transform: (row: AdminPageApi) => mapAdminPage(row)
  }
)

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })

function onSaved(record: AdminPageRecord) {
  page.value = record
}
</script>

<template>
  <AdminContentEditorDetailLayout
    resource-label="Pages"
    resource-to="/admin/pages"
    :title="page?.title"
    :subtitle="page?.slug"
    :loading="status === 'pending' && !page"
  >
    <AdminContentPageForm
      v-if="page"
      :page-id="page.id"
      :initial="page"
      @saved="onSaved"
    />

    <UAlert
      v-else-if="error"
      color="error"
      title="Page introuvable"
      :description="apiErrorMessage(error, 'Cette page n\'existe pas.')"
      class="mx-auto max-w-lg"
    />
  </AdminContentEditorDetailLayout>
</template>
