import { createError, type AuditableLogger } from 'evlog'
import type { BlobRow } from '#shared/types/db'
import { deleteBlob, insertBlob } from '../../../queries/blobs'
import { createAdminContext } from '../../../utils/admin-context'
import { optimizeImageBuffer } from '../../../utils/image-ingest'
import { toLogError } from '../../../utils/log-error'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] as const

async function rollbackUploadedMedia(pathnames: string[], log: AuditableLogger) {
  log.set({ cms: { media: { rollbackPathnames: pathnames } } })

  await Promise.allSettled(pathnames.map(async (pathname) => {
    await deleteBlob(pathname)
    await blob.del(pathname)
  }))
}

async function persistOptimizedUpload(file: { pathname: string, contentType?: string, size?: number }) {
  const stored = await blob.get(file.pathname)

  if (!stored) {
    return null
  }

  const sourceType = file.contentType ?? stored.type ?? 'application/octet-stream'
  const sourceBuffer = await stored.arrayBuffer()
  const optimized = await optimizeImageBuffer(sourceBuffer, sourceType, {
    pathname: file.pathname
  })

  if (optimized.kind === 'skipped') {
    return {
      pathname: file.pathname,
      contentType: sourceType,
      size: file.size ?? sourceBuffer.byteLength
    }
  }

  if (optimized.kind === 'failed') {
    throw createError({
      message: 'Optimisation image impossible',
      status: 422,
      why: optimized.error.message,
      fix: 'Envoyer un JPEG, PNG ou WebP valide (max 8 Mo)'
    })
  }

  const dest = optimized.pathname ?? file.pathname
  await blob.put(dest, new Uint8Array(optimized.buffer), {
    contentType: optimized.contentType
  })

  if (dest !== file.pathname) {
    await blob.del(file.pathname)
  }

  return {
    pathname: dest,
    contentType: optimized.contentType,
    size: optimized.buffer.byteLength
  }
}

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const uploaded = await blob.handleUpload(event, {
    formKey: 'files',
    multiple: true,
    ensure: {
      maxSize: '8MB',
      types: [...allowedTypes]
    },
    put: {
      addRandomSuffix: true,
      prefix: 'media'
    }
  })

  const files = Array.isArray(uploaded) ? uploaded : [uploaded]
  const pathnames: string[] = []
  const rows: BlobRow[] = []

  log.set({ cms: { entity: 'media', action: 'upload', fileCount: files.length } })

  try {
    for (const file of files) {
      if (!file.pathname) {
        continue
      }

      pathnames.push(file.pathname)
      const stored = await persistOptimizedUpload(file)

      if (!stored) {
        await blob.del(file.pathname)
        pathnames.pop()
        continue
      }

      if (stored.pathname !== file.pathname) {
        pathnames[pathnames.length - 1] = stored.pathname
      }

      const row = await insertBlob({
        pathname: stored.pathname,
        contentType: stored.contentType,
        size: stored.size,
        alt: ''
      })
      rows.push(row)
    }
  } catch (error) {
    log.error(toLogError(error), { step: 'insertBlob', cms: { media: { pathnames } } })
    await rollbackUploadedMedia(pathnames, log)
    throw error
  }

  for (const row of rows) {
    auditCms('cms.media.upload', {
      type: 'media',
      id: row.pathname,
      contentType: row.contentType,
      size: row.size
    })
  }

  log.set({ cms: { media: { uploadedCount: rows.length } } })

  return rows
})
