import { findPageById } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  log.set({ cms: { entity: 'page', action: 'read', id } })

  const page = await findPageById(id)

  if (!page) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  return page
})
