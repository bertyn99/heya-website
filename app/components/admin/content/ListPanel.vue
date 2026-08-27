<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { AdminListRow } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { DASHBOARD_TABLE_UI } from '~/utils/dashboard-shell'
import { contentStatusBadgeColor, contentStatusLabel } from '~/utils/content-status'

const props = withDefaults(defineProps<{
  title: string
  panelId: string
  contentType: 'page' | 'post'
  createLabel?: string
  showSlugColumn?: boolean
}>(), {
  showSlugColumn: true
})

const router = useRouter()
const store = useAdminMockStore()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const basePath = computed(() => props.contentType === 'page' ? '/admin/pages' : '/admin/blog')

const search = ref('')
const statusFilter = ref<'all' | ContentStatus>('all')
const pagination = ref({ pageIndex: 0, pageSize: 10 })

const listData = computed(() =>
  props.contentType === 'page'
    ? store.listPages(pagination.value.pageIndex + 1, pagination.value.pageSize)
    : store.listPosts(pagination.value.pageIndex + 1, pagination.value.pageSize)
)

const rows = computed(() => {
  let items = listData.value.data

  if (search.value) {
    const q = search.value.toLowerCase()
    items = items.filter(item =>
      item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q)
    )
  }

  if (statusFilter.value !== 'all') {
    items = items.filter(item => item.status === statusFilter.value)
  }

  return items
})

function createDraft() {
  const created = props.contentType === 'page'
    ? store.createPageDraft()
    : store.createPostDraft()
  router.push(`${basePath.value}/${created.id}`)
}

const columns = computed<TableColumn<AdminListRow>[]>(() => {
  const cols: TableColumn<AdminListRow>[] = [
    { accessorKey: 'title', header: 'Titre' }
  ]
  if (props.showSlugColumn) {
    cols.push({ accessorKey: 'slug', header: 'Slug' })
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
        onClick: () => router.push(`${basePath.value}/${row.original.id}`)
      })
    }
  )
  return cols
})

watch([search, statusFilter], () => {
  pagination.value.pageIndex = 0
})
</script>

<template>
  <AppDashboardPanel :id="panelId">
    <template #header>
      <AppDashboardNavbar :title="title">
        <template #right>
          <UButton
            :label="createLabel ?? 'Nouveau'"
            icon="i-lucide-plus"
            @click="createDraft"
          />
        </template>
      </AppDashboardNavbar>
    </template>

    <template #body>
      <UAlert
        color="info"
        variant="subtle"
        icon="i-lucide-flask-conical"
        title="Données de démonstration"
        description="Cette liste utilise des fixtures locales. Le branchement API viendra à l'étape suivante."
        class="mb-2"
      />

      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="search"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="Rechercher..."
        />

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

      <UTable
        v-model:pagination="pagination"
        class="mt-4 shrink-0"
        :data="rows"
        :columns="columns"
        :ui="DASHBOARD_TABLE_UI"
      />

      <div class="mt-4 flex items-center justify-between gap-3 pt-2">
        <p class="text-sm text-muted">
          {{ listData.meta.pagination.total }} élément(s) au total
        </p>

        <UPagination
          :default-page="pagination.pageIndex + 1"
          :items-per-page="pagination.pageSize"
          :total="listData.meta.pagination.total"
          @update:page="(p: number) => { pagination.pageIndex = p - 1 }"
        />
      </div>
    </template>
  </AppDashboardPanel>
</template>
