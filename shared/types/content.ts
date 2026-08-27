export const contentStatuses = ['draft', 'published', 'scheduled'] as const

export type ContentStatus = (typeof contentStatuses)[number]

export const seoEntityTypes = ['page', 'post'] as const

export type SeoEntityType = (typeof seoEntityTypes)[number]
