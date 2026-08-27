import { pageInputSchema } from '#shared/schemas/content'
import { toPageInsert } from '../../../queries/mappers'
import { insertPage } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { withUniqueConflict } from '../../../utils/http-errors'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const body = await validateBody(event, pageInputSchema)
  log.set({ cms: { entity: 'page', action: 'create', slug: body.slug } })

  const page = await withUniqueConflict(
    () => insertPage(toPageInsert(body), body.seo),
    'Une page avec ce slug existe déjà',
    log
  )

  auditCms('cms.page.create', { type: 'page', id: page.id, slug: page.slug })

  return page
})
