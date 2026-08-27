import { audit, createRequestLogger } from 'evlog'
import { publishDuePages } from '../queries/pages'
import { publishDuePosts } from '../queries/posts'
import { defineTask } from 'nitropack/runtime'

export default defineTask({
  meta: {
    name: 'publish-scheduled',
    description: 'Publish pages and posts whose scheduled_at has passed'
  },
  async run() {
    const log = createRequestLogger()
    log.set({ job: 'publish-scheduled' })
    const now = new Date()

    const pageIds = await publishDuePages(now)
    const postIds = await publishDuePosts(now)

    const result = {
      pagesPublished: pageIds.length,
      postsPublished: postIds.length,
      pageIds,
      postIds
    }

    log.set({ cron: result })

    if (pageIds.length > 0 || postIds.length > 0) {
      audit({
        action: 'cms.content.publish_scheduled',
        actor: { type: 'system', id: 'publish-scheduled' },
        target: {
          type: 'content',
          id: 'batch',
          pages: result.pageIds,
          posts: result.postIds
        },
        outcome: 'success'
      })
    }

    log.emit()

    return { result }
  }
})
