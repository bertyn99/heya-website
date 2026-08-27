<script setup lang="ts">
import type { ContentStatus } from '#shared/types/content'
import type { CalendarContentType } from '#shared/calendar'
import { CALENDAR_TIME_ZONE, DEFAULT_PUBLISH_HOUR } from '#shared/calendar'
import { scheduledAtIsoForDay } from '~/composables/useMockPublishingCalendar'

const props = defineProps<{
  contentType: CalendarContentType
  contentId?: string
  status: ContentStatus
  onSave: () => Promise<boolean>
}>()

const emit = defineEmits<{
  'update:status': [status: ContentStatus]
}>()

const toast = useToast()
const store = useAdminMockStore()

const publishing = ref(false)
const scheduling = ref(false)
const unpublishing = ref(false)
const scheduleOpen = ref(false)

const isPublished = computed(() => props.status === 'published')
const showActions = computed(() => Boolean(props.contentId))

async function applyStatus(status: ContentStatus, scheduledAt?: string | null) {
  if (!props.contentId) {
    return
  }
  if (props.contentType === 'page') {
    store.setPageStatus(props.contentId, status, { scheduledAt })
  } else {
    store.setPostStatus(props.contentId, status, { scheduledAt })
  }
  emit('update:status', status)
}

async function onPublishNow() {
  publishing.value = true
  try {
    const saved = await props.onSave()
    if (!saved) {
      return
    }
    await applyStatus('published')
    toast.add({ title: 'Publié', description: 'Le contenu est en ligne.', color: 'success' })
  } finally {
    publishing.value = false
  }
}

async function onUnpublish() {
  unpublishing.value = true
  try {
    await applyStatus('draft')
    toast.add({ title: 'Dépublié', description: 'Le contenu est repassé en brouillon.', color: 'warning' })
  } finally {
    unpublishing.value = false
  }
}

async function onConfirmSchedule(dayKey: string) {
  scheduling.value = true
  try {
    const saved = await props.onSave()
    if (!saved) {
      return
    }
    const scheduledAt = scheduledAtIsoForDay(dayKey)
    await applyStatus('scheduled', scheduledAt)
    scheduleOpen.value = false
    const date = new Date(scheduledAt)
    toast.add({
      title: 'Publication planifiée',
      description: `Prévu le ${date.toLocaleDateString('fr-FR', { timeZone: CALENDAR_TIME_ZONE })} à ${DEFAULT_PUBLISH_HOUR}h`,
      color: 'success'
    })
  } finally {
    scheduling.value = false
  }
}

const todayKey = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
})
</script>

<template>
  <div v-if="showActions" class="contents">
    <UButton
      v-if="isPublished"
      type="button"
      icon="i-lucide-eye-off"
      label="Dépublier"
      color="warning"
      variant="outline"
      :loading="unpublishing"
      @click="onUnpublish"
    />

    <div
      v-else
      class="inline-flex items-stretch shadow-sm"
    >
      <UButton
        type="button"
        icon="i-lucide-send"
        label="Publier"
        color="success"
        variant="solid"
        :loading="publishing"
        :disabled="scheduling"
        class="rounded-r-none"
        @click="onPublishNow"
      />

      <UPopover
        v-model:open="scheduleOpen"
        :content="{ side: 'bottom', align: 'end' }"
        :ui="{ content: 'p-4 w-72' }"
      >
        <UButton
          type="button"
          icon="i-lucide-calendar-clock"
          color="success"
          variant="outline"
          square
          aria-label="Planifier la publication"
          :loading="scheduling"
          :disabled="publishing"
          class="rounded-l-none -ml-px"
        />

        <template #content>
          <p class="mb-3 text-sm font-medium text-highlighted">
            Planifier à 9h (Paris)
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              size="sm"
              color="neutral"
              variant="soft"
              label="Demain"
              @click="onConfirmSchedule(todayKey)"
            />
          </div>
          <p class="mt-2 text-xs text-muted">
            Glissez aussi le contenu sur le calendrier dans Planning.
          </p>
        </template>
      </UPopover>
    </div>
  </div>
</template>
