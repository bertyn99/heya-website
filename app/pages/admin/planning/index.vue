<script setup lang="ts">
import type { CalendarContentType } from '#shared/calendar'
import { CALENDAR_CONTENT_TYPES, CALENDAR_TYPE_OPTIONS } from '#shared/calendar'

definePageMeta({
  layout: 'admin',
  auth: 'user'
})

const router = useRouter()

const {
  placeholder,
  filters,
  itemsByDay,
  backlog,
  rescheduling,
  findItem,
  rescheduleItem
} = usePublishingCalendar()

const selectedTypes = computed({
  get: () => filters.types,
  set: (value: CalendarContentType[]) => {
    filters.types = value.length > 0 ? value : [...CALENDAR_CONTENT_TYPES]
  }
})

function openItem(item: { editPath: string }) {
  router.push(item.editPath)
}

function handleReschedule(payload: { key: string, dayKey: string }) {
  const item = findItem(payload.key)
  if (!item?.draggable) {
    return
  }
  void rescheduleItem(item, payload.dayKey)
}
</script>

<template>
  <AppDashboardPanel id="planning">
    <template #header>
      <AppDashboardNavbar title="Planning" />
    </template>

    <template #body>
      <div class="mb-4 flex flex-wrap items-end gap-3">
        <UFormField
          label="Types de contenu"
          class="min-w-48"
        >
          <USelectMenu
            v-model="selectedTypes"
            :items="CALENDAR_TYPE_OPTIONS"
            value-key="value"
            label-key="label"
            multiple
            placeholder="Tous les types"
            class="w-full min-w-56"
          />
        </UFormField>

        <UFormField
          label="Affichage"
          class="min-w-48"
        >
          <USwitch
            v-model="filters.includePublished"
            label="Inclure les contenus publiés"
          />
        </UFormField>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1fr_minmax(16rem,20rem)]">
        <AdminPlanningPublishingCalendar
          v-model:placeholder="placeholder"
          :items-by-day="itemsByDay"
          :loading="rescheduling"
          @open="openItem"
          @reschedule="handleReschedule"
        />

        <AdminPlanningCalendarBacklog
          :items="backlog"
          @open="openItem"
        />
      </div>
    </template>
  </AppDashboardPanel>
</template>
