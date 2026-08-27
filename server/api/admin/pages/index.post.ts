import { pageInputSchema } from '#shared/schemas/content'
import { toPageInsert } from '../../../queries/mappers'
import { findPageById, insertPage } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { badRequest, withUniqueConflict } from '../../../utils/http-errors'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const body = await validateBody(event, pageInputSchema)

  if (body.parentId) {
    const parent = await findPageById(body.parentId)
    if (!parent) {
      throw badRequest('Page parente introuvable')
    }
  }

  log.set({ cms: { entity: 'page', action: 'create', slug: body.slug } })

  const page = await withUniqueConflict(
    () => insertPage(toPageInsert(body), body.seo),
    'Une page avec ce slug existe déjà',
    log
  )

  auditCms('cms.page.create', { type: 'page', id: page.id, slug: page.slug })

  return page
})
