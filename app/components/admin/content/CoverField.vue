<script setup lang="ts">
import { mediaPublicUrl } from '#shared/media-url'

const model = defineModel<string | null>({ required: true })

const props = defineProps<{
  contentTitle?: string
}>()

const pickerOpen = ref(false)

const previewUrl = computed(() => {
  const path = model.value
  if (!path) {
    return null
  }
  if (path.startsWith('http') || path.startsWith('/images/')) {
    return path
  }
  return mediaPublicUrl(path)
})

const fileLabel = computed(() => {
  if (!model.value) {
    return 'Aucune image'
  }
  return model.value.split('/').pop() || model.value
})

function onPicked(pathname: string) {
  model.value = pathname
}

function clearCover() {
  model.value = null
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-start">
    <div
      class="relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-default bg-heya-neutral-50"
      :class="previewUrl ? 'size-28' : 'min-h-[5.5rem] w-full sm:size-28'"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        :alt="props.contentTitle || fileLabel"
        class="size-full object-cover"
      >
      <div
        v-else
        class="flex flex-col items-center gap-1 px-2 py-3 text-center text-xs text-muted"
      >
        <UIcon
          name="i-lucide-image-plus"
          class="size-6 text-dimmed"
        />
        <span>Aucune image</span>
      </div>
    </div>

    <div class="min-w-0 flex-1 space-y-2">
      <UFormField
        label="Image de couverture"
        name="coverPathname"
      >
        <div class="flex gap-2">
          <UInput
            :model-value="model ?? ''"
            placeholder="media/…"
            class="min-w-0 flex-1"
            @update:model-value="model = $event || null"
          />
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            icon="i-lucide-images"
            label="Médiathèque"
            class="shrink-0"
            @click="pickerOpen = true"
          />
        </div>
      </UFormField>
      <p class="truncate text-xs text-muted">
        {{ fileLabel }}
      </p>
      <UButton
        v-if="model"
        type="button"
        size="xs"
        color="neutral"
        variant="ghost"
        icon="i-lucide-trash-2"
        label="Retirer"
        @click="clearCover"
      />
    </div>

    <AdminEditorMediaPickerModal
      v-model:open="pickerOpen"
      title="Image de couverture"
      @select="onPicked"
    />
  </div>
</template>
