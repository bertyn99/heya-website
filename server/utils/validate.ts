import { createError as createH3Error } from 'h3'
import type { H3Event } from 'h3'
import type { ZodType } from 'zod'

export async function validateBody<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  const body = await readBody(event)
  return parseData(schema, body)
}

export function validateQuery<T>(event: H3Event, schema: ZodType<T>): T {
  return parseData(schema, getQuery(event))
}

export function parseData<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw createH3Error({
      statusCode: 422,
      statusMessage: 'Validation Error',
      data: result.error.flatten()
    })
  }

  return result.data
}
