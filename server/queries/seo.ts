import { and, eq } from 'drizzle-orm'
import type { NewSeo, SeoPatch, SeoRow } from '#shared/types/db'
import type { SeoEntityType } from '#shared/types/content'
import { firstReturning } from './returning'

export async function findSeo(
  entityType: SeoEntityType,
  entityId: string
): Promise<SeoRow | null> {
  const row = await db.query.seo.findFirst({
    where: and(
      eq(schema.seo.entityType, entityType),
      eq(schema.seo.entityId, entityId)
    )
  })

  return row ?? null
}

export async function upsertSeo(
  entityType: SeoEntityType,
  entityId: string,
  values: SeoPatch
): Promise<SeoRow> {
  const existing = await findSeo(entityType, entityId)

  if (existing) {
    return firstReturning(await db
      .update(schema.seo)
      .set(values)
      .where(eq(schema.seo.id, existing.id))
      .returning())
  }

  const insert: NewSeo = {
    entityType,
    entityId,
    metaTitle: values.metaTitle ?? '',
    metaDescription: values.metaDescription ?? '',
    ogImage: values.ogImage ?? null
  }

  return firstReturning(await db.insert(schema.seo).values(insert).returning())
}

export async function deleteSeo(entityType: SeoEntityType, entityId: string) {
  await db.delete(schema.seo).where(and(
    eq(schema.seo.entityType, entityType),
    eq(schema.seo.entityId, entityId)
  ))
}
