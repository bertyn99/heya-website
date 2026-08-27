import { postInputSchema } from '#shared/schemas/content'
import { toPostInsert } from '../../../queries/mappers'
import { findPostById, updatePost } from '../../../queries/posts'
import { createAdminContext } from '../../../utils/admin-context'
import { notFound, withUniqueConflict } from '../../../utils/http-errors'
import { requireRouteParam } from '../../../utils/require-admin'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  const current = await findPostById(id)

  if (!current) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  const body = await validateBody(event, postInputSchema)
  log.set({ cms: { entity: 'post', action: 'update', id, slug: body.slug } })

  const updated = await withUniqueConflict(
    () => updatePost(id, toPostInsert(body, current), body.seo),
    'Un article avec ce slug existe déjà',
    log
  )

  if (!updated) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  auditCms('cms.post.update', { type: 'post', id: updated.id, slug: updated.slug })

  return updated
})
