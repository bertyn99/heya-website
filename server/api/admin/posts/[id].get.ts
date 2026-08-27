import { getPostWithSeo } from '../../../queries/posts'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  log.set({ cms: { entity: 'post', action: 'read', id } })

  const post = await getPostWithSeo(id)

  if (!post) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  return post
})
