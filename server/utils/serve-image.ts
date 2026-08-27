import type { H3Event } from 'h3'
import { createError, useLogger } from 'evlog'
import {
  isAllowedMediaAssetPath,
  isCmsBlobPath,
  sanitizeDeliveryOperations
} from '#shared/image-delivery-policy'
import { transformImageBufferForDelivery } from '#shared/image-transform-delivery'
import { hasImageTransformOps, parseIpxImagePath } from '#shared/ipx-image-path'
import { findBlob } from '../queries/blobs'
import { notFound } from './http-errors'
import { toLogError } from './log-error'

const LONG_CACHE = 'public, max-age=31536000, stale-while-revalidate=604800'

async function blobToArrayBuffer(file: Blob) {
  return file.arrayBuffer()
}

async function readCmsBlob(pathname: string) {
  const existing = await findBlob(pathname)

  if (!existing) {
    return null
  }

  const file = await blob.get(pathname)

  if (!file) {
    return null
  }

  return {
    buffer: await blobToArrayBuffer(file),
    contentType: existing.contentType || file.type || 'application/octet-stream'
  }
}

async function readPublicAsset(event: H3Event, assetPath: string) {
  const url = new URL(`/${assetPath}`, getRequestURL(event))
  const response = await fetch(url)

  if (!response.ok) {
    return null
  }

  return {
    buffer: await response.arrayBuffer(),
    contentType: response.headers.get('content-type') || 'application/octet-stream'
  }
}

/**
 * Serve CMS blobs (`media/…`) and static public files (`images/…`)
 * with optional IPX-style transforms (`/api/media/w_800,f_webp/media/…`).
 * jSquash WASM replaces Sharp / IPX, which do not run on Cloudflare Workers.
 */
export async function serveMediaImage(event: H3Event, fullPath: string) {
  const log = useLogger(event)
  const { assetPath, operations } = parseIpxImagePath(fullPath)

  if (!assetPath || !isAllowedMediaAssetPath(assetPath)) {
    throw createError({
      message: 'Chemin média invalide',
      status: 400,
      why: 'Le chemin doit commencer par media/ ou images/',
      fix: 'Utiliser un pathname CMS ou un fichier public/images'
    })
  }

  const deliveryOps = sanitizeDeliveryOperations(operations)
  const wantsTransform = hasImageTransformOps(deliveryOps)

  log.set({
    cms: {
      entity: 'media',
      action: wantsTransform ? 'transform' : 'serve',
      pathname: assetPath,
      ops: deliveryOps
    }
  })

  const source = isCmsBlobPath(assetPath)
    ? await readCmsBlob(assetPath)
    : await readPublicAsset(event, assetPath)

  if (!source) {
    throw notFound('Média introuvable', { type: 'media', id: assetPath })
  }

  if (!wantsTransform) {
    if (isCmsBlobPath(assetPath)) {
      return blob.serve(event, assetPath)
    }

    setHeader(event, 'Content-Type', source.contentType)
    setHeader(event, 'Cache-Control', LONG_CACHE)
    return source.buffer
  }

  const transformed = await transformImageBufferForDelivery(
    source.buffer,
    source.contentType,
    deliveryOps,
    { acceptHeader: getRequestHeader(event, 'accept') }
  )

  if (!transformed) {
    log.error(toLogError('jsquash transform failed'), {
      step: 'transformImageBufferForDelivery',
      cms: { media: { pathname: assetPath } }
    })
    setHeader(event, 'Content-Type', source.contentType)
    setHeader(event, 'Cache-Control', LONG_CACHE)
    return source.buffer
  }

  setHeader(event, 'Content-Type', transformed.contentType)
  setHeader(event, 'Cache-Control', LONG_CACHE)
  setHeader(event, 'Vary', 'Accept')
  return transformed.buffer
}
