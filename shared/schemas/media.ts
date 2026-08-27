import * as z from 'zod'

export const mediaListQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
})

export const blobAltSchema = z.object({
  alt: z.string().trim().max(200).default('')
})

export type MediaListQuery = z.infer<typeof mediaListQuerySchema>
export type BlobAltInput = z.infer<typeof blobAltSchema>
