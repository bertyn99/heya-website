<script setup lang="ts">
const props = defineProps<{
  label: string
  count?: number
  description?: string
  anchor?: string
  surface?: boolean
  flushSurface?: boolean
}>()

const sectionId = computed(() => props.anchor ?? undefined)
</script>

<template>
  <section
    :id="sectionId"
    class="scroll-mt-[7.25rem] space-y-3"
  >
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <AdminContentFieldLabel
          :label="label"
          :count="count"
          size="section"
        />
        <p
          v-if="description"
          class="mt-1 max-w-prose text-sm text-muted"
        >
          {{ description }}
        </p>
      </div>
      <slot name="actions" />
    </div>
    <AdminContentEditorSurface
      v-if="surface"
      :flush="flushSurface"
    >
      <slot />
    </AdminContentEditorSurface>
    <slot v-else />
  </section>
</template>
