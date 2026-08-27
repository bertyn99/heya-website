import { blobAltSchema } from '#shared/schemas/media'
import { updateBlob } from '../../../queries/blobs'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { requireCatchallParam } from '../../../utils/require-admin'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const pathname = requireCatchallParam(event, 'pathname')
  const body = await validateBody(event, blobAltSchema)

  log.set({ cms: { entity: 'media', action: 'update', pathname } })

  const updated = await updateBlob(pathname, { alt: body.alt })

  if (!updated) {
    throw notFound('Média introuvable', { type: 'media', id: pathname })
  }

  auditCms('cms.media.update', { type: 'media', id: pathname })

  return updated
})
