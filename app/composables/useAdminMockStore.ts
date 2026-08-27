import type { ContentStatus } from '#shared/types/content'
import type { CalendarContentType, CalendarItem } from '#shared/calendar'
import {
  contentEditPath,
  isCalendarItemDraggable,
  resolveCalendarAt
} from '#shared/calendar'
import type {
  AdminListRow,
  AdminPageInput,
  AdminPageRecord,
  AdminPostInput,
  AdminPostRecord,
  PaginatedResponse
} from '#shared/types/admin'
import { mockAdminPages, mockAdminPosts } from '#shared/fixtures/admin-content'

function toListRow(record: AdminPageRecord | AdminPostRecord): AdminListRow {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    status: record.status,
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt
  }
}

function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResponse<T> {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  return {
    data: items.slice(start, start + pageSize),
    meta: {
      pagination: { page, pageSize, pageCount, total }
    }
  }
}

function touch(record: { updatedAt: string }) {
  record.updatedAt = new Date().toISOString()
}

function toCalendarItem(
  record: AdminPageRecord | AdminPostRecord,
  contentType: CalendarContentType
): CalendarItem {
  return {
    id: record.id,
    contentType,
    title: record.title,
    status: record.status,
    calendarAt: resolveCalendarAt(record.status, record.scheduledAt, record.publishedAt),
    draggable: isCalendarItemDraggable(record.status),
    editPath: contentEditPath(contentType, record.id)
  }
}

export function useAdminMockStore() {
  const pages = useState<AdminPageRecord[]>('admin-mock-pages', () =>
    structuredClone(mockAdminPages)
  )
  const posts = useState<AdminPostRecord[]>('admin-mock-posts', () =>
    structuredClone(mockAdminPosts)
  )

  function listPages(page = 1, pageSize = 10): PaginatedResponse<AdminListRow> {
    const sorted = [...pages.value].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return paginate(sorted.map(toListRow), page, pageSize)
  }

  function listPosts(page = 1, pageSize = 10): PaginatedResponse<AdminListRow> {
    const sorted = [...posts.value].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return paginate(sorted.map(toListRow), page, pageSize)
  }

  function findPage(id: string) {
    return pages.value.find(page => page.id === id) ?? null
  }

  function findPost(id: string) {
    return posts.value.find(post => post.id === id) ?? null
  }

  function createPageDraft(): AdminPageRecord {
    const id = `page-${crypto.randomUUID().slice(0, 8)}`
    const created: AdminPageRecord = {
      id,
      slug: 'nouvelle-page',
      title: 'Nouvelle page',
      status: 'draft',
      contentMd: '',
      scheduledAt: null,
      publishedAt: null,
      updatedAt: new Date().toISOString(),
      seo: null
    }
    pages.value = [created, ...pages.value]
    return created
  }

  function createPostDraft(): AdminPostRecord {
    const id = `post-${crypto.randomUUID().slice(0, 8)}`
    const created: AdminPostRecord = {
      id,
      slug: 'nouvel-article',
      title: 'Nouvel article',
      excerpt: '',
      contentMd: '',
      coverPathname: null,
      category: 'Convivialité',
      status: 'draft',
      scheduledAt: null,
      publishedAt: null,
      updatedAt: new Date().toISOString(),
      seo: null
    }
    posts.value = [created, ...posts.value]
    return created
  }

  function updatePage(id: string, input: AdminPageInput) {
    const index = pages.value.findIndex(page => page.id === id)
    if (index < 0) {
      return null
    }
    const current = pages.value[index]!
    const updated: AdminPageRecord = {
      ...current,
      ...input,
      seo: input.seo,
      updatedAt: new Date().toISOString()
    }
    pages.value = pages.value.with(index, updated)
    return updated
  }

  function updatePost(id: string, input: AdminPostInput) {
    const index = posts.value.findIndex(post => post.id === id)
    if (index < 0) {
      return null
    }
    const current = posts.value[index]!
    const updated: AdminPostRecord = {
      ...current,
      ...input,
      seo: input.seo,
      updatedAt: new Date().toISOString()
    }
    posts.value = posts.value.with(index, updated)
    return updated
  }

  function setPageStatus(id: string, status: ContentStatus, dates?: { scheduledAt?: string | null, publishedAt?: string | null }) {
    const page = findPage(id)
    if (!page) {
      return null
    }
    page.status = status
    if (dates?.scheduledAt !== undefined) {
      page.scheduledAt = dates.scheduledAt
    }
    if (dates?.publishedAt !== undefined) {
      page.publishedAt = dates.publishedAt
    }
    if (status === 'published' && !page.publishedAt) {
      page.publishedAt = new Date().toISOString()
      page.scheduledAt = null
    }
    if (status === 'draft') {
      page.scheduledAt = null
    }
    touch(page)
    return page
  }

  function setPostStatus(id: string, status: ContentStatus, dates?: { scheduledAt?: string | null, publishedAt?: string | null }) {
    const post = findPost(id)
    if (!post) {
      return null
    }
    post.status = status
    if (dates?.scheduledAt !== undefined) {
      post.scheduledAt = dates.scheduledAt
    }
    if (dates?.publishedAt !== undefined) {
      post.publishedAt = dates.publishedAt
    }
    if (status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date().toISOString()
      post.scheduledAt = null
    }
    if (status === 'draft') {
      post.scheduledAt = null
    }
    touch(post)
    return post
  }

  function calendarItems(filters: {
    from: string
    to: string
    types: CalendarContentType[]
    includePublished: boolean
  }) {
    const { fromIso, toIso } = {
      fromIso: `${filters.from}T00:00:00.000Z`,
      toIso: `${filters.to}T23:59:59.999Z`
    }
    const from = new Date(fromIso)
    const to = new Date(toIso)

    const items: CalendarItem[] = []
    const backlog: CalendarItem[] = []

    const records: Array<{ record: AdminPageRecord | AdminPostRecord, type: CalendarContentType }> = []
    if (filters.types.includes('page')) {
      for (const page of pages.value) {
        records.push({ record: page, type: 'page' })
      }
    }
    if (filters.types.includes('post')) {
      for (const post of posts.value) {
        records.push({ record: post, type: 'post' })
      }
    }

    for (const { record, type } of records) {
      const item = toCalendarItem(record, type)

      if (record.status === 'draft' && !record.scheduledAt) {
        backlog.push(item)
        continue
      }

      if (record.status === 'published' && !filters.includePublished) {
        continue
      }

      if (!item.calendarAt) {
        continue
      }

      const at = new Date(item.calendarAt)
      if (at >= from && at <= to) {
        items.push(item)
      }
    }

    return {
      data: items.sort((a, b) => (a.calendarAt ?? '').localeCompare(b.calendarAt ?? '')),
      backlog: backlog.sort((a, b) => {
        const aUpdated = a.contentType === 'page'
          ? findPage(a.id)?.updatedAt
          : findPost(a.id)?.updatedAt
        const bUpdated = b.contentType === 'page'
          ? findPage(b.id)?.updatedAt
          : findPost(b.id)?.updatedAt
        return (bUpdated ?? '').localeCompare(aUpdated ?? '')
      })
    }
  }

  function reschedule(contentType: CalendarContentType, id: string, scheduledAt: string) {
    if (contentType === 'page') {
      return setPageStatus(id, 'scheduled', { scheduledAt })
    }
    return setPostStatus(id, 'scheduled', { scheduledAt })
  }

  return {
    pages,
    posts,
    listPages,
    listPosts,
    findPage,
    findPost,
    createPageDraft,
    createPostDraft,
    updatePage,
    updatePost,
    setPageStatus,
    setPostStatus,
    calendarItems,
    reschedule
  }
}
