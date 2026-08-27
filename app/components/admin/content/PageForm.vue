<script setup lang="ts">
import type { EditorNavSection } from '#shared/types/admin'
import type { AdminPageRecord } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { pageInputSchema } from '#shared/schemas/content'

const props = defineProps<{
  pageId: string
  initial: AdminPageRecord
}>()

const store = useAdminMockStore()
const toast = useToast()

const state = reactive({
  title: props.initial.title,
  slug: props.initial.slug,
  status: props.initial.status as ContentStatus,
  contentMd: props.initial.contentMd,
  metaTitle: props.initial.seo?.metaTitle ?? '',
  metaDescription: props.initial.seo?.metaDescription ?? '',
  ogImage: props.initial.seo?.ogImage ?? null
})

const sections: EditorNavSection[] = [
  { id: 'section-general', label: 'Général' },
  { id: 'section-seo', label: 'SEO' },
  { id: 'section-blocks', label: 'Blocs' }
]

const saving = ref(false)

async function save(): Promise<boolean> {
  const payload = {
    title: state.title,
    slug: state.slug,
    status: state.status,
    contentMd: state.contentMd,
    scheduledAt: props.initial.scheduledAt ? new Date(props.initial.scheduledAt) : null,
    seo: state.metaTitle || state.metaDescription || state.ogImage
      ? {
          metaTitle: state.metaTitle,
          metaDescription: state.metaDescription,
          ogImage: state.ogImage
        }
      : null
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
    store.updatePage(props.pageId, {
      title: parsed.data.title,
      slug: parsed.data.slug,
      status: parsed.data.status,
      contentMd: parsed.data.contentMd,
      scheduledAt: props.initial.scheduledAt,
      seo: parsed.data.seo ?? null
    })
    toast.add({ title: 'Enregistré', description: 'Page mise à jour (fixture locale).', color: 'success' })
    return true
  } finally {
    saving.value = false
  }
}

function onStatusUpdate(status: ContentStatus) {
  state.status = status
}
</script>

<template>
  <AdminContentEditorBodyLayout :sections="sections">
    <UForm
      :state="state"
      class="space-y-8"
      @submit.prevent="() => { void save() }"
    >
      <AdminContentEditorSection
        label="general"
        anchor="section-general"
        surface
      >
        <div class="space-y-4">
          <UFormField label="Titre" name="title" required>
            <UInput v-model="state.title" />
          </UFormField>

          <UFormField label="Slug" name="slug" required hint="Chemin public, ex. concept ou solutions/residences-seniors">
            <UInput v-model="state.slug" />
          </UFormField>

          <div class="flex items-center gap-2 text-sm text-muted">
            <span>Statut :</span>
            <AdminContentStatusBadge :status="state.status" />
          </div>
        </div>
      </AdminContentEditorSection>

      <AdminContentSeoPanel
        v-model:meta-title="state.metaTitle"
        v-model:meta-description="state.metaDescription"
        v-model:og-image="state.ogImage"
        :has-entry="Boolean(initial.seo)"
        anchor="section-seo"
      />

      <AdminContentPageBlocksPanel :content-md="state.contentMd" />

      <AdminContentEditorFormActions>
        <AdminContentStatusBadge :status="state.status" />
        <UButton
          type="submit"
          icon="i-lucide-save"
          label="Enregistrer"
          :loading="saving"
        />
        <AdminContentPublishScheduleActions
          content-type="page"
          :content-id="pageId"
          :status="state.status"
          :on-save="save"
          @update:status="onStatusUpdate"
        />
      </AdminContentEditorFormActions>
    </UForm>
  </AdminContentEditorBodyLayout>
</template>
