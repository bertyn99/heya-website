import { listPublishedPosts } from '../../queries/posts'

export default defineEventHandler(async (event) => {
  const log = useLogger(event)
  log.set({ cms: { entity: 'post', action: 'list_public' } })

  return listPublishedPosts()
})
