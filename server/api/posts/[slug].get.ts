import { getPublishedPostBySlug } from '../../queries/posts'
import { notFound } from '../../utils/http-errors'
import { toPublicPost } from '../../utils/public-content'
import { requireRouteParam } from '../../utils/require-admin'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  const slug = requireRouteParam(event, 'slug')

  log.set({ cms: { entity: 'post', action: 'read_public', slug } })

  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    throw notFound('Article introuvable', { type: 'post', id: slug })
  }

  return toPublicPost(post)
})
