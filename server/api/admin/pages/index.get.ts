import { contentListQuerySchema } from '#shared/schemas/content'
import { listPages } from '../../../queries/pages'
import { createAdminContext } from '../../../utils/admin-context'
import { validateQuery } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)

  const query = validateQuery(event, contentListQuerySchema)
  log.set({ cms: { entity: 'page', action: 'list', filters: query } })

  return listPages(query)
})
