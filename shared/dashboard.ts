import type { CalendarContentType, CalendarItem } from './calendar'

export interface DashboardPipelineRow {
  contentType: CalendarContentType
  label: string
  listPath: string
  draft: number
  scheduled: number
  published: number
}

export interface DashboardBacklogItem extends CalendarItem {
  updatedAt: string
}

export interface DashboardRecentItem {
  id: string
  contentType: CalendarContentType
  title: string
  status: CalendarItem['status']
  updatedAt: string
  editPath: string
}

export interface DashboardLastPublished {
  title: string
  publishedAt: string
  editPath: string
}

export interface DashboardHealthCounts {
  publishedPostsMissingCover: number
  publishedMissingSeoDescription: number
  imagesMissingAlt: number
}

export interface DashboardSummary {
  week: { from: string, to: string }
  pipeline: DashboardPipelineRow[]
  taxonomy: {
    media: number
  }
  thisWeek: CalendarItem[]
  backlog: DashboardBacklogItem[]
  recentlyUpdated: DashboardRecentItem[]
  lastPublished: Partial<Record<CalendarContentType, DashboardLastPublished | null>>
  health: DashboardHealthCounts
}

export const DASHBOARD_CONTENT_LABELS: Record<CalendarContentType, string> = {
  page: 'Pages',
  post: 'Articles'
}

export const DASHBOARD_STATUS_LABELS: Record<CalendarItem['status'], string> = {
  draft: 'Brouillon',
  scheduled: 'Programmé',
  published: 'Publié'
}
