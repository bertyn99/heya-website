import type { CalendarContentType, CalendarItem } from '#shared/calendar'
import {
  contentEditPath,
  isCalendarItemDraggable,
  resolveCalendarAt
} from '#shared/calendar'
import type {
  AdminListRow,
  AdminPageRecord,
  AdminPostRecord,
  AdminSeoRecord
} from '#shared/types/admin'
import type { ContentStatus } from '#shared/types/content'
import { toIsoString } from './serialize-date'

export const ADMIN_LIST_LIMIT = 100

export type AdminSeoApi = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: string | null
}

export type AdminPageApi = {
  id: string
  slug: string
  title: string
  status: ContentStatus
  contentMd: string
  parentId?: string | null
  scheduledAt?: unknown
  publishedAt?: unknown
  updatedAt?: unknown
  seo?: AdminSeoApi | null
}

export type AdminPostApi = AdminPageApi & {
  excerpt: string
  coverPathname?: string | null
  category: string
}

function mapSeo(seo: AdminSeoApi | null | undefined): AdminSeoRecord | null {
  if (!seo) {
    return null
  }

  return {
    metaTitle: seo.metaTitle ?? '',
    metaDescription: seo.metaDescription ?? '',
    ogImage: seo.ogImage ?? null
  }
}

export function mapAdminListRow(row: AdminPageApi): AdminListRow {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    parentId: row.parentId ?? null,
    publishedAt: toIsoString(row.publishedAt),
    updatedAt: toIsoString(row.updatedAt) ?? new Date(0).toISOString()
  }
}

export function mapAdminPage(row: AdminPageApi): AdminPageRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    contentMd: row.contentMd ?? '',
    parentId: row.parentId ?? null,
    scheduledAt: toIsoString(row.scheduledAt),
    publishedAt: toIsoString(row.publishedAt),
    updatedAt: toIsoString(row.updatedAt) ?? new Date(0).toISOString(),
    seo: mapSeo(row.seo)
  }
}

export function mapAdminPost(row: AdminPostApi): AdminPostRecord {
  return {
    ...mapAdminPage(row),
    excerpt: row.excerpt ?? '',
    coverPathname: row.coverPathname ?? null,
    category: row.category ?? ''
  }
}

export function toCalendarItem(
  row: Pick<AdminPageApi, 'id' | 'title' | 'status' | 'scheduledAt' | 'publishedAt'>,
  contentType: CalendarContentType
): CalendarItem {
  const scheduledAt = toIsoString(row.scheduledAt)
  const publishedAt = toIsoString(row.publishedAt)

  return {
    id: row.id,
    contentType,
    title: row.title,
    status: row.status,
    calendarAt: resolveCalendarAt(row.status, scheduledAt, publishedAt),
    draggable: isCalendarItemDraggable(row.status),
    editPath: contentEditPath(contentType, row.id)
  }
}
