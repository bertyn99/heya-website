export type PublicSeo = {
  metaTitle: string
  metaDescription: string
  ogImage: string | null
}

export type PublicPage = {
  slug: string
  title: string
  contentMd: string
  publishedAt: string | Date | null
  updatedAt: string | Date
  seo: PublicSeo | null
}

export type PublicPostListItem = {
  slug: string
  title: string
  excerpt: string
  category: string
  coverPathname: string | null
  publishedAt: string | Date | null
  updatedAt: string | Date
}

export type PublicPost = PublicPostListItem & {
  contentMd: string
  seo: PublicSeo | null
}
