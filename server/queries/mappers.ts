import type { ContentAction } from '#shared/schemas/content'
import type { PageRow, PostRow } from '#shared/types/db'
import { statusTimestamps } from '../utils/status-timestamps'

export function actionToStatusFields(action: ContentAction) {
  switch (action.action) {
    case 'publish':
      return statusTimestamps('published', null)
    case 'unpublish':
      return statusTimestamps('draft', null)
    case 'schedule':
      return statusTimestamps('scheduled', action.scheduledAt)
    default: {
      const exhaustive: never = action
      throw new Error(`Action inconnue: ${JSON.stringify(exhaustive)}`)
    }
  }
}

export function toPageInsert(
  input: {
    title: string
    slug: string
    status: PageRow['status']
    contentMd: string
    scheduledAt?: Date | null
  },
  current?: Pick<PageRow, 'status' | 'publishedAt'> | null
) {
  return {
    title: input.title,
    slug: input.slug,
    contentMd: input.contentMd,
    ...statusTimestamps(input.status, input.scheduledAt, current)
  }
}

export function toPostInsert(
  input: {
    title: string
    slug: string
    excerpt: string
    contentMd: string
    coverPathname?: string | null
    category: string
    status: PostRow['status']
    scheduledAt?: Date | null
  },
  current?: Pick<PostRow, 'status' | 'publishedAt'> | null
) {
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    contentMd: input.contentMd,
    coverPathname: input.coverPathname ?? null,
    category: input.category,
    ...statusTimestamps(input.status, input.scheduledAt, current)
  }
}
