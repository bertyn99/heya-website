<script setup lang="ts">
import type { EditorNavSection, AdminPostRecord } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { postInputSchema } from '#shared/schemas/content'
import { mockPostCategories } from '#shared/fixtures/admin-content'
import { slugifyString } from '#shared/slug'
import { apiErrorMessage } from '~/utils/api-error'
import { mapAdminPost, type AdminPageApi, type AdminPostApi } from '~/utils/admin-mappers'

const props = defineProps<{
  postId: string
  initial: AdminPostRecord
}>()

const emit = defineEmits<{
  saved: [post: AdminPostRecord]
}>()

const toast = useToast()
const slugTouched = ref(true)

const state = reactive({
  title: props.initial.title,
  slug: props.initial.slug,
  excerpt: props.initial.excerpt,
  contentMd: props.initial.contentMd,
  coverPathname: props.initial.coverPathname,
  category: props.initial.category,
  status: props.initial.status as ContentStatus,
  scheduledAt: props.initial.scheduledAt,
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

function applyRecord(post: AdminPostRecord) {
  state.title = post.title
  state.slug = post.slug
  state.excerpt = post.excerpt
  state.contentMd = post.contentMd
  state.coverPathname = post.coverPathname
  state.category = post.category
  state.status = post.status
  state.scheduledAt = post.scheduledAt
  state.metaTitle = post.seo?.metaTitle ?? ''
  state.metaDescription = post.seo?.metaDescription ?? ''
  state.ogImage = post.seo?.ogImage ?? null
  slugTouched.value = true
}

watch(() => props.initial, (post) => {
  applyRecord(post)
})

watch(() => state.title, (title) => {
  if (slugTouched.value) {
    return
  }
  const next = slugifyString(title)
  if (next) {
    state.slug = next
  }
})

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
    excerpt: state.excerpt,
    contentMd: state.contentMd,
    coverPathname: state.coverPathname,
    category: state.category,
    status: state.status,
    scheduledAt: state.scheduledAt ? new Date(state.scheduledAt) : null,
    seo: seoPayload()
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
    const updated = mapAdminPost(await $fetch<AdminPostApi>(`/api/admin/posts/${props.postId}`, {
      method: 'PUT',
      body: parsed.data
    }))
    applyRecord(updated)
    if (!options?.silent) {
      emit('saved', updated)
      toast.add({ title: 'Enregistré', description: 'Article mis à jour.', color: 'success' })
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
  const mapped = mapAdminPost(row as AdminPostApi)
  applyRecord(mapped)
  emit('saved', mapped)
}

function onSlugInput(value: string) {
  slugTouched.value = true
  state.slug = value
}

function regenerateSlug() {
  slugTouched.value = false
  const next = slugifyString(state.title)
  if (next) {
    state.slug = next
  }
}
</script>

<template>
  <AdminContentEditorBodyLayout :sections="sections">
    <UForm
      id="heya-cms-post-form"
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
          <UFormField
            label="Titre"
            name="title"
            required
          >
            <UInput v-model="state.title" />
          </UFormField>

          <UFormField
            label="Slug"
            name="slug"
            required
          >
            <div class="flex gap-2">
              <UInput
                :model-value="state.slug"
                class="min-w-0 flex-1"
                @update:model-value="onSlugInput($event)"
              />
              <UButton
                type="button"
                color="neutral"
                variant="outline"
                icon="i-lucide-refresh-cw"
                label="Depuis le titre"
                class="shrink-0"
                @click="regenerateSlug"
              />
            </div>
          </UFormField>

          <UFormField
            label="Extrait"
            name="excerpt"
          >
            <UTextarea
              v-model="state.excerpt"
              :rows="3"
              autoresize
            />
          </UFormField>

          <UFormField
            label="Catégorie"
            name="category"
          >
            <USelect
              v-model="state.category"
              :items="categoryItems"
              class="w-full"
            />
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
        description="Image stockée dans la médiathèque (R2) ou asset public /images/."
      >
        <AdminContentCoverField
          v-model="state.coverPathname"
          :content-title="state.title"
        />
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
        description="Éditeur TipTap (UEditor) : images, liens, encadrés et grilles. Markdown en sortie."
        flush-surface
      >
        <AdminContentEditorSurface flush>
          <AdminContentMarkdownEditor v-model="state.contentMd" />
        </AdminContentEditorSurface>
      </AdminContentEditorSection>

      <AdminContentEditorFormActions>
        <AdminContentStatusBadge :status="state.status" />
        <UButton
          type="button"
          form="heya-cms-post-form"
          icon="i-lucide-save"
          label="Enregistrer"
          :loading="saving"
          @click="() => { void save() }"
        />
        <AdminContentPublishScheduleActions
          content-type="post"
          :content-id="postId"
          :status="state.status"
          :on-save="save"
          @update:status="onStatusUpdate"
          @committed="onCommitted"
        />
      </AdminContentEditorFormActions>
    </UForm>

  </AdminContentEditorBodyLayout>
</template>
