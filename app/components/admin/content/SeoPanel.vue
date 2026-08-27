<script setup lang="ts">
const metaTitle = defineModel<string>('metaTitle', { default: '' })
const metaDescription = defineModel<string>('metaDescription', { default: '' })
const ogImage = defineModel<string | null>('ogImage', { default: null })

const props = defineProps<{
  hasEntry: boolean
  anchor?: string
}>()

const showForm = ref(props.hasEntry)

watch(() => props.hasEntry, (value) => {
  if (value) {
    showForm.value = true
  }
})
</script>

<template>
  <AdminContentEditorSection
    label="seo"
    :count="hasEntry ? 1 : 0"
    :anchor="anchor"
    description="Titre et description pour Google et les réseaux sociaux."
  >
    <button
      v-if="!showForm"
      type="button"
      class="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default bg-elevated/30 px-4 py-10 text-sm text-muted transition hover:border-primary/40 hover:bg-elevated/60"
      @click="showForm = true"
    >
      <UIcon name="i-lucide-search" class="size-5 text-primary" />
      <span>Ajouter une entrée SEO</span>
    </button>

    <AdminContentEditorSurface
      v-else
      class="space-y-3"
    >
      <UFormField label="Meta title" name="metaTitle">
        <UInput v-model="metaTitle" placeholder="Titre pour les moteurs de recherche" />
      </UFormField>

      <UFormField label="Meta description" name="metaDescription">
        <UTextarea
          v-model="metaDescription"
          :rows="4"
          autoresize
          placeholder="Description pour les moteurs de recherche"
        />
      </UFormField>

      <UFormField label="Image Open Graph (URL)" name="ogImage">
        <UInput
          :model-value="ogImage ?? ''"
          placeholder="https://..."
          @update:model-value="ogImage = $event || null"
        />
      </UFormField>
    </AdminContentEditorSurface>
  </AdminContentEditorSection>
</template>
