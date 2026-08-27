import { deletePage } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  log.set({ cms: { entity: 'page', action: 'delete', id } })

  const deleted = await deletePage(id)

  if (!deleted) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  auditCms('cms.page.delete', { type: 'page', id })

  return { ok: true, id }
})
