import { createError } from 'evlog'
import type { AuditableLogger } from 'evlog'
import { toLogError } from './log-error'

export function notFound(message = 'Introuvable', resource?: { type?: string, id?: string }) {
  return createError({
    message,
    status: 404,
    why: resource?.id
      ? `Aucun enregistrement pour l'identifiant ${resource.id}`
      : 'La ressource demandée n\'existe pas ou n\'est pas publiée',
    internal: resource
  })
}

export function badRequest(message: string, why?: string) {
  return createError({
    message,
    status: 400,
    why: why ?? message
  })
}
  return createError({
    message,
    status: 409,
    why: 'Contrainte d\'unicité violée',
    fix: 'Utiliser un identifiant ou un slug différent'
  })
}

export function isUniqueConstraintError(error: unknown) {
  return error instanceof Error && /UNIQUE constraint failed/i.test(error.message)
}

export async function withUniqueConflict<T>(
  run: () => Promise<T>,
  message: string,
  log?: AuditableLogger
): Promise<T> {
  try {
    return await run()
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw conflict(message)
    }

    log?.error(toLogError(error), { step: 'db.write' })
    throw error
  }
}
