<script setup lang="ts">
import { heyaComarkComponents } from '~/utils/comark-components'
import type { EditorBlock } from '~/utils/page-builder'
import { blockLabel } from '~/utils/page-builder'

const props = defineProps<{
  block: EditorBlock
  selected?: boolean
  dragging?: boolean
  index: number
  total: number
}>()

const emit = defineEmits<{
  select: []
  duplicate: []
  remove: []
  move: [direction: -1 | 1]
  dragStart: [event: DragEvent]
}>()

const component = computed(() => heyaComarkComponents[props.block.type])
const solutionSlug = computed(() => {
  const slug = props.block.props.slug
  return typeof slug === 'string' ? slug : ''
})
</script>

<template>
  <article
    class="cms-page-builder-block group relative"
    :class="{
      'cms-page-builder-block--selected': selected,
      'cms-page-builder-block--dragging': dragging
    }"
    @click.stop="emit('select')"
  >
    <div class="cms-page-builder-block__chrome pointer-events-none absolute inset-x-2 top-2 z-10 flex items-start justify-between gap-2">
      <button
        type="button"
        class="pointer-events-auto flex cursor-grab items-center gap-1.5 rounded-md border border-default bg-white/95 px-2 py-1 text-xs font-medium text-muted shadow-sm active:cursor-grabbing"
        draggable="true"
        :title="`Déplacer ${blockLabel(block.type)}`"
        @click.stop
        @dragstart.stop="emit('dragStart', $event)"
      >
        <UIcon
          name="i-lucide-grip-vertical"
          class="size-3.5"
        />
        {{ blockLabel(block.type) }}
      </button>

      <div
        v-if="selected"
        class="pointer-events-auto flex items-center gap-0.5 rounded-md border border-default bg-white/95 p-0.5 shadow-sm"
      >
        <UButton
          type="button"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-chevron-up"
          :disabled="index === 0"
          aria-label="Monter le bloc"
          @click.stop="emit('move', -1)"
        />
        <UButton
          type="button"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-chevron-down"
          :disabled="index === total - 1"
          aria-label="Descendre le bloc"
          @click.stop="emit('move', 1)"
        />
        <UButton
          type="button"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-copy"
          aria-label="Dupliquer le bloc"
          @click.stop="emit('duplicate')"
        />
        <UButton
          type="button"
          color="error"
          variant="ghost"
          size="xs"
          icon="i-lucide-trash-2"
          aria-label="Supprimer le bloc"
          @click.stop="emit('remove')"
        />
      </div>
    </div>

    <div
      class="cms-page-builder-block__content pointer-events-none select-none"
      :class="`cms-page-builder-block__content--${block.type}`"
    >
      <AdminPageBuilderCompactSolution
        v-if="block.type === 'solution'"
        :slug="solutionSlug"
      />
      <AdminPageBuilderCompactContactForm
        v-else-if="block.type === 'contact-form'"
      />
      <component
        :is="component"
        v-else
        v-bind="block.props"
      >
        <Markdown
          v-if="block.type === 'richtext'"
          :value="block.body || ''"
        />
      </component>
    </div>
  </article>
</template>
