import { pageInputSchema } from '#shared/schemas/content'
import { HOME_PAGE_SLUG, isHomePageSlug } from '#shared/page-hierarchy'
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
  const isHomePage = isHomePageSlug(current.slug, current.parentId)
  const slug = isHomePage ? HOME_PAGE_SLUG : body.slug
  const parentId = isHomePage ? null : (body.parentId ?? null)

  if (parentId) {
    if (parentId === id) {
      throw badRequest('Une page ne peut pas être son propre parent')
    }

    const parent = await findPageById(parentId)
    if (!parent) {
      throw badRequest('Page parente introuvable')
    }

    if (await wouldCreateParentCycle(id, parentId)) {
      throw badRequest('Ce parent créerait une boucle dans l\'arborescence')
    }
  }

  log.set({ cms: { entity: 'page', action: 'update', id, slug } })

  const updated = await withUniqueConflict(
    () => updatePage(id, toPageInsert({ ...body, slug, parentId }, current), body.seo),
    'Une page avec ce slug existe déjà',
    log
  )

  if (!updated) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  auditCms('cms.page.update', { type: 'page', id: updated.id, slug: updated.slug })

  return updated
})
