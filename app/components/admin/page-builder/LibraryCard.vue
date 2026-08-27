<script setup lang="ts">
import type { BlockDefinition } from '#shared/content/block-catalog'

const props = defineProps<{
  definition: BlockDefinition
}>()

const emit = defineEmits<{
  insert: []
  dragStart: [event: DragEvent]
}>()
</script>

<template>
  <button
    type="button"
    draggable="true"
    class="group flex w-full cursor-grab flex-col overflow-hidden rounded-xl border border-default bg-default text-left shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/40 active:cursor-grabbing active:scale-[0.98]"
    @click="emit('insert')"
    @dragstart="emit('dragStart', $event)"
  >
    <div class="relative aspect-[16/10] overflow-hidden">
      <AdminPageBuilderLibraryPreview :type="props.definition.type" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-[#2a2520]/35 to-transparent" />
      <span class="absolute right-1.5 bottom-1.5 flex size-6 items-center justify-center rounded-md bg-white/90 text-primary shadow-sm">
        <UIcon
          :name="definition.icon"
          class="size-3.5"
        />
      </span>
    </div>
    <div class="space-y-0.5 px-2.5 py-2">
      <p class="text-sm font-medium text-highlighted">
        {{ definition.label }}
      </p>
      <p class="line-clamp-2 text-[11px] leading-snug text-muted">
        {{ definition.description }}
      </p>
    </div>
  </button>
</template>
