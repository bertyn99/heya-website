import { and, desc, eq, like, lte, or } from 'drizzle-orm'
import type { ContentListFilter, NewPost, PostPatch, PostRow, PostWithSeo } from '#shared/types/db'
import type { SeoInput } from '#shared/schemas/content'
import { deleteSeo, findSeo, upsertSeo } from './seo'
import { firstReturning } from './returning'

function matchSearch(q: string) {
  const term = `%${q}%`
  return or(
    like(schema.posts.title, term),
    like(schema.posts.slug, term),
    like(schema.posts.category, term)
  )
}

export async function listPosts(filters: ContentListFilter): Promise<PostRow[]> {
  let query = db.select().from(schema.posts).$dynamic()
  const conditions = []

  if (filters.status) {
    conditions.push(eq(schema.posts.status, filters.status))
  }

  if (filters.q) {
    conditions.push(matchSearch(filters.q))
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions))
  }

  return query
    .orderBy(desc(schema.posts.updatedAt))
    .limit(filters.limit)
}

export async function listPublishedPosts(limit = 50): Promise<PostRow[]> {
  return db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.status, 'published'))
    .orderBy(desc(schema.posts.publishedAt))
    .limit(limit)
}

export async function findPostById(id: string): Promise<PostRow | null> {
  const row = await db.query.posts.findFirst({
    where: eq(schema.posts.id, id)
  })

  return row ?? null
}

export async function findPostBySlug(slug: string): Promise<PostRow | null> {
  const row = await db.query.posts.findFirst({
    where: eq(schema.posts.slug, slug)
  })

  return row ?? null
}

export async function getPostWithSeo(id: string): Promise<PostWithSeo | null> {
  const post = await findPostById(id)

  if (!post) {
    return null
  }

  const seo = await findSeo('post', post.id)
  return { ...post, seo }
}

export async function getPublishedPostBySlug(slug: string): Promise<PostWithSeo | null> {
  const post = await findPostBySlug(slug)

  if (!post || post.status !== 'published') {
    return null
  }

  const seo = await findSeo('post', post.id)
  return { ...post, seo }
}

export async function insertPost(values: NewPost, seo?: SeoInput): Promise<PostWithSeo> {
  const created = firstReturning(await db.insert(schema.posts).values(values).returning())

  const seoRow = seo
    ? await upsertSeo('post', created.id, seo)
    : null

  return { ...created, seo: seoRow }
}

export async function updatePost(
  id: string,
  values: PostPatch,
  seo?: SeoInput
): Promise<PostWithSeo | null> {
  const [updated] = await db
    .update(schema.posts)
    .set(values)
    .where(eq(schema.posts.id, id))
    .returning()

  if (!updated) {
    return null
  }

  const seoRow = seo
    ? await upsertSeo('post', updated.id, seo)
    : await findSeo('post', updated.id)

  return { ...updated, seo: seoRow }
}

export async function deletePost(id: string): Promise<PostRow | null> {
  await deleteSeo('post', id)

  const [deleted] = await db
    .delete(schema.posts)
    .where(eq(schema.posts.id, id))
    .returning()

  return deleted ?? null
}

export async function publishDuePosts(now = new Date()): Promise<string[]> {
  const due = await db
    .update(schema.posts)
    .set({
      status: 'published',
      publishedAt: now,
      scheduledAt: null
    })
    .where(and(
      eq(schema.posts.status, 'scheduled'),
      lte(schema.posts.scheduledAt, now)
    ))
    .returning({ id: schema.posts.id })

  return due.map(row => row.id)
}
