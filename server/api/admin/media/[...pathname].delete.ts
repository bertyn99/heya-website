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

  try {
    await blob.del(pathname)
  } catch (error) {
    log.error(toLogError(error), { step: 'blob.del', cms: { media: { pathname } } })
    throw error
  }

  await deleteBlob(pathname)

  auditCms('cms.media.delete', {
    type: 'media',
    id: pathname
  })

  return { ok: true, pathname }
})
