import type { PublicPage, PublicPost, PublicPostListItem, PublicSeo } from '#shared/types/public'
import type { PageWithSeo, PostRow, PostWithSeo, SeoRow } from '#shared/types/db'

function toPublicSeo(seo: SeoRow | null): PublicSeo | null {
  if (!seo) {
    return null
  }

  return {
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    ogImage: seo.ogImage ?? null
  }
}

export function toPublicPage(page: PageWithSeo): PublicPage {
  return {
    slug: page.slug,
    title: page.title,
    contentMd: page.contentMd,
    publishedAt: page.publishedAt,
    updatedAt: page.updatedAt,
    seo: toPublicSeo(page.seo)
  }
}

export function toPublicPostListItem(post: PostRow): PublicPostListItem {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    coverPathname: post.coverPathname,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt
  }
}

export function toPublicPost(post: PostWithSeo): PublicPost {
  return {
    ...toPublicPostListItem(post),
    contentMd: post.contentMd,
    seo: toPublicSeo(post.seo)
  }
}
