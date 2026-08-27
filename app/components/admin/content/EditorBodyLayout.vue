<script setup lang="ts">
import type { EditorNavSection } from '#shared/types/admin'

defineProps<{
  sections?: EditorNavSection[]
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-4xl px-2 pb-10 pt-2 sm:px-3">
    <AdminContentEditorSectionNav
      v-if="sections?.length"
      :sections="sections"
    />
    <slot />
  </div>
</template>
