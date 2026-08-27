import { buildDashboardSummary } from '../../../queries/dashboard'
import { createAdminContext } from '../../../utils/admin-context'

export default defineEventHandler(async (event) => {
  const { log } = await createAdminContext(event)
  log.set({ cms: { entity: 'dashboard', action: 'summary' } })
  return buildDashboardSummary()
})
