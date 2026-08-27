import { postInputSchema } from '#shared/schemas/content'
import { toPostInsert } from '../../../queries/mappers'
import { insertPost } from '../../../queries/posts'
import { createAdminContext } from '../../../utils/admin-context'
import { withUniqueConflict } from '../../../utils/http-errors'
import { validateBody } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const body = await validateBody(event, postInputSchema)
  log.set({ cms: { entity: 'post', action: 'create', slug: body.slug } })

  const post = await withUniqueConflict(
    () => insertPost(toPostInsert(body), body.seo),
    'Un article avec ce slug existe déjà',
    log
  )

  auditCms('cms.post.create', { type: 'post', id: post.id, slug: post.slug })

  return post
})
