<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Médiathèque'
})

const emit = defineEmits<{
  select: [pathname: string]
}>()

function onSelect(pathname: string) {
  emit('select', pathname)
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
    description="Sélectionnez une image de la médiathèque."
    :ui="{ content: 'sm:max-w-4xl' }"
  >
    <template #body>
      <AdminMediaLibrary
        selectable
        @select="onSelect"
      />
    </template>
  </UModal>
</template>
