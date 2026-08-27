<script setup lang="ts">
import { mockPageBlockTypes } from '#shared/fixtures/admin-content'
import { DASHBOARD_SURFACE_CLASS } from '~/utils/dashboard-shell'

const contentMd = defineModel<string>('contentMd', { default: '' })
</script>

<template>
  <AdminContentEditorSection
    label="blocks"
    anchor="section-blocks"
    description="Le page builder Comark arrive à l'étape suivante. Éditez le markdown Comark en attendant."
  >
    <div class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="block in mockPageBlockTypes"
        :key="block.type"
        :class="[DASHBOARD_SURFACE_CLASS, 'flex items-center gap-3 p-3']"
      >
        <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UIcon
            :name="block.icon"
            class="size-4"
          />
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
          Markdown Comark
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
      <UTextarea
        v-model="contentMd"
        :rows="12"
        autoresize
        placeholder="::hero&#10;---&#10;{&#10;  &quot;title&quot;: &quot;…&quot;&#10;}&#10;---&#10;::"
        class="font-mono text-sm"
      />
    </AdminContentEditorSurface>
  </AdminContentEditorSection>
</template>
