import { audit, createRequestLogger } from 'evlog'
import { SEED_PAGES, SEED_POSTS } from '#shared/content/seed-site'
import {
  findPageBySlug,
  findPostBySlug,
  insertPage,
  insertPost,
  updatePage,
  updatePost
} from '../queries'

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 86_400_000)
}

function daysAgo(days: number) {
  return daysFromNow(-days)
}

export async function seedCmsContent() {
  const log = createRequestLogger()
  log.set({ job: 'seed-cms' })
  const overwrite = process.env.SEED_CMS_OVERWRITE === '1'
  const pages: Array<{ slug: string, result: 'created' | 'updated' | 'skipped' }> = []
  const posts: Array<{ slug: string, result: 'created' | 'updated' | 'skipped' }> = []

  for (const def of SEED_PAGES) {
    const existing = await findPageBySlug(def.slug)

    if (existing && !overwrite) {
      pages.push({ slug: def.slug, result: 'skipped' })
      continue
    }

    const values = {
      slug: def.slug,
      title: def.title,
      status: 'published' as const,
      contentMd: def.contentMd,
      scheduledAt: null,
      publishedAt: new Date()
    }

    if (existing) {
      await updatePage(existing.id, values, def.seo)
      pages.push({ slug: def.slug, result: 'updated' })
    } else {
      await insertPage(values, def.seo)
      pages.push({ slug: def.slug, result: 'created' })
    }
  }

  for (const def of SEED_POSTS) {
    const existing = await findPostBySlug(def.slug)

    if (existing && !overwrite) {
      posts.push({ slug: def.slug, result: 'skipped' })
      continue
    }

    const values = {
      slug: def.slug,
      title: def.title,
      excerpt: def.excerpt,
      contentMd: def.contentMd,
      coverPathname: def.coverPathname,
      category: def.category,
      status: def.status,
      publishedAt: def.publishedDaysAgo !== null ? daysAgo(def.publishedDaysAgo) : null,
      scheduledAt: def.scheduledDaysAhead !== null ? daysFromNow(def.scheduledDaysAhead) : null
    }

    if (existing) {
      await updatePost(existing.id, values, def.seo)
      posts.push({ slug: def.slug, result: 'updated' })
    } else {
      await insertPost(values, def.seo)
      posts.push({ slug: def.slug, result: 'created' })
    }
  }

  audit({
    action: 'cms.content.seed',
    actor: { type: 'system', id: 'seed-cms' },
    target: { type: 'cms', id: 'site' },
    outcome: 'success'
  })

  log.set({ seed: { overwrite, pages, posts } })
  log.emit()

  return { overwrite, pages, posts }
}
