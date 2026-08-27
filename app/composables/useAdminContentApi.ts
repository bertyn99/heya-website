import type { ContentAction } from '#shared/schemas/content'
import type { CalendarContentType } from '#shared/calendar'
import type { AdminPageApi, AdminPostApi } from '~/utils/admin-mappers'
import { uniqueContentSlug } from '~/utils/serialize-date'

function statusUrl(contentType: CalendarContentType, id: string) {
  return contentType === 'page'
    ? `/api/admin/pages/${id}/status`
    : `/api/admin/posts/${id}/status`
}

export function useAdminContentApi() {
  async function createPageDraft() {
    return $fetch<AdminPageApi>('/api/admin/pages', {
      method: 'POST',
      body: {
        title: 'Nouvelle page',
        slug: uniqueContentSlug('nouvelle-page'),
        status: 'draft',
        contentMd: ''
      }
    })
  }

  async function createPostDraft() {
    return $fetch<AdminPostApi>('/api/admin/posts', {
      method: 'POST',
      body: {
        title: 'Nouvel article',
        slug: uniqueContentSlug('nouvel-article'),
        excerpt: '',
        contentMd: '',
        category: 'Convivialité',
        status: 'draft'
      }
    })
  }

  async function updateContentStatus(contentType: CalendarContentType, id: string, action: ContentAction) {
    return $fetch<AdminPageApi | AdminPostApi>(statusUrl(contentType, id), {
      method: 'POST',
      body: action
    })
  }

  return {
    createPageDraft,
    createPostDraft,
    updateContentStatus
  }
}
