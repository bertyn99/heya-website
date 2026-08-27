<script setup lang="ts">
import type { AdminPageRecord } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { pageInputSchema } from '#shared/schemas/content'
import { apiErrorMessage } from '~/utils/api-error'
import { mapAdminPage, type AdminPageApi, type AdminPostApi } from '~/utils/admin-mappers'
import {
  editorBlocksToMarkdown,
  markdownToEditorBlocks,
  type EditorBlock
} from '~/utils/page-builder'

const props = defineProps<{
  pageId: string
  initial: AdminPageRecord
}>()

const emit = defineEmits<{
  saved: [page: AdminPageRecord]
}>()

const toast = useToast()

const state = reactive({
  title: props.initial.title,
  slug: props.initial.slug,
  status: props.initial.status as ContentStatus,
  contentMd: props.initial.contentMd,
  scheduledAt: props.initial.scheduledAt,
  metaTitle: props.initial.seo?.metaTitle ?? '',
  metaDescription: props.initial.seo?.metaDescription ?? '',
  ogImage: props.initial.seo?.ogImage ?? null
})

const editorBlocks = ref<EditorBlock[]>(markdownToEditorBlocks(props.initial.contentMd))
const saving = ref(false)

function applyRecord(page: AdminPageRecord, options?: { keepBlocks?: boolean }) {
  state.title = page.title
  state.slug = page.slug
  state.status = page.status
  state.contentMd = page.contentMd
  state.scheduledAt = page.scheduledAt
  state.metaTitle = page.seo?.metaTitle ?? ''
  state.metaDescription = page.seo?.metaDescription ?? ''
  state.ogImage = page.seo?.ogImage ?? null
  if (!options?.keepBlocks) {
    editorBlocks.value = markdownToEditorBlocks(page.contentMd)
  }
}

watch(() => props.initial, (page) => {
  applyRecord(page)
})

watch(editorBlocks, (blocks) => {
  state.contentMd = editorBlocksToMarkdown(blocks)
}, { deep: true })

function seoPayload() {
  if (!state.metaTitle && !state.metaDescription && !state.ogImage && !props.initial.seo) {
    return undefined
  }

  return {
    metaTitle: state.metaTitle,
    metaDescription: state.metaDescription,
    ogImage: state.ogImage
  }
}

async function save(options?: { silent?: boolean }): Promise<boolean> {
  const payload = {
    title: state.title,
    slug: state.slug,
    status: state.status,
    contentMd: editorBlocksToMarkdown(editorBlocks.value),
    scheduledAt: state.scheduledAt ? new Date(state.scheduledAt) : null,
    seo: seoPayload()
  }

  const parsed = pageInputSchema.safeParse(payload)
  if (!parsed.success) {
    toast.add({
      title: 'Formulaire invalide',
      description: parsed.error.issues[0]?.message ?? 'Vérifiez les champs.',
      color: 'error'
    })
    return false
  }

  saving.value = true
  try {
    const updated = mapAdminPage(await $fetch<AdminPageApi>(`/api/admin/pages/${props.pageId}`, {
      method: 'PUT',
      body: parsed.data
    }))
    applyRecord(updated, { keepBlocks: true })
    if (!options?.silent) {
      emit('saved', updated)
      toast.add({ title: 'Enregistré', description: 'Page mise à jour.', color: 'success' })
    }
    return true
  } catch (error) {
    toast.add({
      title: 'Enregistrement impossible',
      description: apiErrorMessage(error),
      color: 'error'
    })
    return false
  } finally {
    saving.value = false
  }
}

function onStatusUpdate(status: ContentStatus, scheduledAt?: string | null) {
  state.status = status
  if (scheduledAt !== undefined) {
    state.scheduledAt = scheduledAt
  }
}

function onCommitted(row: AdminPageApi | AdminPostApi) {
  const mapped = mapAdminPage(row)
  applyRecord(mapped)
  emit('saved', mapped)
}
</script>

<template>
  <UForm
    id="heya-cms-page-form"
    :state="state"
    class="flex h-full min-h-0 flex-1 flex-col"
    @submit.prevent="() => { void save() }"
  >
    <AdminPageBuilder
      v-model:blocks="editorBlocks"
      v-model:title="state.title"
      v-model:slug="state.slug"
      v-model:meta-title="state.metaTitle"
      v-model:meta-description="state.metaDescription"
      v-model:og-image="state.ogImage"
      :has-seo-entry="Boolean(initial.seo)"
    />

    <AdminContentEditorFormActions>
      <AdminContentStatusBadge :status="state.status" />
      <UButton
        type="button"
        form="heya-cms-page-form"
        icon="i-lucide-save"
        label="Enregistrer"
        :loading="saving"
        @click="() => { void save() }"
      />
      <AdminContentPublishScheduleActions
        content-type="page"
        :content-id="pageId"
        :status="state.status"
        :on-save="save"
        @update:status="onStatusUpdate"
        @committed="onCommitted"
      />
    </AdminContentEditorFormActions>
  </UForm>
</template>
