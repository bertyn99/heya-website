import { deleteBlob, findBlob } from '../../../queries/blobs'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { toLogError } from '../../../utils/log-error'
import { requireCatchallParam } from '../../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const pathname = requireCatchallParam(event, 'pathname')
  log.set({ cms: { entity: 'media', action: 'delete', pathname } })

  const existing = await findBlob(pathname)

  if (!existing) {
    throw notFound('Média introuvable', { type: 'media', id: pathname })
  }

  await deleteBlob(pathname)

  let orphanBlob = false

  try {
    await blob.del(pathname)
  } catch (error) {
    orphanBlob = true
    log.error(toLogError(error), {
      step: 'blob.del',
      cms: { media: { pathname, dbDeleted: true, orphanBlob: true } }
    })
  }

  auditCms('cms.media.delete', {
    type: 'media',
    id: pathname,
    orphanBlob
  })

  return { ok: true, pathname, orphanBlob }
})
