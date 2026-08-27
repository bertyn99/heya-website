<script setup lang="ts">
import { mockPageBlockTypes } from '#shared/fixtures/admin-content'
import { DASHBOARD_SURFACE_CLASS } from '~/utils/dashboard-shell'

defineProps<{
  contentMd: string
}>()
</script>

<template>
  <AdminContentEditorSection
    label="blocks"
    anchor="section-blocks"
    description="Le page builder Comark arrive à l'étape suivante. Aperçu des blocs disponibles."
  >
    <div class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="block in mockPageBlockTypes"
        :key="block.type"
        :class="[DASHBOARD_SURFACE_CLASS, 'flex items-center gap-3 p-3']"
      >
        <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UIcon :name="block.icon" class="size-4" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-highlighted">
            {{ block.label }}
          </p>
          <p class="text-xs text-muted">
            ::{{ block.type }}
          </p>
        </div>
      </div>
    </div>

    <AdminContentEditorSurface class="mt-4">
      <div class="mb-2 flex items-center justify-between gap-2">
        <p class="text-sm font-medium text-highlighted">
          Markdown Comark (aperçu)
        </p>
        <UButton
          to="/admin/preview/comark"
          size="xs"
          color="neutral"
          variant="soft"
          icon="i-lucide-eye"
          label="Aperçu"
        />
      </div>
      <pre class="max-h-64 overflow-auto rounded-lg bg-heya-neutral-50 p-3 text-xs text-muted">{{ contentMd || '—' }}</pre>
    </AdminContentEditorSurface>
  </AdminContentEditorSection>
</template>
