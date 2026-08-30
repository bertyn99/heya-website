<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { PublicPost, PublicPostListItem } from '#shared/types/public'
import { contentAssetUrl } from '#shared/media-url'
import { BLOG_AUTHOR } from '~/utils/blog-author'
import { formatFrDate, readingTimeMinutes } from '~/utils/format-date'
import { CAL_COM_URL } from '~/utils/navigation'
import HeyaMarkdown from '~/components/content/HeyaMarkdown.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const postRequest = useFetch<PublicPost>(() => `/api/posts/${slug.value}`)

useHead({
  titleTemplate: '%s'
})

useSeoMeta({
  title: computed(() => postRequest.data.value?.seo?.metaTitle?.trim() || `${postRequest.data.value?.title ?? ''} | Blog Heya`),
  description: computed(() => postRequest.data.value?.seo?.metaDescription?.trim() || postRequest.data.value?.excerpt),
  ogTitle: computed(() => postRequest.data.value?.seo?.metaTitle?.trim() || postRequest.data.value?.title),
  ogDescription: computed(() => postRequest.data.value?.seo?.metaDescription?.trim() || postRequest.data.value?.excerpt),
  ogImage: computed(() => contentAssetUrl(postRequest.data.value?.seo?.ogImage || postRequest.data.value?.coverPathname) || '/og-image.png'),
  twitterCard: 'summary_large_image'
})

const { data: post, error } = await postRequest

if (error.value || !post.value) {
  throw createError({
    statusCode: error.value?.statusCode || 404,
    statusMessage: 'Article non trouvé',
    fatal: true
  })
}

const { data: allPosts } = await useFetch<PublicPostListItem[]>('/api/posts')

const related = computed(() =>
  (allPosts.value ?? [])
    .filter(item => item.slug !== post.value?.slug)
    .slice(0, 3)
)

const cover = computed(() => contentAssetUrl(post.value?.coverPathname))
const readTime = computed(() => `${readingTimeMinutes(post.value?.contentMd ?? '')} min`)

const ctaLinks: ButtonProps[] = [
  { label: 'Demander une démo', to: CAL_COM_URL, target: '_blank' }
]
</script>

<template>
  <article
    v-if="post"
    class="bg-default"
  >
    <UPageHero
      :title="post.title"
      :ui="{
        root: 'bg-default pb-8 pt-12',
        container: 'items-center text-center',
        title: 'text-[42px] font-semibold leading-tight max-w-3xl mx-auto'
      }"
    >
      <template #top>
        <UBadge
          :label="post.category"
          color="neutral"
          variant="solid"
          class="bg-inverted"
        />
      </template>
      <template #links>
        <div class="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white px-4 py-2">
          <UAvatar
            :src="BLOG_AUTHOR.avatar"
            :alt="BLOG_AUTHOR.name"
            size="sm"
          />
          <div class="text-left text-sm text-muted">
            <p class="font-semibold text-highlighted">
              {{ BLOG_AUTHOR.name }}
            </p>
            <p>{{ BLOG_AUTHOR.role }}</p>
          </div>
          <span>·</span>
          <span>{{ formatFrDate(post.publishedAt) }}</span>
          <span>·</span>
          <span>{{ readTime }} de lecture</span>
        </div>
      </template>
    </UPageHero>

    <UContainer
      v-if="cover"
      class="pb-8"
    >
      <img
        :src="cover"
        :alt="post.title"
        class="mx-auto w-full max-w-4xl rounded-[20px] object-cover"
        width="1040"
        height="452"
      >
    </UContainer>

    <UPageSection :ui="{ root: 'bg-white py-12' }">
      <div class="prose prose-neutral mx-auto max-w-2xl">
        <p
          v-if="post.excerpt"
          class="text-lg leading-relaxed text-muted"
        >
          {{ post.excerpt }}
        </p>
        <HeyaMarkdown :markdown="post.contentMd" />
      </div>
    </UPageSection>

    <UPageSection
      headline="À propos de l'auteur"
      :ui="{ root: 'bg-default' }"
    >
      <UPageCard
        :title="BLOG_AUTHOR.name"
        :description="BLOG_AUTHOR.role"
        orientation="horizontal"
        :ui="{ root: 'rounded-2xl w-full max-w-3xl mx-auto' }"
      >
        <UAvatar
          :src="BLOG_AUTHOR.avatar"
          :alt="BLOG_AUTHOR.name"
          size="3xl"
        />
      </UPageCard>
    </UPageSection>

    <UPageSection
      v-if="related.length > 0"
      headline="À lire aussi"
      title="D'autres articles"
    >
      <div class="grid w-full gap-6 md:grid-cols-3">
        <UBlogPost
          v-for="item in related"
          :key="item.slug"
          :title="item.title"
          :description="item.excerpt"
          :image="{
            src: contentAssetUrl(item.coverPathname) || '/images/blog/featured.png',
            alt: item.title
          }"
          :to="`/blog/${item.slug}`"
          :badge="{ label: item.category, color: 'neutral', variant: 'solid', class: 'bg-inverted' }"
          variant="outline"
        />
      </div>
    </UPageSection>

    <UPageCTA
      variant="solid"
      title="Envie d'essayer Heya dans votre résidence ?"
      :links="ctaLinks"
      class="rounded-none"
      :ui="{
        root: 'bg-heya-dark-footer py-16',
        title: 'text-3xl font-semibold text-white'
      }"
    />
  </article>
</template>
