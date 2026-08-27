import { createError } from 'evlog'
import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  return requireUserSession(event)
}

export function requireRouteParam(event: H3Event, name: string) {
  const value = getRouterParam(event, name)

  if (!value) {
    throw createError({
      message: `Paramètre ${name} manquant`,
      status: 400,
      why: 'L\'URL ne contient pas le paramètre requis',
      fix: 'Vérifier l\'URL de la requête'
    })
  }

  return decodeURIComponent(value)
}

export function requireCatchallParam(event: H3Event, name: string) {
  const segments = getRouterParams(event)[name]

  if (!segments) {
    throw createError({
      message: `Paramètre ${name} manquant`,
      status: 400,
      why: 'L\'URL ne contient pas le paramètre requis',
      fix: 'Vérifier l\'URL de la requête'
    })
  }

  const path = Array.isArray(segments) ? segments.join('/') : segments

  if (!path) {
    throw createError({
      message: `Paramètre ${name} manquant`,
      status: 400,
      why: 'Le chemin catch-all est vide',
      fix: 'Vérifier l\'URL de la requête'
    })
  }

  return decodeURIComponent(path)
}
