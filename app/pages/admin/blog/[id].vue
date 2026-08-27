<script setup lang="ts">
import { apiErrorMessage } from '~/utils/api-error'
import { mapAdminPost, type AdminPostApi } from '~/utils/admin-mappers'
import type { AdminPostRecord } from '#shared/types/admin'

definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const route = useRoute()
const { loggedIn } = useUserSession()

const postId = computed(() => route.params.id as string)

const { data: post, status, error, refresh } = useFetch(
  () => `/api/admin/posts/${postId.value}`,
  {
    server: false,
    transform: (row: AdminPostApi) => mapAdminPost(row)
  }
)

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })

function onSaved(record: AdminPostRecord) {
  post.value = record
}
</script>

<template>
  <AdminContentEditorDetailLayout
    resource-label="Blog"
    resource-to="/admin/blog"
    :title="post?.title"
    :subtitle="post?.slug"
    :loading="status === 'pending' && !post"
  >
    <AdminContentPostForm
      v-if="post"
      :post-id="post.id"
      :initial="post"
      @saved="onSaved"
    />

    <UAlert
      v-else-if="error"
      color="error"
      title="Article introuvable"
      :description="apiErrorMessage(error, 'Cet article n\'existe pas.')"
      class="mx-auto max-w-lg"
    />
  </AdminContentEditorDetailLayout>
</template>
