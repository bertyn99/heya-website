<script setup lang="ts">
import type { BlockField } from '#shared/content/block-catalog'
import type { ButtonProps } from '@nuxt/ui'

const model = defineModel<unknown>({ required: true })

const props = defineProps<{
  field: BlockField
}>()

const stringValue = computed({
  get: () => (typeof model.value === 'string' ? model.value : ''),
  set: (value: string) => {
    model.value = value
  }
})

const boolValue = computed({
  get: () => Boolean(model.value),
  set: (value: boolean) => {
    model.value = value
  }
})

const selectItems = computed(() => props.field.options ?? [])

function asRecordList(): Record<string, unknown>[] {
  return Array.isArray(model.value)
    ? model.value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object' && !Array.isArray(item))
    : []
}

function asStringList(): string[] {
  return Array.isArray(model.value)
    ? model.value.filter((item): item is string => typeof item === 'string')
    : []
}

function patchRepeatItem(index: number, key: string, value: unknown) {
  const next = asRecordList().map((item, itemIndex) => {
    if (itemIndex !== index) {
      return item
    }
    return { ...item, [key]: value }
  })
  model.value = next
}

function addRepeatItem() {
  const template = structuredClone(props.field.itemDefaults ?? {})
  model.value = [...asRecordList(), template]
}

function removeRepeatItem(index: number) {
  model.value = asRecordList().filter((_, itemIndex) => itemIndex !== index)
}

function moveRepeatItem(index: number, direction: -1 | 1) {
  const list = asRecordList()
  const target = index + direction
  if (target < 0 || target >= list.length) {
    return
  }
  const next = [...list]
  const current = next[index]
  const swap = next[target]
  if (!current || !swap) {
    return
  }
  next[index] = swap
  next[target] = current
  model.value = next
}

const repeatDragFrom = ref<number | null>(null)

function onRepeatDragStart(index: number, event: DragEvent) {
  repeatDragFrom.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

function onRepeatDrop(index: number) {
  const from = repeatDragFrom.value
  repeatDragFrom.value = null
  if (from === null || from === index) {
    return
  }
  const list = [...asRecordList()]
  const [item] = list.splice(from, 1)
  if (!item) {
    return
  }
  list.splice(index, 0, item)
  model.value = list
}

function patchStringItem(index: number, value: string) {
  const next = asStringList().map((item, itemIndex) => itemIndex === index ? value : item)
  model.value = next
}

function addStringItem() {
  model.value = [...asStringList(), '']
}

function removeStringItem(index: number) {
  model.value = asStringList().filter((_, itemIndex) => itemIndex !== index)
}

function previewColor(value: unknown): ButtonProps['color'] {
  switch (value) {
    case 'primary':
    case 'secondary':
    case 'success':
    case 'info':
    case 'warning':
    case 'error':
    case 'neutral':
      return value
    default:
      return 'primary'
  }
}

function previewVariant(value: unknown): ButtonProps['variant'] {
  switch (value) {
    case 'solid':
    case 'outline':
    case 'soft':
    case 'subtle':
    case 'ghost':
    case 'link':
      return value
    default:
      return 'solid'
  }
}
</script>

<template>
  <AdminPageBuilderImageField
    v-if="field.kind === 'image'"
    v-model="stringValue"
    :label="field.label"
    :hint="field.hint"
  />

  <UFormField
    v-else-if="field.kind === 'text' || field.kind === 'url'"
    :label="field.label"
    :hint="field.hint"
  >
    <UInput
      v-model="stringValue"
      :type="field.kind === 'url' ? 'url' : 'text'"
      class="w-full"
    />
  </UFormField>

  <UFormField
    v-else-if="field.kind === 'textarea'"
    :label="field.label"
    :hint="field.hint"
  >
    <UTextarea
      v-model="stringValue"
      :rows="3"
      autoresize
      class="w-full"
    />
  </UFormField>

  <AdminPageBuilderIconPicker
    v-else-if="field.kind === 'icon'"
    v-model="stringValue"
    :label="field.label"
    :hint="field.hint"
  />

  <UFormField
    v-else-if="field.kind === 'select'"
    :label="field.label"
  >
    <USelect
      v-model="stringValue"
      :items="selectItems"
      value-key="value"
      class="w-full"
    />
  </UFormField>

  <UFormField
    v-else-if="field.kind === 'toggle'"
    :label="field.label"
  >
    <USwitch v-model="boolValue" />
  </UFormField>

  <UFormField
    v-else-if="field.kind === 'richtext'"
    :label="field.label"
  >
    <AdminContentMarkdownEditor v-model="stringValue" />
  </UFormField>

  <div
    v-else-if="field.kind === 'string-list'"
    class="space-y-2"
  >
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm font-medium text-highlighted">
        {{ field.label }}
      </p>
      <UButton
        type="button"
        size="xs"
        color="neutral"
        variant="ghost"
        icon="i-lucide-plus"
        :label="field.addLabel || 'Ajouter'"
        @click="addStringItem"
      />
    </div>
    <div
      v-for="(item, index) in asStringList()"
      :key="index"
      class="flex gap-2"
    >
      <UInput
        :model-value="item"
        class="min-w-0 flex-1"
        @update:model-value="patchStringItem(index, String($event ?? ''))"
      />
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        icon="i-lucide-trash-2"
        size="sm"
        :aria-label="`Supprimer ${field.itemLabel || 'l\'élément'}`"
        @click="removeStringItem(index)"
      />
    </div>
  </div>

  <div
    v-else-if="field.kind === 'repeat'"
    class="space-y-3"
  >
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm font-medium text-highlighted">
        {{ field.label }}
      </p>
      <UButton
        type="button"
        size="xs"
        color="primary"
        variant="soft"
        icon="i-lucide-plus"
        :label="field.addLabel || 'Ajouter'"
        @click="addRepeatItem"
      />
    </div>

    <div
      v-for="(item, index) in asRecordList()"
      :key="index"
      class="space-y-3 rounded-xl border border-default bg-heya-neutral-50/70 p-3"
      @dragover.prevent
      @drop.prevent="onRepeatDrop(index)"
    >
      <div class="flex items-center justify-between gap-2">
        <button
          type="button"
          class="flex cursor-grab items-center gap-1.5 text-xs font-medium text-muted active:cursor-grabbing"
          draggable="true"
          :aria-label="`Réordonner ${field.itemLabel || 'l\'élément'} ${index + 1}`"
          @click.stop
          @dragstart="onRepeatDragStart(index, $event)"
          @dragend="repeatDragFrom = null"
        >
          <UIcon
            name="i-lucide-grip-vertical"
            class="size-3.5"
          />
          {{ field.itemLabel || 'Élément' }} {{ index + 1 }}
        </button>
        <UButton
          v-if="typeof item.label === 'string' && item.label && (item.color || item.variant)"
          type="button"
          size="xs"
          :label="item.label"
          :color="previewColor(item.color)"
          :variant="previewVariant(item.variant)"
          :icon="typeof item.icon === 'string' ? item.icon : undefined"
          class="pointer-events-none"
        />
        <div class="flex items-center gap-0.5">
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-chevron-up"
            :disabled="index === 0"
            :aria-label="`Monter ${field.itemLabel || 'l\'élément'}`"
            @click="moveRepeatItem(index, -1)"
          />
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-chevron-down"
            :disabled="index === asRecordList().length - 1"
            :aria-label="`Descendre ${field.itemLabel || 'l\'élément'}`"
            @click="moveRepeatItem(index, 1)"
          />
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-trash-2"
            :aria-label="`Supprimer ${field.itemLabel || 'l\'élément'}`"
            @click="removeRepeatItem(index)"
          />
        </div>
      </div>
      <AdminPageBuilderField
        v-for="subField in field.itemFields || []"
        :key="subField.key"
        :field="subField"
        :model-value="item[subField.key]"
        @update:model-value="patchRepeatItem(index, subField.key, $event)"
      />
    </div>
  </div>
</template>
