import { desc, eq, like, or } from 'drizzle-orm'
import type { MediaListQuery } from '#shared/schemas/media'
import type { BlobPatch, BlobRow, NewBlob } from '#shared/types/db'
import { firstReturning } from './returning'

export async function listBlobs(filters: MediaListQuery): Promise<BlobRow[]> {
  let query = db.select().from(schema.blobs).$dynamic()

  if (filters.q) {
    const term = `%${filters.q}%`
    query = query.where(or(
      like(schema.blobs.pathname, term),
      like(schema.blobs.alt, term)
    ))
  }

  return query
    .orderBy(desc(schema.blobs.createdAt))
    .limit(filters.limit)
}

export async function findBlob(pathname: string): Promise<BlobRow | null> {
  const row = await db.query.blobs.findFirst({
    where: eq(schema.blobs.pathname, pathname)
  })

  return row ?? null
}

export async function insertBlob(values: NewBlob): Promise<BlobRow> {
  return firstReturning(await db.insert(schema.blobs).values(values).returning())
}

export async function updateBlob(pathname: string, values: BlobPatch): Promise<BlobRow | null> {
  const [updated] = await db
    .update(schema.blobs)
    .set(values)
    .where(eq(schema.blobs.pathname, pathname))
    .returning()

  return updated ?? null
}

export async function deleteBlob(pathname: string): Promise<BlobRow | null> {
  const [deleted] = await db
    .delete(schema.blobs)
    .where(eq(schema.blobs.pathname, pathname))
    .returning()

  return deleted ?? null
}
