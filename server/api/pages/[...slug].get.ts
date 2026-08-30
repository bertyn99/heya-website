import { getPublishedPageBySlug } from '../../queries/pages'
import { notFound } from '../../utils/http-errors'
import { toPublicPage } from '../../utils/public-content'
import { requireCatchallParam } from '../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const slug = requireCatchallParam(event, 'slug')

  log.set({ cms: { entity: 'page', action: 'read_public', slug } })

  const page = await getPublishedPageBySlug(slug)

  if (!page) {
    throw notFound('Page introuvable', { type: 'page', id: slug })
  }

  return toPublicPage(page)
})
