<script setup lang="ts">
import type { ContentStatus } from '#shared/types/content'
import type { CalendarContentType } from '#shared/calendar'
import { CALENDAR_TIME_ZONE, DEFAULT_PUBLISH_HOUR } from '#shared/calendar'
import { scheduledAtIsoForDay } from '~/utils/calendar-schedule'
import { apiErrorMessage } from '~/utils/api-error'
import { toIsoString } from '~/utils/serialize-date'
import type { AdminPageApi, AdminPostApi } from '~/utils/admin-mappers'

const props = defineProps<{
  contentType: CalendarContentType
  contentId?: string
  status: ContentStatus
  onSave: (options?: { silent?: boolean }) => Promise<boolean>
}>()

const emit = defineEmits<{
  'update:status': [status: ContentStatus, scheduledAt?: string | null]
  'committed': [row: AdminPageApi | AdminPostApi]
}>()

const toast = useToast()
const { updateContentStatus } = useAdminContentApi()

const publishing = ref(false)
const scheduling = ref(false)
const unpublishing = ref(false)
const scheduleOpen = ref(false)

const isPublished = computed(() => props.status === 'published')
const showActions = computed(() => Boolean(props.contentId))

async function applyStatus(action: 'publish' | 'unpublish' | 'schedule', scheduledAt?: string) {
  if (!props.contentId) {
    return
  }

  const body = action === 'schedule'
    ? { action: 'schedule' as const, scheduledAt: new Date(scheduledAt!) }
    : { action }

  const updated = await updateContentStatus(props.contentType, props.contentId, body)
  emit(
    'update:status',
    updated.status,
    toIsoString(updated.scheduledAt) ?? scheduledAt ?? null
  )
  emit('committed', updated)
}

async function onPublishNow() {
  publishing.value = true
  try {
    const saved = await props.onSave({ silent: true })
    if (!saved) {
      return
    }
    await applyStatus('publish')
    toast.add({ title: 'Publié', description: 'Le contenu est en ligne.', color: 'success' })
  } catch (error) {
    toast.add({
      title: 'Publication impossible',
      description: apiErrorMessage(error),
      color: 'error'
    })
  } finally {
    publishing.value = false
  }
}

async function onUnpublish() {
  unpublishing.value = true
  try {
    await applyStatus('unpublish')
    toast.add({ title: 'Dépublié', description: 'Le contenu est repassé en brouillon.', color: 'warning' })
  } catch (error) {
    toast.add({
      title: 'Dépublication impossible',
      description: apiErrorMessage(error),
      color: 'error'
    })
  } finally {
    unpublishing.value = false
  }
}

async function onConfirmSchedule(dayKey: string) {
  scheduling.value = true
  try {
    const saved = await props.onSave({ silent: true })
    if (!saved) {
      return
    }
    const scheduledAt = scheduledAtIsoForDay(dayKey)
    await applyStatus('schedule', scheduledAt)
    scheduleOpen.value = false
    const date = new Date(scheduledAt)
    toast.add({
      title: 'Publication planifiée',
      description: `Prévu le ${date.toLocaleDateString('fr-FR', { timeZone: CALENDAR_TIME_ZONE })} à ${DEFAULT_PUBLISH_HOUR}h`,
      color: 'success'
    })
  } catch (error) {
    toast.add({
      title: 'Planification impossible',
      description: apiErrorMessage(error),
      color: 'error'
    })
  } finally {
    scheduling.value = false
  }
}

</script>

<template>
  <div
    v-if="showActions"
    class="contents"
  >
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
      class="inline-flex items-stretch overflow-hidden rounded-full shadow-sm ring-1 ring-success/35"
    >
      <UButton
        type="button"
        icon="i-lucide-send"
        label="Publier"
        color="success"
        variant="solid"
        :loading="publishing"
        :disabled="scheduling"
        :ui="{ base: 'rounded-none shadow-none' }"
        @click="onPublishNow"
      />

      <UPopover
        v-model:open="scheduleOpen"
        :content="{ side: 'bottom', align: 'end' }"
        :ui="{ content: 'p-0' }"
      >
        <UButton
          type="button"
          icon="i-lucide-calendar-clock"
          color="success"
          variant="soft"
          square
          aria-label="Planifier la publication"
          title="Planifier la publication"
          :loading="scheduling"
          :disabled="publishing"
          :ui="{ base: 'rounded-none shadow-none ring-0 border-s border-success/25' }"
        />

        <template #content>
          <AdminContentSchedulePublicationPicker
            v-if="scheduleOpen"
            :loading="scheduling"
            @confirm="onConfirmSchedule"
            @cancel="scheduleOpen = false"
          />
        </template>
      </UPopover>
    </div>
  </div>
</template>
