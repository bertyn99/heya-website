import { getPublishedPageBySlug } from '../queries/pages'
import { notFound } from '../utils/http-errors'
import { toPublicPage } from '../utils/public-content'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  log.set({ cms: { entity: 'page', action: 'read_public', slug: '/' } })

  const page = await getPublishedPageBySlug('')

  if (!page) {
    throw notFound('Page introuvable', { type: 'page', id: '/' })
  }

  return toPublicPage(page)
})
