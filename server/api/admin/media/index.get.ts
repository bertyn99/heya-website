import { mediaListQuerySchema } from '#shared/schemas/media'
import { listBlobs } from '../../../queries/blobs'
import { createAdminContext } from '../../../utils/admin-context'
import { validateQuery } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)

  const query = validateQuery(event, mediaListQuerySchema)
  log.set({ cms: { entity: 'media', action: 'list', filters: query } })

  return listBlobs(query)
})
