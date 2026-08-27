import type { ContentStatus } from '#shared/types/content'

type StatusClock = {
  status: ContentStatus
  publishedAt: Date | null
}

export function statusTimestamps(
  status: ContentStatus,
  scheduledAt: Date | null | undefined,
  current?: StatusClock | null
): {
  status: ContentStatus
  publishedAt: Date | null
  scheduledAt: Date | null
} {
  switch (status) {
    case 'published':
      return {
        status,
        publishedAt: current?.status === 'published' && current.publishedAt
          ? current.publishedAt
          : new Date(),
        scheduledAt: null
      }
    case 'draft':
      return {
        status,
        publishedAt: null,
        scheduledAt: null
      }
    case 'scheduled':
      return {
        status,
        publishedAt: null,
        scheduledAt: scheduledAt ?? null
      }
    default: {
      const exhaustive: never = status
      throw new Error(`Statut inconnu: ${exhaustive}`)
    }
  }
}
