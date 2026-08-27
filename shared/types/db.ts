import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import type { blobs, pages, posts, seo } from '~~/server/db/schema'

export type PageRow = InferSelectModel<typeof pages>
export type NewPage = InferInsertModel<typeof pages>
export type PagePatch = Partial<Omit<NewPage, 'id'>>

export type PostRow = InferSelectModel<typeof posts>
export type NewPost = InferInsertModel<typeof posts>
export type PostPatch = Partial<Omit<NewPost, 'id'>>

export type SeoRow = InferSelectModel<typeof seo>
export type NewSeo = InferInsertModel<typeof seo>
export type SeoPatch = Partial<Omit<NewSeo, 'id' | 'entityType' | 'entityId'>>

export type BlobRow = InferSelectModel<typeof blobs>
export type NewBlob = InferInsertModel<typeof blobs>
export type BlobPatch = Partial<Omit<NewBlob, 'pathname' | 'createdAt'>>

export type PageWithSeo = PageRow & { seo: SeoRow | null }
export type PostWithSeo = PostRow & { seo: SeoRow | null }

export type ContentListFilter = {
  status?: PageRow['status']
  q?: string
  limit: number
}
