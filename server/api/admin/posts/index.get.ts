import { contentListQuerySchema } from '#shared/schemas/content'
import { listPosts } from '../../../queries/posts'
import { createAdminContext } from '../../../utils/admin-context'
import { validateQuery } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)

  const query = validateQuery(event, contentListQuerySchema)
  log.set({ cms: { entity: 'post', action: 'list', filters: query } })

  return listPosts(query)
})
