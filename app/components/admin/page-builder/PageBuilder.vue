<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { BLOCK_LIBRARY, getBlockDefinition } from '#shared/content/block-catalog'
import type { BlockType } from '#shared/schemas/blocks'
import {
  blockLabel,
  cloneEditorBlock,
  createEditorBlock,
  moveEditorBlock,
  reorderEditorBlock,
  type CanvasDevice,
  type EditorBlock,
  CANVAS_DEVICE_WIDTH
} from '~/utils/page-builder'

const blocks = defineModel<EditorBlock[]>('blocks', { required: true })
const title = defineModel<string>('title', { required: true })
const slug = defineModel<string>('slug', { required: true })
const metaTitle = defineModel<string>('metaTitle', { default: '' })
const metaDescription = defineModel<string>('metaDescription', { default: '' })
const ogImage = defineModel<string | null>('ogImage', { default: null })
const parentId = defineModel<string | null>('parentId', { default: null })

const props = defineProps<{
  hasSeoEntry?: boolean
  pageId?: string
}>()

type PanelTab = 'blocks' | 'edit' | 'page'

const panelTab = ref<PanelTab>('blocks')
const selectedId = ref<string | null>(null)
const query = ref('')
const device = ref<CanvasDevice>('desktop')
const dragKind = ref<'reorder' | 'insert' | null>(null)
const dragFrom = ref<number | null>(null)
const dragType = ref<BlockType | null>(null)
const dropIndex = ref<number | null>(null)
const dropEdge = ref<'before' | 'after'>('before')
const showSeo = ref(Boolean(props.hasSeoEntry))

const panelItems: TabsItem[] = [
  { label: 'Blocs', value: 'blocks', slot: 'blocks' },
  { label: 'Modifier', value: 'edit', slot: 'edit' },
  { label: 'Page', value: 'page', slot: 'page' }
]

const filteredLibrary = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) {
    return BLOCK_LIBRARY
  }
  return BLOCK_LIBRARY.filter(item =>
    item.label.toLowerCase().includes(needle)
    || item.description.toLowerCase().includes(needle)
    || item.type.includes(needle)
  )
})

const selectedBlock = computed(() => blocks.value.find(block => block.id === selectedId.value) ?? null)
const selectedIndex = computed(() => blocks.value.findIndex(block => block.id === selectedId.value))
const selectedDefinition = computed(() => {
  if (!selectedBlock.value) {
    return null
  }
  return getBlockDefinition(selectedBlock.value.type)
})

watch(() => blocks.value.map(block => block.id).join(','), (ids) => {
  if (selectedId.value && !ids.includes(selectedId.value)) {
    selectedId.value = null
  }
})

function insertBlockAt(type: BlockType, at: number) {
  const created = createEditorBlock(type)
  const next = [...blocks.value]
  next.splice(Math.max(0, Math.min(at, next.length)), 0, created)
  blocks.value = next
  selectedId.value = created.id
  panelTab.value = 'edit'
}

function insertBlock(type: BlockType) {
  const insertAt = selectedIndex.value >= 0 ? selectedIndex.value + 1 : blocks.value.length
  insertBlockAt(type, insertAt)
}

function isDropLineBefore(index: number) {
  return dragKind.value !== null && dropIndex.value === index && dropEdge.value === 'before'
}

function isDropLineAfter(index: number) {
  return dragKind.value !== null && dropIndex.value === index && dropEdge.value === 'after'
}

function setDropTarget(event: DragEvent, index: number) {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) {
    return
  }
  const rect = target.getBoundingClientRect()
  dropIndex.value = index
  dropEdge.value = event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = dragKind.value === 'insert' ? 'copy' : 'move'
  }
}

function clearDrag() {
  dragKind.value = null
  dragFrom.value = null
  dragType.value = null
  dropIndex.value = null
  dropEdge.value = 'before'
}

function onLibraryDragStart(type: BlockType, event: DragEvent) {
  dragKind.value = 'insert'
  dragType.value = type
  dragFrom.value = null
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('text/plain', type)
  }
}

function onReorderDragStart(index: number, event: DragEvent) {
  dragKind.value = 'reorder'
  dragFrom.value = index
  dragType.value = null
  const label = blockLabel(blocks.value[index]?.type ?? 'hero')
  const ghost = document.createElement('div')
  ghost.className = 'cms-page-builder-drag-ghost'
  ghost.textContent = label
  document.body.appendChild(ghost)
  event.dataTransfer?.setDragImage(ghost, 20, 12)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
  requestAnimationFrame(() => ghost.remove())
}

function onDropAt(index: number) {
  if (dragKind.value === 'insert' && dragType.value) {
    const at = dropEdge.value === 'after' ? index + 1 : index
    insertBlockAt(dragType.value, at)
  } else if (dragKind.value === 'reorder' && dragFrom.value !== null) {
    blocks.value = reorderEditorBlock(blocks.value, dragFrom.value, index, dropEdge.value)
  }
  clearDrag()
}

function onEmptyDragOver(event: DragEvent) {
  if (!dragKind.value) {
    return
  }
  dropIndex.value = 0
  dropEdge.value = 'before'
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = dragKind.value === 'insert' ? 'copy' : 'move'
  }
}

function onEmptyDrop() {
  if (dragKind.value === 'insert' && dragType.value) {
    insertBlockAt(dragType.value, 0)
  }
  clearDrag()
}

function onCanvasEndDrop() {
  if (!blocks.value.length) {
    onEmptyDrop()
    return
  }
  dropEdge.value = 'after'
  onDropAt(blocks.value.length - 1)
}

function onEndZoneDragOver(event: DragEvent) {
  if (!blocks.value.length) {
    onEmptyDragOver(event)
    return
  }
  dropIndex.value = blocks.value.length - 1
  dropEdge.value = 'after'
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = dragKind.value === 'insert' ? 'copy' : 'move'
  }
}

function selectBlock(id: string) {
  selectedId.value = id
  panelTab.value = 'edit'
}

function duplicateBlock(id: string) {
  const index = blocks.value.findIndex(block => block.id === id)
  const source = blocks.value[index]
  if (!source) {
    return
  }
  const copy = cloneEditorBlock(source)
  const next = [...blocks.value]
  next.splice(index + 1, 0, copy)
  blocks.value = next
  selectedId.value = copy.id
}

function removeBlock(id: string) {
  blocks.value = blocks.value.filter(block => block.id !== id)
  if (selectedId.value === id) {
    selectedId.value = null
    panelTab.value = 'blocks'
  }
}

function moveSelected(id: string, direction: -1 | 1) {
  const from = blocks.value.findIndex(block => block.id === id)
  if (from < 0) {
    return
  }
  blocks.value = moveEditorBlock(blocks.value, from, from + direction)
}

function patchSelectedProps(key: string, value: unknown) {
  const current = selectedBlock.value
  if (!current) {
    return
  }

  if (key === 'body') {
    blocks.value = blocks.value.map(block =>
      block.id === current.id
        ? { ...block, body: typeof value === 'string' ? value : '' }
        : block
    )
    return
  }

  blocks.value = blocks.value.map(block =>
    block.id === current.id
      ? { ...block, props: { ...block.props, [key]: value } }
      : block
  )
}

function fieldModel(key: string) {
  const current = selectedBlock.value
  if (!current) {
    return undefined
  }
  if (key === 'body') {
    return current.body ?? ''
  }
  return current.props[key]
}

watch(ogImage, (value) => {
  if (value) {
    showSeo.value = true
  }
})
</script>

<template>
  <div
    class="cms-page-builder flex min-h-0 flex-1 overflow-hidden"
    :class="{ 'cms-page-builder--dragging': dragKind }"
    @dragend="clearDrag"
  >
    <aside class="flex w-[20.5rem] shrink-0 flex-col border-r border-default bg-default">
      <div class="border-b border-default px-2 pt-2">
        <UTabs
          v-model="panelTab"
          :items="panelItems"
          variant="link"
          color="primary"
          size="sm"
          :content="false"
          class="w-full"
          :ui="{
            list: 'border-b-0 gap-1',
            trigger: 'px-2 py-2 text-xs font-semibold uppercase tracking-wide'
          }"
        />
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <div
          v-show="panelTab === 'blocks'"
          class="space-y-3"
        >
          <UInput
            v-model="query"
            icon="i-lucide-search"
            placeholder="Rechercher un bloc"
          />
          <p class="text-[11px] leading-snug text-muted">
            Ce sont des sections de page. Glissez-les sur le canevas, ou cliquez pour les insérer.
          </p>
          <div class="grid grid-cols-2 gap-2">
            <AdminPageBuilderLibraryCard
              v-for="item in filteredLibrary"
              :key="item.type"
              :definition="item"
              @insert="insertBlock(item.type)"
              @drag-start="onLibraryDragStart(item.type, $event)"
            />
          </div>
          <p
            v-if="!filteredLibrary.length"
            class="py-8 text-center text-sm text-muted"
          >
            Aucun bloc ne correspond.
          </p>
        </div>

        <div
          v-show="panelTab === 'edit'"
          class="space-y-4"
        >
          <template v-if="selectedBlock && selectedDefinition">
            <div>
              <p class="text-sm font-semibold text-highlighted">
                {{ selectedDefinition.label }}
              </p>
              <p class="mt-0.5 text-xs text-muted">
                {{ selectedDefinition.description }}
              </p>
            </div>
            <AdminPageBuilderField
              v-for="field in selectedDefinition.fields"
              :key="field.key"
              :field="field"
              :model-value="fieldModel(field.key)"
              @update:model-value="patchSelectedProps(field.key, $event)"
            />
          </template>
          <UEmpty
            v-else
            icon="i-lucide-mouse-pointer-click"
            title="Aucun bloc sélectionné"
            description="Cliquez un bloc sur la page, ou ajoutez-en un depuis l'onglet Blocs."
            variant="naked"
            :ui="{ root: 'py-10' }"
          />
        </div>

        <div
          v-show="panelTab === 'page'"
          class="space-y-4"
        >
          <UFormField
            label="Titre interne"
            name="title"
            required
          >
            <UInput
              v-model="title"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Adresse de la page"
            name="slug"
            :hint="parentId ? 'Dernier segment, ex. co-living' : 'Racine : concept. Ou chemin legacy solutions/…'"
            required
          >
            <UInput
              v-model="slug"
              class="w-full"
            />
          </UFormField>

          <AdminPageBuilderParentField
            v-model="parentId"
            :exclude-page-id="pageId"
            :page-slug="slug"
          />

          <div class="border-t border-default pt-4">
            <p class="mb-3 text-sm font-medium text-highlighted">
              Référencement
            </p>

            <button
              v-if="!showSeo && !hasSeoEntry && !metaTitle && !metaDescription && !ogImage"
              type="button"
              class="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-default bg-heya-neutral-50 px-4 py-8 text-sm text-muted transition hover:border-primary/40"
              @click="showSeo = true"
            >
              <UIcon
                name="i-lucide-search"
                class="size-5 text-primary"
              />
              <span>Ajouter le SEO</span>
            </button>

            <div
              v-else
              class="space-y-3"
            >
              <UFormField
                label="Titre Google"
                name="metaTitle"
              >
                <UInput
                  v-model="metaTitle"
                  class="w-full"
                  placeholder="Titre pour les moteurs de recherche"
                />
              </UFormField>
              <UFormField
                label="Description Google"
                name="metaDescription"
              >
                <UTextarea
                  v-model="metaDescription"
                  :rows="4"
                  autoresize
                  class="w-full"
                  placeholder="Description pour les moteurs de recherche"
                />
              </UFormField>
              <AdminPageBuilderImageField
                :model-value="ogImage ?? ''"
                label="Image de partage"
                @update:model-value="ogImage = $event || null"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>

    <section class="flex min-w-0 flex-1 flex-col bg-heya-neutral-100/80">
      <div class="flex items-center justify-between gap-3 border-b border-default bg-default/90 px-3 py-2">
        <p class="text-xs font-medium text-muted">
          {{ blocks.length }} bloc{{ blocks.length > 1 ? 's' : '' }}
        </p>
        <UButtonGroup size="xs">
          <UButton
            type="button"
            icon="i-lucide-monitor"
            :color="device === 'desktop' ? 'primary' : 'neutral'"
            :variant="device === 'desktop' ? 'soft' : 'ghost'"
            aria-label="Aperçu ordinateur"
            @click="device = 'desktop'"
          />
          <UButton
            type="button"
            icon="i-lucide-tablet"
            :color="device === 'tablet' ? 'primary' : 'neutral'"
            :variant="device === 'tablet' ? 'soft' : 'ghost'"
            aria-label="Aperçu tablette"
            @click="device = 'tablet'"
          />
          <UButton
            type="button"
            icon="i-lucide-smartphone"
            :color="device === 'mobile' ? 'primary' : 'neutral'"
            :variant="device === 'mobile' ? 'soft' : 'ghost'"
            aria-label="Aperçu mobile"
            @click="device = 'mobile'"
          />
        </UButtonGroup>
      </div>

      <div
        class="min-h-0 flex-1 overflow-y-auto px-3 py-6 sm:px-6"
        @click="selectedId = null"
        @dragover.prevent
      >
        <div
          class="mx-auto overflow-hidden rounded-xl border border-default bg-white shadow-sm transition-[max-width] duration-300"
          :class="dragKind ? 'ring-2 ring-primary/30' : ''"
          :style="{ maxWidth: CANVAS_DEVICE_WIDTH[device] }"
        >
          <div
            v-if="blocks.length"
            class="relative"
          >
            <div
              v-for="(block, index) in blocks"
              :key="block.id"
              class="relative"
              @dragover.prevent="setDropTarget($event, index)"
              @drop.prevent="onDropAt(index)"
            >
              <div
                v-if="isDropLineBefore(index)"
                class="cms-page-builder-drop-line"
              />
              <AdminPageBuilderCanvasBlock
                :block="block"
                :index="index"
                :total="blocks.length"
                :selected="block.id === selectedId"
                :dragging="dragKind === 'reorder' && dragFrom === index"
                @select="selectBlock(block.id)"
                @duplicate="duplicateBlock(block.id)"
                @remove="removeBlock(block.id)"
                @move="moveSelected(block.id, $event)"
                @drag-start="onReorderDragStart(index, $event)"
              />
              <div
                v-if="isDropLineAfter(index)"
                class="cms-page-builder-drop-line"
              />
            </div>
            <div
              class="h-10"
              @dragover.prevent="onEndZoneDragOver"
              @drop.prevent="onCanvasEndDrop"
            />
          </div>
          <div
            v-else
            class="flex min-h-[28rem] items-center justify-center p-8"
            :class="dragKind === 'insert' ? 'bg-primary/5' : ''"
            @click.stop
            @dragover.prevent="onEmptyDragOver"
            @drop.prevent="onEmptyDrop"
          >
            <UEmpty
              icon="i-lucide-layout-template"
              title="Page vide"
              description="Glissez un bloc depuis la gauche, ou cliquez une carte. Le texte et les icônes arrivent déjà remplis."
              variant="naked"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
