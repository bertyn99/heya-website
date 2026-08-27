<script setup lang="ts">
import type { EditorNavSection } from '#shared/types/admin'
import type { AdminPostRecord } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { postInputSchema } from '#shared/schemas/content'
import { mockPostCategories } from '#shared/fixtures/admin-content'

const props = defineProps<{
  postId: string
  initial: AdminPostRecord
}>()

const store = useAdminMockStore()
const toast = useToast()

const state = reactive({
  title: props.initial.title,
  slug: props.initial.slug,
  excerpt: props.initial.excerpt,
  contentMd: props.initial.contentMd,
  coverPathname: props.initial.coverPathname,
  category: props.initial.category,
  status: props.initial.status as ContentStatus,
  metaTitle: props.initial.seo?.metaTitle ?? '',
  metaDescription: props.initial.seo?.metaDescription ?? '',
  ogImage: props.initial.seo?.ogImage ?? null
})

const sections: EditorNavSection[] = [
  { id: 'section-general', label: 'Général' },
  { id: 'section-cover', label: 'Couverture' },
  { id: 'section-seo', label: 'SEO' },
  { id: 'section-content', label: 'Contenu' }
]

const saving = ref(false)

const categoryItems = mockPostCategories.map(category => ({ label: category, value: category }))

async function save(): Promise<boolean> {
  const payload = {
    title: state.title,
    slug: state.slug,
    excerpt: state.excerpt,
    contentMd: state.contentMd,
    coverPathname: state.coverPathname,
    category: state.category,
    status: state.status,
    scheduledAt: props.initial.scheduledAt ? new Date(props.initial.scheduledAt) : null,
    seo: state.metaTitle || state.metaDescription || state.ogImage
      ? {
          metaTitle: state.metaTitle,
          metaDescription: state.metaDescription,
          ogImage: state.ogImage
        }
      : null
  }

  const parsed = postInputSchema.safeParse(payload)
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
    store.updatePost(props.postId, {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      contentMd: parsed.data.contentMd,
      coverPathname: parsed.data.coverPathname ?? null,
      category: parsed.data.category,
      status: parsed.data.status,
      scheduledAt: props.initial.scheduledAt,
      seo: parsed.data.seo ?? null
    })
    toast.add({ title: 'Enregistré', description: 'Article mis à jour (fixture locale).', color: 'success' })
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

          <UFormField label="Slug" name="slug" required>
            <UInput v-model="state.slug" />
          </UFormField>

          <UFormField label="Extrait" name="excerpt">
            <UTextarea v-model="state.excerpt" :rows="3" autoresize />
          </UFormField>

          <UFormField label="Catégorie" name="category">
            <USelect v-model="state.category" :items="categoryItems" class="w-full" />
          </UFormField>

          <div class="flex items-center gap-2 text-sm text-muted">
            <span>Statut :</span>
            <AdminContentStatusBadge :status="state.status" />
          </div>
        </div>
      </AdminContentEditorSection>

      <AdminContentEditorSection
        label="cover"
        anchor="section-cover"
        surface
        description="Chemin R2 ou asset public (mock)."
      >
        <UFormField label="Image de couverture" name="coverPathname">
          <UInput
            :model-value="state.coverPathname ?? ''"
            placeholder="/images/blog/featured.png"
            @update:model-value="state.coverPathname = $event || null"
          />
        </UFormField>
        <div
          v-if="state.coverPathname"
          class="mt-3 overflow-hidden rounded-lg border border-default"
        >
          <img
            :src="state.coverPathname"
            :alt="state.title"
            class="max-h-48 w-full object-cover"
          >
        </div>
      </AdminContentEditorSection>

      <AdminContentSeoPanel
        v-model:meta-title="state.metaTitle"
        v-model:meta-description="state.metaDescription"
        v-model:og-image="state.ogImage"
        :has-entry="Boolean(initial.seo)"
        anchor="section-seo"
      />

      <AdminContentEditorSection
        label="content"
        anchor="section-content"
        description="Éditeur TipTap (UEditor) à brancher — markdown pour l'instant."
        flush-surface
      >
        <AdminContentEditorSurface flush>
          <UTextarea
            v-model="state.contentMd"
            :rows="16"
            autoresize
            placeholder="## Titre de section&#10;&#10;Contenu markdown..."
            class="font-mono text-sm"
          />
        </AdminContentEditorSurface>
      </AdminContentEditorSection>

      <AdminContentEditorFormActions>
        <AdminContentStatusBadge :status="state.status" />
        <UButton
          type="submit"
          icon="i-lucide-save"
          label="Enregistrer"
          :loading="saving"
        />
        <AdminContentPublishScheduleActions
          content-type="post"
          :content-id="postId"
          :status="state.status"
          :on-save="save"
          @update:status="onStatusUpdate"
        />
      </AdminContentEditorFormActions>
    </UForm>
  </AdminContentEditorBodyLayout>
</template>
