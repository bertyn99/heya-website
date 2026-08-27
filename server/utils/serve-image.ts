import type { H3Event } from 'h3'
import { createError, useLogger } from 'evlog'
import { findBlob } from '../queries/blobs'
import { notFound } from './http-errors'

const LONG_CACHE = 'public, max-age=31536000, stale-while-revalidate=604800'
const MEDIA_PREFIX = 'media/'

function isAllowedCmsBlobPath(assetPath: string) {
  const normalized = assetPath.replace(/^\/+/, '')

  if (!normalized || normalized.includes('..') || normalized.includes('\\')) {
    return false
  }

  return normalized.startsWith(MEDIA_PREFIX)
}

/**
 * Serve CMS blobs (`media/…`) as stored. Transforms happen at upload (WebP ingest).
 * Static files under `public/images/` are served by Nitro, not this route.
 */
export async function serveMediaImage(event: H3Event, fullPath: string) {
  const log = useLogger(event)
  const assetPath = fullPath.replace(/^\/+/, '')

  if (!isAllowedCmsBlobPath(assetPath)) {
    throw createError({
      message: 'Chemin média invalide',
      status: 400,
      why: 'Seuls les blobs CMS (media/) sont servis ici',
      fix: 'Utiliser /api/media/media/… pour le CMS, /images/… pour les assets statiques'
    })
  }

  log.set({
    cms: {
      entity: 'media',
      action: 'serve',
      pathname: assetPath
    }
  })

  const existing = await findBlob(assetPath)

  if (!existing) {
    throw notFound('Média introuvable', { type: 'media', id: assetPath })
  }

  const file = await blob.get(assetPath)

  if (!file) {
    throw notFound('Média introuvable', { type: 'media', id: assetPath })
  }

  setHeader(event, 'Cache-Control', LONG_CACHE)
  return blob.serve(event, assetPath)
}
