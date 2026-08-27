import { deletePost } from '../../../queries/posts'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  log.set({ cms: { entity: 'post', action: 'delete', id } })

  const deleted = await deletePost(id)

  if (!deleted) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  auditCms('cms.post.delete', { type: 'post', id })

  return { ok: true, id }
})
