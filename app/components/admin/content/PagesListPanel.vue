<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { AdminListRow } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import {
  orderPagesAsTree,
  pageHierarchyLabel,
  type PageTreeRow
} from '#shared/page-hierarchy'
import { DASHBOARD_TABLE_UI } from '~/utils/dashboard-shell'
import { contentStatusBadgeColor, contentStatusLabel } from '~/utils/content-status'
import { apiErrorMessage } from '~/utils/api-error'
import { ADMIN_LIST_LIMIT, mapAdminListRow, type AdminPageApi } from '~/utils/admin-mappers'

type ViewMode = 'tree' | 'flat'

const TREE_STEP_PX = 18
const TREE_ROW_H_PX = 32
const TREE_ICON_W_PX = 20

const router = useRouter()
const toast = useToast()
const { loggedIn } = useUserSession()
const { createPageDraft } = useAdminContentApi()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const search = ref('')
const statusFilter = ref<'all' | ContentStatus>('all')
const viewMode = ref<ViewMode>('tree')
const creating = ref(false)

const { data, status, error, refresh } = useFetch<AdminPageApi[]>('/api/admin/pages', {
  query: { limit: ADMIN_LIST_LIMIT },
  server: false,
  default: () => []
})

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })

const allRows = computed(() => (data.value ?? []).map(mapAdminListRow))

const pagesById = computed(() => {
  const map = new Map<string, AdminListRow>()
  for (const page of allRows.value) {
    map.set(page.id, page)
  }
  return map
})

function directParentLabel(row: PageTreeRow<AdminListRow>): string | null {
  if (row.parentId == null) {
    return null
  }
  const parent = pagesById.value.get(row.parentId)
  return parent ? pageHierarchyLabel(parent) : null
}

const treeRows = computed(() => orderPagesAsTree(allRows.value))

const filteredRows = computed(() => {
  let items: PageTreeRow<AdminListRow>[] = treeRows.value

  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    items = items.filter((row) => {
      const label = pageHierarchyLabel(row).toLowerCase()
      return (
        label.includes(q)
        || row.slug.toLowerCase().includes(q)
        || row.publicPath.toLowerCase().includes(q)
        || row.filiation.toLowerCase().includes(q)
      )
    })
  }

  if (statusFilter.value !== 'all') {
    items = items.filter(row => row.status === statusFilter.value)
  }

  return items
})

function treeGuideContinues(
  rows: PageTreeRow<AdminListRow>[],
  rowIndex: number,
  level: number
): boolean {
  for (let i = rowIndex + 1; i < rows.length; i++) {
    const nextDepth = rows[i]!.depth
    if (nextDepth <= level) {
      return nextDepth === level
    }
  }
  return false
}

function treeGutterGeometry(
  depth: number,
  rowIndex: number,
  rows: PageTreeRow<AdminListRow>[]
): { width: number, spine: string, branch: string } {
  if (depth === 0) {
    return { width: TREE_ICON_W_PX, spine: '', branch: '' }
  }

  const width = depth * TREE_STEP_PX + TREE_ICON_W_PX
  const yMid = TREE_ROW_H_PX / 2
  const spine: string[] = []
  const branch: string[] = []

  for (let level = 0; level < depth; level++) {
    const x = level * TREE_STEP_PX + TREE_STEP_PX / 2
    const continuesBelow = treeGuideContinues(rows, rowIndex, level)

    if (level < depth - 1) {
      if (continuesBelow) {
        spine.push(`M ${x} 0 V ${TREE_ROW_H_PX}`)
      }
      continue
    }

    spine.push(`M ${x} 0 V ${yMid}`)
    if (continuesBelow) {
      spine.push(`M ${x} ${yMid} V ${TREE_ROW_H_PX}`)
    }
    branch.push(`M ${x} ${yMid} H ${depth * TREE_STEP_PX + (TREE_ICON_W_PX - 16) / 2}`)
  }

  return {
    width,
    spine: spine.join(' '),
    branch: branch.join(' ')
  }
}

function treeGutterForRow(row: PageTreeRow<AdminListRow>) {
  const rowIndex = titleRowIndex(row)
  return treeGutterGeometry(row.depth, rowIndex, filteredRows.value)
}

function depthBadgeLabel(depth: number): string {
  return `Niveau ${depth}`
}

function titleDepthClass(depth: number): string {
  if (depth === 0) {
    return 'text-sm font-semibold text-highlighted'
  }
  if (depth === 1) {
    return 'text-sm font-medium text-highlighted'
  }
  return 'text-sm font-normal text-toned'
}

function treeRowIcon(depth: number, hasChildren: boolean): string {
  if (hasChildren) {
    return 'i-lucide-folder'
  }
  return depth === 0 ? 'i-lucide-home' : 'i-lucide-file-text'
}

function rowHasDescendantInView(
  rows: PageTreeRow<AdminListRow>[],
  rowIndex: number
): boolean {
  const depth = rows[rowIndex]?.depth ?? 0
  const next = rows[rowIndex + 1]
  return next != null && next.depth > depth
}

function titleRowIndex(row: PageTreeRow<AdminListRow>): number {
  return filteredRows.value.findIndex(item => item.id === row.id)
}

const viewItems = [
  { label: 'Arborescence', value: 'tree' as const, icon: 'i-lucide-list-tree' },
  { label: 'Liste', value: 'flat' as const, icon: 'i-lucide-rows-3' }
]

const tableMeta = computed(() => {
  if (viewMode.value !== 'tree') {
    return undefined
  }

  return {
    class: {
      tr: (row: { original: PageTreeRow<AdminListRow> }) => {
        const depth = row.original.depth
        if (depth === 1) {
          return 'bg-elevated/10'
        }
        if (depth >= 2) {
          return 'bg-elevated/20'
        }
        return ''
      }
    }
  }
})

const tableUi = computed(() => ({
  ...DASHBOARD_TABLE_UI,
  base: 'w-full border-separate border-spacing-0',
  td: `${DASHBOARD_TABLE_UI.td} align-top whitespace-normal`
}))

const columns = computed((): TableColumn<PageTreeRow<AdminListRow>>[] => {
  const cols: TableColumn<PageTreeRow<AdminListRow>>[] = [
    {
      accessorKey: 'title',
      header: 'Page',
      meta: {
        class: {
          td: 'min-w-[min(100%,20rem)] w-[42%] !py-3'
        }
      }
    },
    {
      accessorKey: 'publicPath',
      header: 'Chemin public',
      meta: {
        class: {
          td: 'min-w-[12rem] w-[28%] !py-3'
        }
      }
    }
  ]

  if (viewMode.value === 'flat') {
    cols.push({
      accessorKey: 'filiation',
      header: 'Filiation',
      cell: ({ row }) => h(
        'p',
        {
          class: [
            'truncate text-xs',
            row.original.depth === 0 && row.original.filiation === 'Page racine'
              ? 'text-muted italic'
              : 'text-toned'
          ]
        },
        row.original.filiation
      )
    })
  }

  cols.push(
    {
      accessorKey: 'status',
      header: 'Statut',
      cell: ({ row }) => h(UBadge, {
        class: 'capitalize',
        variant: 'subtle',
        color: contentStatusBadgeColor(row.original.status)
      }, () => contentStatusLabel(row.original.status))
    },
    {
      accessorKey: 'updatedAt',
      header: 'Modifié',
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString('fr-FR')
    },
    {
      id: 'actions',
      cell: ({ row }) => h(UButton, {
        icon: 'i-lucide-pencil',
        color: 'neutral',
        variant: 'ghost',
        size: 'sm',
        'aria-label': `Modifier ${pageHierarchyLabel(row.original)}`,
        onClick: () => router.push(`/admin/pages/${row.original.id}`)
      })
    }
  )

  return cols
})

async function createDraft() {
  creating.value = true
  try {
    const created = await createPageDraft()
    await router.push(`/admin/pages/${created.id}`)
  } catch (createError) {
    toast.add({
      title: 'Création impossible',
      description: apiErrorMessage(createError),
      color: 'error'
    })
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <AppDashboardPanel id="pages">
    <template #header>
      <AppDashboardNavbar title="Pages">
        <template #right>
          <UButton
            label="Nouvelle page"
            icon="i-lucide-plus"
            :loading="creating"
            @click="createDraft"
          />
        </template>
      </AppDashboardNavbar>
    </template>

    <template #body>
      <p class="mb-4 max-w-3xl text-sm leading-relaxed text-muted">
        L'arborescence suit le parent enregistré. Le slug est le dernier segment ; le chemin public
        se calcule avec les ancêtres.
      </p>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <UInput
          v-model="search"
          class="max-w-sm min-w-[12rem] flex-1"
          icon="i-lucide-search"
          placeholder="Titre, slug, chemin ou parent…"
        />

        <div class="flex flex-wrap items-center gap-2">
          <UFieldGroup
            size="sm"
            orientation="horizontal"
          >
            <UButton
              v-for="item in viewItems"
              :key="item.value"
              :icon="item.icon"
              :label="item.label"
              :color="viewMode === item.value ? 'primary' : 'neutral'"
              :variant="viewMode === item.value ? 'soft' : 'ghost'"
              @click="viewMode = item.value"
            />
          </UFieldGroup>

          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Tous', value: 'all' },
              { label: 'Brouillon', value: 'draft' },
              { label: 'Publié', value: 'published' },
              { label: 'Planifié', value: 'scheduled' }
            ]"
            class="min-w-36"
          />
        </div>
      </div>

      <div
        v-if="status === 'pending' && allRows.length === 0"
        class="mt-4 space-y-2"
      >
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        class="mt-4"
        title="Liste indisponible"
        :description="apiErrorMessage(error)"
      />

      <template v-else>
        <UTable
          class="mt-4 shrink-0"
          :data="filteredRows"
          :columns="columns"
          :meta="tableMeta"
          :loading="status === 'pending'"
          :get-row-id="row => String(row.id)"
          :ui="tableUi"
          :caption="viewMode === 'tree' ? 'Arborescence des pages du site' : 'Liste des pages du site'"
        >
          <template #title-cell="{ row }">
            <div class="min-w-0">
              <div
                class="flex min-w-0 items-start"
                :class="viewMode === 'tree' ? 'gap-2.5' : 'gap-2'"
              >
                <div
                  v-if="viewMode === 'tree'"
                  class="relative flex shrink-0 items-center"
                  :style="{
                    width: row.original.depth > 0
                      ? `${treeGutterForRow(row.original).width}px`
                      : `${TREE_ICON_W_PX}px`,
                    height: `${TREE_ROW_H_PX}px`
                  }"
                  aria-hidden="true"
                >
                  <svg
                    v-if="row.original.depth > 0"
                    class="absolute inset-0 overflow-visible text-border"
                    :width="treeGutterForRow(row.original).width"
                    :height="TREE_ROW_H_PX"
                    role="presentation"
                  >
                    <path
                      v-if="treeGutterForRow(row.original).spine"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      :d="treeGutterForRow(row.original).spine"
                    />
                    <path
                      v-if="treeGutterForRow(row.original).branch"
                      class="text-primary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-opacity="0.55"
                      :d="treeGutterForRow(row.original).branch"
                    />
                  </svg>
                  <UIcon
                    :name="treeRowIcon(
                      row.original.depth,
                      rowHasDescendantInView(filteredRows, titleRowIndex(row.original))
                    )"
                    class="absolute top-1/2 size-4 shrink-0 -translate-y-1/2 text-muted"
                    :class="row.original.depth === 0 ? 'start-0 text-toned' : ''"
                    :style="row.original.depth > 0
                      ? { left: `${row.original.depth * TREE_STEP_PX + (TREE_ICON_W_PX - 16) / 2}px` }
                      : undefined"
                  />
                </div>

                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex min-w-0 flex-nowrap items-center gap-2">
                    <UBadge
                      v-if="viewMode === 'tree' && row.original.depth > 0"
                      size="xs"
                      variant="outline"
                      :color="row.original.depth === 1 ? 'primary' : 'neutral'"
                      class="shrink-0 font-normal tabular-nums"
                    >
                      {{ depthBadgeLabel(row.original.depth) }}
                    </UBadge>
                    <p
                      :class="[
                        'min-w-0 flex-1 truncate',
                        viewMode === 'tree'
                          ? titleDepthClass(row.original.depth)
                          : 'text-sm font-medium text-highlighted'
                      ]"
                      :title="pageHierarchyLabel(row.original)"
                    >
                      <span
                        v-if="viewMode === 'tree' && row.original.depth > 0"
                        class="sr-only"
                      >
                        {{ depthBadgeLabel(row.original.depth) }},
                      </span>
                      {{ pageHierarchyLabel(row.original) }}
                    </p>
                  </div>
                  <p
                    v-if="viewMode === 'tree' && directParentLabel(row.original)"
                    class="text-[11px] leading-snug text-muted"
                  >
                    Sous
                    <span class="text-toned">{{ directParentLabel(row.original) }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template #publicPath-cell="{ row }">
            <code
              class="block break-all font-mono text-[11px] leading-relaxed text-muted"
              :title="row.original.publicPath"
            >
              {{ row.original.publicPath }}
            </code>
          </template>
        </UTable>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-default/60 pt-3">
          <p class="text-sm text-muted">
            {{ filteredRows.length }} page(s) affichée(s)
            <span v-if="allRows.length !== filteredRows.length">
              sur {{ allRows.length }} au total
            </span>
          </p>

          <UButton
            icon="i-lucide-refresh-cw"
            label="Actualiser"
            color="neutral"
            variant="ghost"
            size="sm"
            :loading="status === 'pending'"
            @click="refresh()"
          />
        </div>
      </template>
    </template>
  </AppDashboardPanel>
</template>
