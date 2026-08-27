import { contentStatuses, seoEntityTypes, type ContentStatus } from '../types/content'
import * as z from 'zod'

export const contentStatusSchema = z.enum(contentStatuses)

export const seoEntityTypeSchema = z.enum(seoEntityTypes)

const slugSegment = '[a-z0-9]+(?:-[a-z0-9]+)*'

export const slugSchema = z
  .string()
  .trim()
  .min(1, 'Le slug est requis')
  .max(120, '120 caractères maximum')
  .regex(
    new RegExp(`^${slugSegment}$`),
    'Slug invalide (minuscules et tirets uniquement)'
  )

export const pageSlugSchema = z
  .string()
  .trim()
  .min(1, 'Le slug est requis')
  .max(120, '120 caractères maximum')
  .regex(
    new RegExp(`^${slugSegment}(?:/${slugSegment})*$`),
    'Slug invalide (segments en minuscules, tirets et / uniquement)'
  )

export const seoSchema = z.object({
  metaTitle: z.string().trim().max(70, '70 caractères maximum').default(''),
  metaDescription: z.string().trim().max(160, '160 caractères maximum').default(''),
  ogImage: z
    .union([z.string().trim().url('URL invalide'), z.literal(''), z.null()])
    .optional()
    .transform(value => value || null)
})

function requireScheduleWhenScheduled(
  data: { status: ContentStatus, scheduledAt?: Date | null },
  ctx: z.RefinementCtx
) {
  if (data.status === 'scheduled' && !data.scheduledAt) {
    ctx.addIssue({
      code: 'custom',
      path: ['scheduledAt'],
      message: 'Indiquez une date de publication'
    })
  }
}

export const contentListQuerySchema = z.object({
  status: contentStatusSchema.optional(),
  q: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
})

export const pageInputSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est requis').max(200),
  slug: pageSlugSchema,
  status: contentStatusSchema.default('draft'),
  contentMd: z.string().default(''),
  scheduledAt: z.coerce.date().optional().nullable(),
  seo: seoSchema.optional()
}).superRefine(requireScheduleWhenScheduled)

export const postInputSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est requis').max(200),
  slug: slugSchema,
  excerpt: z.string().trim().max(300).default(''),
  contentMd: z.string().default(''),
  coverPathname: z.string().trim().optional().nullable(),
  category: z.string().trim().max(80).default(''),
  status: contentStatusSchema.default('draft'),
  scheduledAt: z.coerce.date().optional().nullable(),
  seo: seoSchema.optional()
}).superRefine(requireScheduleWhenScheduled)

export const contentActionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('publish') }),
  z.object({ action: z.literal('unpublish') }),
  z.object({
    action: z.literal('schedule'),
    scheduledAt: z.coerce.date()
  })
])

export type PageInput = z.infer<typeof pageInputSchema>
export type PostInput = z.infer<typeof postInputSchema>
export type SeoInput = z.infer<typeof seoSchema>
export type ContentListQuery = z.infer<typeof contentListQuerySchema>
export type ContentAction = z.infer<typeof contentActionSchema>
