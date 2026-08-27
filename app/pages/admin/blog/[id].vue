<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const route = useRoute()
const store = useAdminMockStore()

const postId = computed(() => route.params.id as string)
const post = computed(() => store.findPost(postId.value))
</script>

<template>
  <AdminContentEditorDetailLayout
    resource-label="Blog"
    resource-to="/admin/blog"
    :title="post?.title"
    :subtitle="post?.slug"
    :loading="false"
  >
    <AdminContentPostForm
      v-if="post"
      :post-id="post.id"
      :initial="post"
    />

    <UAlert
      v-else
      color="error"
      title="Article introuvable"
      description="Cet article n'existe pas dans les fixtures locales."
      class="mx-auto max-w-lg"
    />
  </AdminContentEditorDetailLayout>
</template>
