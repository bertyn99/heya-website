<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { AdminPageApi, AdminPostApi } from '~/utils/admin-mappers'
import { applyEditorLink, isExternalHref, removeEditorLink } from '~/utils/editor-link'

const props = defineProps<{
  editor: Editor
  autoOpen?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

type LinkMode = 'posts' | 'pages' | 'external'

interface ListRow {
  id: string
  title: string
  slug: string
  status?: string
}

const mode = ref<LinkMode>('posts')
const search = ref('')
const loading = ref(false)
const externalUrl = ref('')
const linkText = ref('')
const hrefDraft = ref('')
const previewTitle = ref<string | null>(null)

const posts = ref<ListRow[]>([])
const pages = ref<ListRow[]>([])

const active = computed(() => props.editor.isActive('link'))
const hasTextSelection = computed(() => !props.editor.state.selection.empty)
const disabled = computed(() => !props.editor.isEditable || props.editor.isActive('image'))
const canApply = computed(() => Boolean(hrefDraft.value.trim()))

const modeItems = [
  { label: 'Articles', value: 'posts' as const, icon: 'i-lucide-newspaper' },
  { label: 'Pages', value: 'pages' as const, icon: 'i-lucide-file' },
  { label: 'URL externe', value: 'external' as const, icon: 'i-lucide-globe' }
]

function rowHref(kind: Exclude<LinkMode, 'external'>, row: ListRow): string {
  return kind === 'posts' ? `/blog/${row.slug}` : `/${row.slug}`
}

const currentRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  const source = mode.value === 'posts' ? posts.value : mode.value === 'pages' ? pages.value : []
  if (!q) {
    return source
  }
  return source.filter(row =>
    row.title.toLowerCase().includes(q) || row.slug.toLowerCase().includes(q)
  )
})

async function fetchInternalLists() {
  if (posts.value.length || pages.value.length) {
    return
  }
  loading.value = true
  try {
    const [postRows, pageRows] = await Promise.all([
      $fetch<AdminPostApi[]>('/api/admin/posts', { query: { limit: 80 } }),
      $fetch<AdminPageApi[]>('/api/admin/pages', { query: { limit: 80 } })
    ])
    posts.value = postRows ?? []
    pages.value = pageRows ?? []
  } finally {
    loading.value = false
  }
}

function syncExternalDraft() {
  const raw = externalUrl.value.trim()
  if (!raw) {
    hrefDraft.value = ''
    previewTitle.value = null
    return
  }
  const href = isExternalHref(raw) ? raw : `https://${raw}`
  hrefDraft.value = href
  previewTitle.value = href
  if (!hasTextSelection.value && !linkText.value.trim()) {
    linkText.value = href
  }
}

function syncFromEditor() {
  search.value = ''
  linkText.value = ''
  externalUrl.value = ''
  const href = ((props.editor.getAttributes('link').href as string) || '').trim()
  hrefDraft.value = href

  if (!href) {
    previewTitle.value = null
    mode.value = 'posts'
    return
  }

  if (isExternalHref(href)) {
    mode.value = 'external'
    externalUrl.value = href
    syncExternalDraft()
    return
  }

  mode.value = href.startsWith('/blog/') ? 'posts' : 'pages'
  previewTitle.value = href
}

function applyLink() {
  const href = hrefDraft.value.trim()
  if (!href) {
    return
  }
  applyEditorLink(props.editor, {
    href,
    title: hasTextSelection.value
      ? undefined
      : (linkText.value.trim() || previewTitle.value || undefined)
  })
  open.value = false
}

function applyAndCloseFromRow(kind: Exclude<LinkMode, 'external'>, row: ListRow) {
  hrefDraft.value = rowHref(kind, row)
  previewTitle.value = row.title
  if (!hasTextSelection.value) {
    linkText.value = row.title
  }
  applyLink()
}

function removeLink() {
  removeEditorLink(props.editor)
  hrefDraft.value = ''
  externalUrl.value = ''
  open.value = false
}

watch(open, async (isOpen) => {
  if (isOpen) {
    syncFromEditor()
    await fetchInternalLists()
  }
})

watch(externalUrl, () => {
  if (mode.value === 'external') {
    syncExternalDraft()
  }
})
</script>

<template>
  <UPopover
    v-model:open="open"
    :content="{ side: 'bottom', align: 'start' }"
    :ui="{ content: 'p-0 w-[min(100vw-1.25rem,22rem)] sm:w-[26rem]' }"
  >
    <UTooltip text="Lien">
      <UButton
        icon="i-lucide-link"
        color="neutral"
        active-color="primary"
        variant="ghost"
        active-variant="soft"
        size="sm"
        :active="active"
        :disabled="disabled"
      />
    </UTooltip>

    <template #content>
      <div class="flex w-full flex-col overflow-hidden bg-default" style="max-height: min(26rem, calc(100vh - 6rem));">
        <div class="shrink-0 border-b border-default px-3 py-2">
          <p class="text-sm font-medium text-highlighted">
            Lien
          </p>
          <div
            class="mt-2 flex gap-0.5 rounded-lg bg-elevated/80 p-0.5"
            role="tablist"
            aria-label="Type de lien"
          >
            <UTooltip
              v-for="item in modeItems"
              :key="item.value"
              :text="item.label"
            >
              <UButton
                :icon="item.icon"
                size="xs"
                :color="mode === item.value ? 'primary' : 'neutral'"
                :variant="mode === item.value ? 'soft' : 'ghost'"
                :aria-label="item.label"
                role="tab"
                @click="mode = item.value"
              />
            </UTooltip>
          </div>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto px-3 py-2">
          <template v-if="mode !== 'external'">
            <UInput
              v-model="search"
              icon="i-lucide-search"
              size="sm"
              placeholder="Titre ou slug…"
              class="mb-2"
              :disabled="loading"
            />

            <ul
              v-if="!loading"
              class="space-y-0.5"
              role="listbox"
            >
              <li
                v-for="row in currentRows"
                :key="row.id"
              >
                <button
                  type="button"
                  class="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition hover:bg-heya-neutral-50"
                  @click="applyAndCloseFromRow(mode, row)"
                >
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium text-highlighted">
                      {{ row.title }}
                    </p>
                    <p class="truncate text-[11px] text-muted">
                      {{ rowHref(mode, row) }}
                    </p>
                  </div>
                </button>
              </li>
              <li
                v-if="!currentRows.length"
                class="py-8 text-center text-sm text-muted"
              >
                Aucun résultat
              </li>
            </ul>
            <div
              v-else
              class="space-y-2"
            >
              <USkeleton
                v-for="index in 4"
                :key="index"
                class="h-11 w-full rounded-md"
              />
            </div>
          </template>

          <template v-else>
            <UInput
              v-model="externalUrl"
              icon="i-lucide-link"
              size="sm"
              placeholder="https://exemple.com"
              autofocus
              @keydown.enter.prevent="applyLink"
            />
          </template>

          <div
            v-if="!hasTextSelection"
            class="mt-3"
          >
            <label class="mb-1 block text-[11px] font-medium text-muted">
              Texte affiché
            </label>
            <UInput
              v-model="linkText"
              size="sm"
              placeholder="Libellé dans le texte"
            />
          </div>
        </div>

        <div class="flex shrink-0 items-center justify-between gap-2 border-t border-default px-3 py-2.5">
          <UButton
            v-if="active || hrefDraft"
            label="Retirer"
            color="error"
            variant="ghost"
            size="xs"
            icon="i-lucide-unlink"
            @click="removeLink"
          />
          <span v-else />
          <UButton
            label="Appliquer"
            icon="i-lucide-check"
            size="sm"
            :disabled="!canApply"
            @click="applyLink"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
