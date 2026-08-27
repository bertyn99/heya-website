import { contentActionSchema } from '#shared/schemas/content'
import { actionToStatusFields } from '../../../../queries/mappers'
import { findPostById, updatePost } from '../../../../queries/posts'
import { createAdminContext } from '../../../../utils/admin-context'
import { notFound } from '../../../../utils/http-errors'
import { requireRouteParam } from '../../../../utils/require-admin'
import { validateBody } from '../../../../utils/validate'

const statusActions = {
  publish: 'cms.post.publish',
  unpublish: 'cms.post.unpublish',
  schedule: 'cms.post.schedule'
} as const

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  const current = await findPostById(id)

  if (!current) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  const body = await validateBody(event, contentActionSchema)
  log.set({ cms: { entity: 'post', action: body.action, id } })

  const updated = await updatePost(id, actionToStatusFields(body, current))

  if (!updated) {
    throw notFound('Article introuvable', { type: 'post', id })
  }

  auditCms(statusActions[body.action], {
    type: 'post',
    id: updated.id,
    slug: updated.slug,
    status: updated.status,
    scheduledAt: updated.scheduledAt?.toISOString() ?? null
  })

  return updated
})
