import { pageInputSchema } from '#shared/schemas/content'
import { toPageInsert } from '../../../queries/mappers'
import { findPageById, updatePage } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound, withUniqueConflict } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  const current = await findPageById(id)

  if (!current) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  const body = await validateBody(event, pageInputSchema)
  log.set({ cms: { entity: 'page', action: 'update', id, slug: body.slug } })

  const updated = await withUniqueConflict(
    () => updatePage(id, toPageInsert(body, current), body.seo),
    'Une page avec ce slug existe déjà',
    log
  )

  if (!updated) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  auditCms('cms.page.update', { type: 'page', id: updated.id, slug: updated.slug })

  return updated
})
