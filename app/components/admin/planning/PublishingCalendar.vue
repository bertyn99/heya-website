<script setup lang="ts">
import type { CalendarDate, DateValue } from '@internationalized/date'
import type { CalendarItem } from '#shared/calendar'
import { calendarDayKeyFromParts } from '#shared/calendar'

const props = defineProps<{
  itemsByDay: Map<string, CalendarItem[]>
  loading?: boolean
}>()

const placeholder = defineModel<CalendarDate>('placeholder', { required: true })

const emit = defineEmits<{
  reschedule: [payload: { key: string, dayKey: string }]
  open: [item: CalendarItem]
}>()

const dragItemKey = ref<string | null>(null)
const dropTargetDay = ref<string | null>(null)

const maxVisibleEvents = 3

function asCalendarDate(day: DateValue): CalendarDate {
  return day as CalendarDate
}

function dayKey(day: DateValue): string {
  const value = asCalendarDate(day)
  return calendarDayKeyFromParts(value.year, value.month, value.day)
}

function eventsForDay(day: DateValue): CalendarItem[] {
  return props.itemsByDay.get(dayKey(day)) ?? []
}

function resolveDragKey(event: DragEvent): string | null {
  return event.dataTransfer?.getData('application/x-cms-calendar-item')
    || event.dataTransfer?.getData('text/plain')
    || dragItemKey.value
}

function onDragOver(day: DateValue, event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  dropTargetDay.value = dayKey(day)
}

function onDragLeave(day: DateValue) {
  if (dropTargetDay.value === dayKey(day)) {
    dropTargetDay.value = null
  }
}

function onDrop(day: DateValue, event: DragEvent) {
  event.preventDefault()
  const key = resolveDragKey(event)
  dropTargetDay.value = null
  dragItemKey.value = null

  if (!key) {
    return
  }

  emit('reschedule', { key, dayKey: dayKey(day) })
}
</script>

<template>
  <UPageCard title="Calendrier" :ui="{ body: 'p-0 sm:p-0' }">
    <div class="border-b border-default px-4 py-3">
      <p class="text-sm text-muted">
        Glissez les contenus <strong>planifiés</strong> ou les brouillons du panneau latéral.
        Les contenus <strong>publiés</strong> restent visibles mais ne peuvent pas être déplacés.
      </p>
    </div>

    <div class="relative p-2 sm:p-4" :class="loading ? 'opacity-60' : ''">
      <UCalendar
        v-model:placeholder="placeholder"
        :view-control="false"
        :week-starts-on="1"
        locale="fr-FR"
        class="w-full"
        :ui="{
          grid: 'w-full',
          gridRow: 'grid-cols-7 gap-px',
          cell: 'min-h-0 p-0',
          cellTrigger: [
            'h-auto min-h-[7.5rem] w-full flex-col items-stretch justify-start rounded-md border border-transparent p-1 text-left font-normal',
            'data-[outside-view]:opacity-40 data-[selected]:bg-transparent data-[selected]:text-default',
            'hover:bg-elevated/40'
          ].join(' ')
        }"
      >
        <template #day="{ day }">
          <div
            class="flex h-full min-h-[7rem] w-full flex-col gap-1"
            :class="dropTargetDay === dayKey(day) ? 'rounded-md ring-2 ring-primary/40' : ''"
            @dragover="onDragOver(day, $event)"
            @dragleave="onDragLeave(day)"
            @drop="onDrop(day, $event)"
          >
            <span class="text-xs font-semibold text-muted tabular-nums">
              {{ day.day }}
            </span>

            <div class="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <AdminPlanningCalendarEventCard
                v-for="item in eventsForDay(day).slice(0, maxVisibleEvents)"
                :key="`${item.contentType}:${item.id}`"
                compact
                :item="item"
                @open="emit('open', $event)"
              />

              <button
                v-if="eventsForDay(day).length > maxVisibleEvents"
                type="button"
                class="text-left text-[10px] text-primary hover:underline"
                @click.stop
              >
                +{{ eventsForDay(day).length - maxVisibleEvents }} de plus
              </button>
            </div>
          </div>
        </template>
      </UCalendar>
    </div>
  </UPageCard>
</template>
