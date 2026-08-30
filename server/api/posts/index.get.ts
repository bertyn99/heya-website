import { listPublishedPosts } from '../../queries/posts'
import { toPublicPostListItem } from '../../utils/public-content'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  log.set({ cms: { entity: 'post', action: 'list_public' } })

  return (await listPublishedPosts()).map(toPublicPostListItem)
})
