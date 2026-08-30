import type { SitemapUrlInput } from '#sitemap/types'
import { orderPagesAsTree, publicPathToUrl } from '#shared/page-hierarchy'
import { listPublishedPages, listPublishedPosts } from '../../queries'

export default defineSitemapEventHandler(async () => {
  const pages = orderPagesAsTree(await listPublishedPages())
  const posts = await listPublishedPosts()

  const pageUrls: SitemapUrlInput[] = pages.map(page => ({
    loc: publicPathToUrl(page.publicPath),
    lastmod: page.updatedAt
  }))

  const postUrls: SitemapUrlInput[] = posts.map(post => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt
  }))

  return [
    { loc: '/blog' },
    ...pageUrls,
    ...postUrls
  ]
})
