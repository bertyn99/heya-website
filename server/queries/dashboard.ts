import { and, count, desc, eq, gte, isNull, lte, not, or, sql } from 'drizzle-orm'
import {
  calendarRangeBounds,
  contentEditPath,
  contentListPath,
  isoWeekRange,
  isCalendarItemDraggable,
  resolveCalendarAt,
  type CalendarContentType,
  type CalendarItem
} from '#shared/calendar'
import {
  DASHBOARD_CONTENT_LABELS,
  type DashboardBacklogItem,
  type DashboardHealthCounts,
  type DashboardLastPublished,
  type DashboardPipelineRow,
  type DashboardRecentItem,
  type DashboardSummary
} from '#shared/dashboard'

function toIso(date: Date | null | undefined): string | null {
  return date ? date.toISOString() : null
}

async function countByStatus(table: typeof schema.pages | typeof schema.posts) {
  const rows = await db
    .select({
      status: table.status,
      value: count()
    })
    .from(table)
    .groupBy(table.status)

  const totals = { draft: 0, scheduled: 0, published: 0 }
  for (const row of rows) {
    if (row.status === 'draft' || row.status === 'scheduled' || row.status === 'published') {
      totals[row.status] = Number(row.value)
    }
  }
  return totals
}

async function buildPipeline(): Promise<DashboardPipelineRow[]> {
  const [pages, posts] = await Promise.all([
    countByStatus(schema.pages),
    countByStatus(schema.posts)
  ])

  const data: Array<{ contentType: CalendarContentType, totals: typeof pages }> = [
    { contentType: 'page', totals: pages },
    { contentType: 'post', totals: posts }
  ]

  return data.map(({ contentType, totals }) => ({
    contentType,
    label: DASHBOARD_CONTENT_LABELS[contentType],
    listPath: contentListPath(contentType),
    draft: totals.draft,
    scheduled: totals.scheduled,
    published: totals.published
  }))
}

function mapCalendarRow(
  row: {
    id: string
    title: string
    status: 'draft' | 'published' | 'scheduled'
    scheduledAt: Date | null
    publishedAt: Date | null
  },
  contentType: CalendarContentType
): CalendarItem {
  const scheduledAt = toIso(row.scheduledAt)
  const publishedAt = toIso(row.publishedAt)

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

async function listWeekItems(week: { from: string, to: string }): Promise<CalendarItem[]> {
  const { fromIso, toIso } = calendarRangeBounds(week.from, week.to)
  const weekStart = new Date(fromIso)
  const weekEnd = new Date(toIso)

  const [pageRows, postRows] = await Promise.all([
    db.select({
      id: schema.pages.id,
      title: schema.pages.title,
      status: schema.pages.status,
      scheduledAt: schema.pages.scheduledAt,
      publishedAt: schema.pages.publishedAt
    })
      .from(schema.pages)
      .where(or(
        and(
          eq(schema.pages.status, 'scheduled'),
          gte(schema.pages.scheduledAt, weekStart),
          lte(schema.pages.scheduledAt, weekEnd)
        ),
        and(
          eq(schema.pages.status, 'published'),
          gte(schema.pages.publishedAt, weekStart),
          lte(schema.pages.publishedAt, weekEnd)
        )
      )),
    db.select({
      id: schema.posts.id,
      title: schema.posts.title,
      status: schema.posts.status,
      scheduledAt: schema.posts.scheduledAt,
      publishedAt: schema.posts.publishedAt
    })
      .from(schema.posts)
      .where(or(
        and(
          eq(schema.posts.status, 'scheduled'),
          gte(schema.posts.scheduledAt, weekStart),
          lte(schema.posts.scheduledAt, weekEnd)
        ),
        and(
          eq(schema.posts.status, 'published'),
          gte(schema.posts.publishedAt, weekStart),
          lte(schema.posts.publishedAt, weekEnd)
        )
      ))
  ])

  return [
    ...pageRows.map(row => mapCalendarRow(row, 'page')),
    ...postRows.map(row => mapCalendarRow(row, 'post'))
  ]
    .filter(item => item.calendarAt)
    .sort((a, b) => (a.calendarAt ?? '').localeCompare(b.calendarAt ?? ''))
}

async function listMergedBacklog(limit: number): Promise<DashboardBacklogItem[]> {
  const perType = Math.ceil(limit / 2)

  const [pageRows, postRows] = await Promise.all([
    db.select({
      id: schema.pages.id,
      title: schema.pages.title,
      status: schema.pages.status,
      scheduledAt: schema.pages.scheduledAt,
      publishedAt: schema.pages.publishedAt,
      updatedAt: schema.pages.updatedAt
    })
      .from(schema.pages)
      .where(and(
        eq(schema.pages.status, 'draft'),
        isNull(schema.pages.scheduledAt)
      ))
      .orderBy(desc(schema.pages.updatedAt))
      .limit(perType),
    db.select({
      id: schema.posts.id,
      title: schema.posts.title,
      status: schema.posts.status,
      scheduledAt: schema.posts.scheduledAt,
      publishedAt: schema.posts.publishedAt,
      updatedAt: schema.posts.updatedAt
    })
      .from(schema.posts)
      .where(and(
        eq(schema.posts.status, 'draft'),
        isNull(schema.posts.scheduledAt)
      ))
      .orderBy(desc(schema.posts.updatedAt))
      .limit(perType)
  ])

  const items: DashboardBacklogItem[] = [
    ...pageRows.map((row) => {
      const item = mapCalendarRow(row, 'page')
      return { ...item, updatedAt: row.updatedAt.toISOString() }
    }),
    ...postRows.map((row) => {
      const item = mapCalendarRow(row, 'post')
      return { ...item, updatedAt: row.updatedAt.toISOString() }
    })
  ]

  return items
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
}

async function listRecentlyUpdated(limit: number): Promise<DashboardRecentItem[]> {
  const perType = Math.ceil(limit / 2)

  const [pageRows, postRows] = await Promise.all([
    db.select({
      id: schema.pages.id,
      title: schema.pages.title,
      status: schema.pages.status,
      updatedAt: schema.pages.updatedAt
    })
      .from(schema.pages)
      .orderBy(desc(schema.pages.updatedAt))
      .limit(perType),
    db.select({
      id: schema.posts.id,
      title: schema.posts.title,
      status: schema.posts.status,
      updatedAt: schema.posts.updatedAt
    })
      .from(schema.posts)
      .orderBy(desc(schema.posts.updatedAt))
      .limit(perType)
  ])

  const items: DashboardRecentItem[] = [
    ...pageRows.map(row => ({
      id: row.id,
      contentType: 'page' as const,
      title: row.title,
      status: row.status,
      updatedAt: row.updatedAt.toISOString(),
      editPath: contentEditPath('page', row.id)
    })),
    ...postRows.map(row => ({
      id: row.id,
      contentType: 'post' as const,
      title: row.title,
      status: row.status,
      updatedAt: row.updatedAt.toISOString(),
      editPath: contentEditPath('post', row.id)
    }))
  ]

  return items
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
}

async function countPublishedPostsMissingCover(): Promise<number> {
  const row = await db
    .select({ value: count() })
    .from(schema.posts)
    .where(and(
      eq(schema.posts.status, 'published'),
      isNull(schema.posts.coverPathname)
    ))
    .get()

  return Number(row?.value ?? 0)
}

async function countPublishedMissingSeo(): Promise<number> {
  const emptyDescription = or(
    isNull(schema.seo.id),
    sql`trim(coalesce(${schema.seo.metaDescription}, '')) = ''`
  )

  const [pages, posts] = await Promise.all([
    db.select({ value: count() })
      .from(schema.pages)
      .leftJoin(schema.seo, and(
        eq(schema.seo.entityType, 'page'),
        eq(schema.seo.entityId, schema.pages.id)
      ))
      .where(and(
        eq(schema.pages.status, 'published'),
        emptyDescription
      ))
      .get(),
    db.select({ value: count() })
      .from(schema.posts)
      .leftJoin(schema.seo, and(
        eq(schema.seo.entityType, 'post'),
        eq(schema.seo.entityId, schema.posts.id)
      ))
      .where(and(
        eq(schema.posts.status, 'published'),
        emptyDescription
      ))
      .get()
  ])

  return Number(pages?.value ?? 0) + Number(posts?.value ?? 0)
}

async function countImagesMissingAlt(): Promise<number> {
  const row = await db
    .select({ value: count() })
    .from(schema.blobs)
    .where(sql`trim(coalesce(${schema.blobs.alt}, '')) = ''`)
    .get()

  return Number(row?.value ?? 0)
}

async function fetchHealth(): Promise<DashboardHealthCounts> {
  const [publishedPostsMissingCover, publishedMissingSeoDescription, imagesMissingAlt] = await Promise.all([
    countPublishedPostsMissingCover(),
    countPublishedMissingSeo(),
    countImagesMissingAlt()
  ])

  return { publishedPostsMissingCover, publishedMissingSeoDescription, imagesMissingAlt }
}

async function fetchLastPublished(): Promise<Partial<Record<CalendarContentType, DashboardLastPublished | null>>> {
  const [page, post] = await Promise.all([
    db.select({
      id: schema.pages.id,
      title: schema.pages.title,
      publishedAt: schema.pages.publishedAt
    })
      .from(schema.pages)
      .where(and(
        eq(schema.pages.status, 'published'),
        not(isNull(schema.pages.publishedAt))
      ))
      .orderBy(desc(schema.pages.publishedAt))
      .limit(1)
      .get(),
    db.select({
      id: schema.posts.id,
      title: schema.posts.title,
      publishedAt: schema.posts.publishedAt
    })
      .from(schema.posts)
      .where(and(
        eq(schema.posts.status, 'published'),
        not(isNull(schema.posts.publishedAt))
      ))
      .orderBy(desc(schema.posts.publishedAt))
      .limit(1)
      .get()
  ])

  return {
    page: page?.publishedAt
      ? {
          title: page.title,
          publishedAt: page.publishedAt.toISOString(),
          editPath: contentEditPath('page', page.id)
        }
      : null,
    post: post?.publishedAt
      ? {
          title: post.title,
          publishedAt: post.publishedAt.toISOString(),
          editPath: contentEditPath('post', post.id)
        }
      : null
  }
}

async function countMedia(): Promise<number> {
  const row = await db.select({ value: count() }).from(schema.blobs).get()
  return Number(row?.value ?? 0)
}

export async function buildDashboardSummary(): Promise<DashboardSummary> {
  const week = isoWeekRange()

  const [
    pipeline,
    media,
    thisWeek,
    backlog,
    recentlyUpdated,
    health,
    lastPublished
  ] = await Promise.all([
    buildPipeline(),
    countMedia(),
    listWeekItems(week),
    listMergedBacklog(10),
    listRecentlyUpdated(8),
    fetchHealth(),
    fetchLastPublished()
  ])

  return {
    week,
    pipeline,
    taxonomy: { media },
    thisWeek,
    backlog,
    recentlyUpdated,
    lastPublished,
    health
  }
}
