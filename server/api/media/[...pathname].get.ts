import { serveMediaImage } from '../../utils/serve-image'
import { requireCatchallParam } from '../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const pathname = requireCatchallParam(event, 'pathname')
  return serveMediaImage(event, pathname)
})
