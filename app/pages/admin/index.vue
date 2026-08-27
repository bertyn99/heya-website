<script setup lang="ts">
import type { DashboardSummary } from '#shared/dashboard'
import { apiErrorMessage } from '~/utils/api-error'

definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const { loggedIn } = useUserSession()
const router = useRouter()
const toast = useToast()
const { createPageDraft, createPostDraft } = useAdminContentApi()
const creating = ref<'page' | 'post' | null>(null)

async function createDraft(kind: 'page' | 'post') {
  creating.value = kind
  try {
    const created = kind === 'page'
      ? await createPageDraft()
      : await createPostDraft()
    await router.push(kind === 'page' ? `/admin/pages/${created.id}` : `/admin/blog/${created.id}`)
  } catch (error) {
    toast.add({
      title: 'Création impossible',
      description: apiErrorMessage(error),
      color: 'error'
    })
  } finally {
    creating.value = null
  }
}

const todayLabel = computed(() =>
  new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
)

const { data: dashboard, status, refresh } = useAsyncData(
  'admin-dashboard',
  () => $fetch<DashboardSummary>('/api/admin/dashboard'),
  { server: false }
)

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })
</script>

<template>
  <AppDashboardPanel id="home">
    <template #header>
      <AppDashboardNavbar title="Tableau de bord">
        <template #right>
          <div class="flex flex-wrap items-center gap-2">
            <UButton
              size="sm"
              icon="i-lucide-plus"
              label="Article"
              class="max-sm:hidden"
              :loading="creating === 'post'"
              @click="createDraft('post')"
            />
            <UButton
              size="sm"
              color="neutral"
              variant="soft"
              icon="i-lucide-plus"
              label="Page"
              class="max-sm:hidden"
              :loading="creating === 'page'"
              @click="createDraft('page')"
            />
            <UButton
              size="sm"
              icon="i-lucide-plus"
              aria-label="Nouvel article"
              class="sm:hidden"
              :loading="creating === 'post'"
              @click="createDraft('post')"
            />
          </div>
        </template>
      </AppDashboardNavbar>
    </template>

    <template #body>
      <div
        v-if="status === 'pending' && !dashboard"
        class="space-y-4"
      >
        <USkeleton class="h-8 w-64" />
        <div class="grid gap-4 lg:grid-cols-2">
          <USkeleton class="h-48 w-full" />
          <USkeleton class="h-48 w-full" />
        </div>
      </div>

      <template v-else-if="dashboard">
        <div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm text-muted capitalize">
              {{ todayLabel }}
            </p>
            <p class="text-lg font-semibold text-highlighted">
              Heya Convivialité
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <UButton
              icon="i-lucide-newspaper"
              label="Nouvel article"
              size="sm"
              :loading="creating === 'post'"
              @click="createDraft('post')"
            />
            <UButton
              icon="i-lucide-file-text"
              label="Nouvelle page"
              size="sm"
              color="neutral"
              variant="soft"
              :loading="creating === 'page'"
              @click="createDraft('page')"
            />
            <UButton
              to="/admin/planning"
              icon="i-lucide-calendar-days"
              label="Planning"
              size="sm"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div class="min-w-0 space-y-6">
            <DashboardPipelineTable :rows="dashboard.pipeline" />

            <div class="grid gap-6 lg:grid-cols-2">
              <DashboardWeekSchedule
                :week="dashboard.week"
                :items="dashboard.thisWeek"
              />
              <DashboardBacklogList :items="dashboard.backlog" />
            </div>

            <DashboardRecentTable :items="dashboard.recentlyUpdated" />
          </div>

          <aside class="min-w-0 xl:sticky xl:top-4 xl:self-start">
            <DashboardSidebarPanels
              :taxonomy="dashboard.taxonomy"
              :health="dashboard.health"
              :last-published="dashboard.lastPublished"
            />
          </aside>
        </div>
      </template>

      <UAlert
        v-else
        color="error"
        title="Tableau de bord indisponible"
        description="Impossible de charger les indicateurs. Réessayez après connexion."
        class="max-w-lg"
      />
    </template>
  </AppDashboardPanel>
</template>
