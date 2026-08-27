import { and, desc, eq, like, lte, or } from 'drizzle-orm'
import type { ContentListFilter, NewPage, PagePatch, PageRow, PageWithSeo } from '#shared/types/db'
import type { SeoInput } from '#shared/schemas/content'
import { deleteSeo, findSeo, upsertSeo } from './seo'
import { firstReturning } from './returning'

function matchSearch(q: string) {
  const term = `%${q}%`
  return or(
    like(schema.pages.title, term),
    like(schema.pages.slug, term)
  )
}

export async function listPages(filters: ContentListFilter): Promise<PageRow[]> {
  let query = db.select().from(schema.pages).$dynamic()
  const conditions = []

  if (filters.status) {
    conditions.push(eq(schema.pages.status, filters.status))
  }

  if (filters.q) {
    conditions.push(matchSearch(filters.q))
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions))
  }

  return query
    .orderBy(desc(schema.pages.updatedAt))
    .limit(filters.limit)
}

export async function findPageById(id: string): Promise<PageRow | null> {
  const row = await db.query.pages.findFirst({
    where: eq(schema.pages.id, id)
  })

  return row ?? null
}

export async function findPageBySlug(slug: string): Promise<PageRow | null> {
  const row = await db.query.pages.findFirst({
    where: eq(schema.pages.slug, slug)
  })

  return row ?? null
}

export async function getPageWithSeo(id: string): Promise<PageWithSeo | null> {
  const page = await findPageById(id)

  if (!page) {
    return null
  }

  const seo = await findSeo('page', page.id)
  return { ...page, seo }
}

export async function getPublishedPageBySlug(slug: string): Promise<PageWithSeo | null> {
  const page = await findPageBySlug(slug)

  if (!page || page.status !== 'published') {
    return null
  }

  const seo = await findSeo('page', page.id)
  return { ...page, seo }
}

export async function insertPage(values: NewPage, seo?: SeoInput): Promise<PageWithSeo> {
  const created = firstReturning(await db.insert(schema.pages).values(values).returning())

  const seoRow = seo
    ? await upsertSeo('page', created.id, seo)
    : null

  return { ...created, seo: seoRow }
}

export async function updatePage(
  id: string,
  values: PagePatch,
  seo?: SeoInput
): Promise<PageWithSeo | null> {
  const [updated] = await db
    .update(schema.pages)
    .set(values)
    .where(eq(schema.pages.id, id))
    .returning()

  if (!updated) {
    return null
  }

  const seoRow = seo
    ? await upsertSeo('page', updated.id, seo)
    : await findSeo('page', updated.id)

  return { ...updated, seo: seoRow }
}

export async function deletePage(id: string): Promise<PageRow | null> {
  await deleteSeo('page', id)

  const [deleted] = await db
    .delete(schema.pages)
    .where(eq(schema.pages.id, id))
    .returning()

  return deleted ?? null
}

export async function publishDuePages(now = new Date()): Promise<string[]> {
  const due = await db
    .update(schema.pages)
    .set({
      status: 'published',
      publishedAt: now,
      scheduledAt: null
    })
    .where(and(
      eq(schema.pages.status, 'scheduled'),
      lte(schema.pages.scheduledAt, now)
    ))
    .returning({ id: schema.pages.id })

  return due.map(row => row.id)
}
