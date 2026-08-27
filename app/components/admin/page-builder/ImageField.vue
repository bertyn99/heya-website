<script setup lang="ts">
import { mediaPublicUrl } from '#shared/media-url'

const model = defineModel<string>({ default: '' })

const props = defineProps<{
  label: string
  hint?: string
}>()

const pickerOpen = ref(false)

const previewUrl = computed(() => {
  const path = model.value
  if (!path) {
    return null
  }
  if (path.startsWith('http') || path.startsWith('/images/') || path.startsWith('/')) {
    return path
  }
  return mediaPublicUrl(path)
})

function onPicked(pathname: string) {
  model.value = pathname.startsWith('/images/') || pathname.startsWith('http')
    ? pathname
    : mediaPublicUrl(pathname)
}
</script>

<template>
  <UFormField
    :label="props.label"
    :hint="props.hint"
  >
    <div class="flex items-start gap-3">
      <div class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-default bg-heya-neutral-50">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt=""
          class="size-full object-cover"
        >
        <UIcon
          v-else
          name="i-lucide-image"
          class="size-5 text-dimmed"
        />
      </div>
      <div class="min-w-0 flex-1 space-y-2">
        <div class="flex gap-2">
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            size="sm"
            icon="i-lucide-images"
            label="Médiathèque"
            @click="pickerOpen = true"
          />
          <UButton
            v-if="model"
            type="button"
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-trash-2"
            aria-label="Retirer l'image"
            @click="model = ''"
          />
        </div>
        <p class="truncate text-xs text-muted">
          {{ model || 'Aucune image' }}
        </p>
      </div>
    </div>
  </UFormField>

  <AdminEditorMediaPickerModal
    v-model:open="pickerOpen"
    :title="props.label"
    @select="onPicked"
  />
</template>
