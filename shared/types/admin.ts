import type { ContentStatus } from '../types/content'
import type { SeoInput } from '../schemas/content'

export interface AdminSeoRecord {
  metaTitle: string
  metaDescription: string
  ogImage: string | null
}

export interface AdminPageRecord {
  id: string
  slug: string
  title: string
  status: ContentStatus
  contentMd: string
  parentId: string | null
  scheduledAt: string | null
  publishedAt: string | null
  updatedAt: string
  seo: AdminSeoRecord | null
}

export interface AdminPostRecord {
  id: string
  slug: string
  title: string
  excerpt: string
  contentMd: string
  coverPathname: string | null
  category: string
  status: ContentStatus
  scheduledAt: string | null
  publishedAt: string | null
  updatedAt: string
  seo: AdminSeoRecord | null
}

export interface AdminListRow {
  id: string
  title: string
  slug: string
  status: ContentStatus
  parentId?: string | null
  publishedAt: string | null
  updatedAt: string
}

export interface PaginatedMeta {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { pagination: PaginatedMeta }
}

export interface EditorNavSection {
  id: string
  label: string
}

export type AdminPageInput = {
  title: string
  slug: string
  status: ContentStatus
  contentMd: string
  parentId: string | null
  scheduledAt: string | null
  seo: SeoInput | null
}

export type AdminPostInput = {
  title: string
  slug: string
  excerpt: string
  contentMd: string
  coverPathname: string | null
  category: string
  status: ContentStatus
  scheduledAt: string | null
  seo: SeoInput | null
}
