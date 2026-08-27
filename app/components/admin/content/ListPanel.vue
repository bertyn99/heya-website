<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { AdminListRow } from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { DASHBOARD_TABLE_UI } from '~/utils/dashboard-shell'
import { contentStatusBadgeColor, contentStatusLabel } from '~/utils/content-status'
import { refDebounced } from '@vueuse/core'
import { apiErrorMessage } from '~/utils/api-error'
import { ADMIN_LIST_LIMIT, mapAdminListRow, type AdminPageApi } from '~/utils/admin-mappers'

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
const toast = useToast()
const { loggedIn } = useUserSession()
const { createPageDraft, createPostDraft } = useAdminContentApi()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const basePath = computed(() => props.contentType === 'page' ? '/admin/pages' : '/admin/blog')
const listUrl = computed(() => props.contentType === 'page' ? '/api/admin/pages' : '/api/admin/posts')

const search = ref('')
const q = refDebounced(search, 300)
const statusFilter = ref<'all' | ContentStatus>('all')
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const creating = ref(false)

const query = computed(() => ({
  ...(q.value.trim() ? { q: q.value.trim() } : {}),
  ...(statusFilter.value !== 'all' ? { status: statusFilter.value } : {}),
  limit: ADMIN_LIST_LIMIT
}))

const { data, status, error, refresh } = useFetch<AdminPageApi[]>(listUrl, {
  query,
  server: false,
  default: () => []
})

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })

const allRows = computed(() => (data.value ?? []).map(mapAdminListRow))

const pagedRows = computed(() => {
  const start = pagination.value.pageIndex * pagination.value.pageSize
  return allRows.value.slice(start, start + pagination.value.pageSize)
})

async function createDraft() {
  creating.value = true
  try {
    const created = props.contentType === 'page'
      ? await createPageDraft()
      : await createPostDraft()
    await router.push(`${basePath.value}/${created.id}`)
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

watch([q, statusFilter], () => {
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
            :loading="creating"
            @click="createDraft"
          />
        </template>
      </AppDashboardNavbar>
    </template>

    <template #body>
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
          v-model:pagination="pagination"
          class="mt-4 shrink-0"
          :data="pagedRows"
          :columns="columns"
          :ui="DASHBOARD_TABLE_UI"
        />

        <div class="mt-4 flex items-center justify-between gap-3 pt-2">
          <p class="text-sm text-muted">
            {{ allRows.length }} élément(s)
          </p>

          <UPagination
            :default-page="pagination.pageIndex + 1"
            :items-per-page="pagination.pageSize"
            :total="allRows.length"
            @update:page="(p: number) => { pagination.pageIndex = p - 1 }"
          />
        </div>
      </template>
    </template>
  </AppDashboardPanel>
</template>
