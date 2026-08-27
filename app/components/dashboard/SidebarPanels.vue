<script setup lang="ts">
import type { CalendarContentType } from '#shared/calendar'
import type { DashboardHealthCounts, DashboardSummary } from '#shared/dashboard'
import { DASHBOARD_SURFACE_CLASS } from '~/utils/dashboard-shell'

defineProps<{
  taxonomy: DashboardSummary['taxonomy']
  health: DashboardHealthCounts
  lastPublished: DashboardSummary['lastPublished']
}>()

const config = useRuntimeConfig()

function relativePublished(iso: string) {
  const date = new Date(iso)
  const diff = Date.now() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) {
    return 'aujourd\'hui'
  }
  if (days === 1) {
    return 'hier'
  }
  return `il y a ${days} j`
}

function typeLabel(contentType: CalendarContentType) {
  return contentType === 'page' ? 'Page' : 'Article'
}
</script>

<template>
  <div class="space-y-4">
    <section :class="[DASHBOARD_SURFACE_CLASS, 'p-4']">
      <h2 class="text-sm font-semibold text-highlighted">
        À corriger
      </h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li class="flex items-center justify-between gap-2">
          <span class="text-muted">Articles publiés sans couverture</span>
          <UBadge :color="health.publishedPostsMissingCover ? 'warning' : 'success'" variant="subtle">
            {{ health.publishedPostsMissingCover }}
          </UBadge>
        </li>
        <li class="flex items-center justify-between gap-2">
          <span class="text-muted">Publiés sans meta description</span>
          <UBadge :color="health.publishedMissingSeoDescription ? 'warning' : 'success'" variant="subtle">
            {{ health.publishedMissingSeoDescription }}
          </UBadge>
        </li>
        <li class="flex items-center justify-between gap-2">
          <NuxtLink to="/admin/media" class="text-muted hover:text-primary">
            Images sans texte alternatif
          </NuxtLink>
          <UBadge :color="health.imagesMissingAlt ? 'warning' : 'success'" variant="subtle">
            {{ health.imagesMissingAlt }}
          </UBadge>
        </li>
      </ul>
    </section>

    <section :class="[DASHBOARD_SURFACE_CLASS, 'p-4']">
      <h2 class="text-sm font-semibold text-highlighted">
        Médias
      </h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li class="flex justify-between gap-2">
          <NuxtLink to="/admin/media" class="text-muted hover:text-primary">
            Fichiers médiathèque
          </NuxtLink>
          <span class="tabular-nums text-highlighted">{{ taxonomy.media }}</span>
        </li>
      </ul>
    </section>

    <section
      v-if="lastPublished?.page || lastPublished?.post"
      :class="[DASHBOARD_SURFACE_CLASS, 'p-4']"
    >
      <h2 class="text-sm font-semibold text-highlighted">
        Dernières publications
      </h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li v-if="lastPublished?.post">
          <NuxtLink :to="lastPublished.post.editPath" class="block hover:text-primary">
            <span class="text-muted">{{ typeLabel('post') }} · </span>
            <span class="text-highlighted">{{ lastPublished.post.title }}</span>
            <span class="text-muted"> — {{ relativePublished(lastPublished.post.publishedAt) }}</span>
          </NuxtLink>
        </li>
        <li v-if="lastPublished?.page">
          <NuxtLink :to="lastPublished.page.editPath" class="block hover:text-primary">
            <span class="text-muted">{{ typeLabel('page') }} · </span>
            <span class="text-highlighted">{{ lastPublished.page.title }}</span>
            <span class="text-muted"> — {{ relativePublished(lastPublished.page.publishedAt) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <UButton
      :to="config.public.siteUrl"
      target="_blank"
      color="neutral"
      variant="outline"
      block
      icon="i-lucide-external-link"
      label="Voir le site public"
    />
  </div>
</template>
