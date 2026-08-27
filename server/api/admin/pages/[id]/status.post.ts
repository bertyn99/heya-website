import { contentActionSchema } from '#shared/schemas/content'
import { actionToStatusFields } from '../../../../queries/mappers'
import { findPageById, updatePage } from '../../../../queries/pages'
import { createAdminContext } from '../../../../utils/admin-context'
import { notFound } from '../../../../utils/http-errors'
import { requireRouteParam } from '../../../../utils/require-admin'
import { validateBody } from '../../../../utils/validate'

const statusActions = {
  publish: 'cms.page.publish',
  unpublish: 'cms.page.unpublish',
  schedule: 'cms.page.schedule'
} as const

export default defineEventHandler(async (event) => {
  const { log, auditCms } = await createAdminContext(event)

  const id = requireRouteParam(event, 'id')
  const current = await findPageById(id)

  if (!current) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  const body = await validateBody(event, contentActionSchema)
  log.set({ cms: { entity: 'page', action: body.action, id } })

  const updated = await updatePage(id, actionToStatusFields(body, current))

  if (!updated) {
    throw notFound('Page introuvable', { type: 'page', id })
  }

  auditCms(statusActions[body.action], {
    type: 'page',
    id: updated.id,
    slug: updated.slug,
    status: updated.status,
    scheduledAt: updated.scheduledAt?.toISOString() ?? null
  })

  return updated
})
