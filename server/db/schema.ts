import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { contentStatuses, seoEntityTypes } from '../../shared/types/content'

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  status: text('status', { enum: contentStatuses }).notNull().default('draft'),
  contentMd: text('content_md').notNull().default(''),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
})

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  contentMd: text('content_md').notNull().default(''),
  coverPathname: text('cover_pathname'),
  category: text('category').notNull().default(''),
  status: text('status', { enum: contentStatuses }).notNull().default('draft'),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
})

export const seo = sqliteTable('seo', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  entityType: text('entity_type', { enum: seoEntityTypes }).notNull(),
  entityId: text('entity_id').notNull(),
  metaTitle: text('meta_title').notNull().default(''),
  metaDescription: text('meta_description').notNull().default(''),
  ogImage: text('og_image')
}, table => [
  uniqueIndex('seo_entity_unique').on(table.entityType, table.entityId)
])

export const blobs = sqliteTable('blobs', {
  pathname: text('pathname').primaryKey(),
  contentType: text('content_type').notNull(),
  size: integer('size').notNull(),
  alt: text('alt').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
})
