import { createError } from 'evlog'
import { seedCmsContent } from '../../utils/seed-cms'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)

  if (!import.meta.dev) {
    throw createError({
      message: 'Not Found',
      status: 404,
      why: 'Endpoint disponible uniquement en développement'
    })
  }

  log.set({ seed: { source: 'dev-endpoint' } })

  return await seedCmsContent()
})
