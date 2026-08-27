import { pageInputSchema } from '#shared/schemas/content'
import { toPageInsert } from '../../../queries/mappers'
import { findPageById, updatePage, wouldCreateParentCycle } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { badRequest, notFound, withUniqueConflict } from '../../../utils/http-errors'
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

  if (body.parentId) {
    if (body.parentId === id) {
      throw badRequest('Une page ne peut pas être son propre parent')
    }

    const parent = await findPageById(body.parentId)
    if (!parent) {
      throw badRequest('Page parente introuvable')
    }

    if (await wouldCreateParentCycle(id, body.parentId)) {
      throw badRequest('Ce parent créerait une boucle dans l\'arborescence')
    }
  }

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
