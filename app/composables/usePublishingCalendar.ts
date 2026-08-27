import { CalendarDate } from '@internationalized/date'
import type { CalendarContentType, CalendarItem } from '#shared/calendar'
import {
  CALENDAR_TIME_ZONE,
  DEFAULT_PUBLISH_HOUR,
  calendarDayKeyFromIso,
  groupCalendarItemsByDay,
  monthRangeFromParts,
  parseCalendarTypesParam
} from '#shared/calendar'
import {
  ADMIN_LIST_LIMIT,
  toCalendarItem,
  type AdminPageApi,
  type AdminPostApi
} from '~/utils/admin-mappers'
import { apiErrorMessage } from '~/utils/api-error'
import { scheduledAtIsoForDay } from '~/utils/calendar-schedule'

export interface CalendarFilters {
  types: CalendarContentType[]
  includePublished: boolean
}

export function usePublishingCalendar() {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  const { updateContentStatus } = useAdminContentApi()

  const placeholder = shallowRef(new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  ))

  const filters = reactive<CalendarFilters>({
    types: [...parseCalendarTypesParam(undefined)],
    includePublished: true
  })

  const { data: pages, refresh: refreshPages } = useFetch<AdminPageApi[]>('/api/admin/pages', {
    query: { limit: ADMIN_LIST_LIMIT },
    server: false,
    default: () => []
  })

  const { data: posts, refresh: refreshPosts } = useFetch<AdminPostApi[]>('/api/admin/posts', {
    query: { limit: ADMIN_LIST_LIMIT },
    server: false,
    default: () => []
  })

  watch(loggedIn, (value) => {
    if (value) {
      void refreshPages()
      void refreshPosts()
    }
  }, { immediate: true })

  const monthRange = computed(() =>
    monthRangeFromParts(placeholder.value.year, placeholder.value.month)
  )

  const catalog = computed(() => {
    const records: CalendarItem[] = []
    const backlogItems: CalendarItem[] = []

    if (filters.types.includes('page')) {
      for (const page of pages.value ?? []) {
        const item = toCalendarItem(page, 'page')
        if (page.status === 'draft' && !page.scheduledAt) {
          backlogItems.push(item)
        } else {
          records.push(item)
        }
      }
    }

    if (filters.types.includes('post')) {
      for (const post of posts.value ?? []) {
        const item = toCalendarItem(post, 'post')
        if (post.status === 'draft' && !post.scheduledAt) {
          backlogItems.push(item)
        } else {
          records.push(item)
        }
      }
    }

    const { from, to } = monthRange.value

    const data = records.filter((item) => {
      if (item.status === 'published' && !filters.includePublished) {
        return false
      }
      if (!item.calendarAt) {
        return false
      }
      const dayKey = calendarDayKeyFromIso(item.calendarAt)
      return dayKey >= from && dayKey <= to
    }).sort((a, b) => (a.calendarAt ?? '').localeCompare(b.calendarAt ?? ''))

    const updatedAt = (item: CalendarItem) => {
      if (item.contentType === 'page') {
        return pages.value?.find(row => row.id === item.id)?.updatedAt
      }
      return posts.value?.find(row => row.id === item.id)?.updatedAt
    }

    return {
      data,
      backlog: backlogItems.sort((a, b) =>
        String(updatedAt(b) ?? '').localeCompare(String(updatedAt(a) ?? ''))
      )
    }
  })

  const items = computed(() => catalog.value.data)
  const backlog = computed(() => catalog.value.backlog)
  const itemsByDay = computed(() => groupCalendarItemsByDay(items.value))

  const rescheduling = ref(false)

  function itemKey(item: CalendarItem): string {
    return `${item.contentType}:${item.id}`
  }

  function findItem(key: string): CalendarItem | undefined {
    return [...items.value, ...backlog.value].find(entry => itemKey(entry) === key)
  }

  async function rescheduleItem(item: CalendarItem, dayKey: string) {
    if (!item.draggable) {
      toast.add({
        title: 'Publication figée',
        description: 'La date d\'un contenu déjà publié ne peut pas être modifiée ici.',
        color: 'warning'
      })
      return
    }

    const scheduledAt = scheduledAtIsoForDay(dayKey)
    rescheduling.value = true

    try {
      await updateContentStatus(item.contentType, item.id, {
        action: 'schedule',
        scheduledAt: new Date(scheduledAt)
      })
      await Promise.all([refreshPages(), refreshPosts()])
      const scheduledDate = new Date(scheduledAt)
      toast.add({
        title: 'Publication planifiée',
        description: `Prévu le ${scheduledDate.toLocaleDateString('fr-FR', { timeZone: CALENDAR_TIME_ZONE })} à ${DEFAULT_PUBLISH_HOUR}h`,
        color: 'success'
      })
    } catch (error) {
      toast.add({
        title: 'Erreur',
        description: apiErrorMessage(error, 'Impossible de replanifier ce contenu.'),
        color: 'error'
      })
    } finally {
      rescheduling.value = false
    }
  }

  return {
    placeholder,
    filters,
    items,
    backlog,
    itemsByDay,
    rescheduling,
    itemKey,
    findItem,
    rescheduleItem
  }
}
