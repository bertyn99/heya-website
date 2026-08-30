<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { PublicPostListItem } from '#shared/types/public'
import { contentAssetUrl } from '#shared/media-url'
import { BLOG_AUTHOR } from '~/utils/blog-author'
import { formatFrDate } from '~/utils/format-date'
import { CAL_COM_URL } from '~/utils/navigation'
import { heyaHeroCentered } from '~/utils/heya-ui'

useSeoMeta({
  title: 'Blog | Convivialité et habitat partagé',
  description: 'Actualités Heya, retours d\'expérience, conseils pour animer une résidence ou un habitat partagé.'
})

const { data: posts, error } = await useFetch<PublicPostListItem[]>('/api/posts')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: 'Impossible de charger le blog',
    fatal: true
  })
}

const activeCategory = ref('Tous')
const page = ref(1)
const perPage = 6

const allPosts = computed(() => posts.value ?? [])

const blogCategories = computed(() => {
  const names = [...new Set(allPosts.value.map(post => post.category).filter(Boolean))]
  return ['Tous', ...names]
})

const featuredPost = computed(() => allPosts.value[0] ?? null)

const filteredPosts = computed(() => {
  const rest = allPosts.value.slice(1)
  if (activeCategory.value === 'Tous') {
    return rest
  }
  return rest.filter(post => post.category === activeCategory.value)
})

const pagedPosts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredPosts.value.slice(start, start + perPage)
})

watch(activeCategory, () => {
  page.value = 1
})

const ctaLinks: ButtonProps[] = [
  { label: 'Prendre rendez-vous', to: CAL_COM_URL, target: '_blank' }
]

function coverOf(post: PublicPostListItem) {
  return contentAssetUrl(post.coverPathname) || '/images/blog/featured.png'
}
</script>

<template>
  <div class="bg-default">
    <UPageHero
      headline="Le blog"
      title="Actualités & inspirations habitat partagé"
      description="Retours d'expérience, conseils pour animer votre résidence et nouveautés Heya."
      :ui="{
        ...heyaHeroCentered,
        root: 'bg-default pb-8 pt-14 sm:pt-16'
      }"
    >
      <template #links>
        <div class="flex flex-wrap justify-center gap-2.5">
          <UBadge
            v-for="cat in blogCategories"
            :key="cat"
            :label="cat"
            :variant="activeCategory === cat ? 'solid' : 'outline'"
            color="neutral"
            class="cursor-pointer transition-colors duration-200"
            :class="activeCategory === cat ? 'bg-inverted text-white' : 'bg-transparent'"
            @click="activeCategory = cat"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      v-if="featuredPost"
      :ui="{ root: 'bg-default py-0' }"
    >
      <UPageCard
        :title="featuredPost.title"
        :description="featuredPost.excerpt"
        orientation="horizontal"
        variant="outline"
        :ui="{
          root: 'rounded-[1.25rem] overflow-hidden w-full',
          container: 'p-10',
          title: 'text-2xl sm:text-[28px] font-semibold',
          description: 'text-muted'
        }"
      >
        <template #header>
          <p class="text-[11px] font-semibold uppercase text-primary">
            À la une
          </p>
          <UBadge
            :label="featuredPost.category"
            color="neutral"
            variant="solid"
            class="bg-inverted"
          />
        </template>
        <template #footer>
          <div class="flex items-center gap-3">
            <UAvatar
              :src="BLOG_AUTHOR.avatar"
              :alt="BLOG_AUTHOR.name"
              size="sm"
            />
            <div>
              <p class="text-sm font-semibold">
                {{ BLOG_AUTHOR.name }}
              </p>
              <p class="text-xs text-muted">
                {{ formatFrDate(featuredPost.publishedAt) }}
              </p>
            </div>
          </div>
          <UButton
            :to="`/blog/${featuredPost.slug}`"
            size="xs"
            class="mt-2 w-fit"
          >
            Lire l'article
          </UButton>
        </template>
        <img
          :src="coverOf(featuredPost)"
          :alt="featuredPost.title"
          class="h-full min-h-[280px] w-full object-cover sm:w-[560px]"
          width="560"
          height="360"
        >
      </UPageCard>
    </UPageSection>

    <UPageSection :ui="{ root: 'bg-default pt-8' }">
      <p
        v-if="allPosts.length === 0"
        class="w-full text-center text-muted"
      >
        Les premiers articles seront bientôt en ligne.
      </p>
      <div
        v-else
        class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <UBlogPost
          v-for="post in pagedPosts"
          :key="post.slug"
          :title="post.title"
          :description="post.excerpt"
          :date="formatFrDate(post.publishedAt)"
          :image="{ src: coverOf(post), alt: post.title }"
          :to="`/blog/${post.slug}`"
          :badge="{ label: post.category, color: 'neutral', variant: 'solid', class: 'bg-inverted' }"
          variant="outline"
          :ui="{
            root: 'rounded-[1.25rem]',
            title: 'text-lg font-semibold',
            description: 'text-sm text-muted'
          }"
        >
          <template #footer>
            <span class="text-[13px] font-semibold text-primary">
              Lire l'article →
            </span>
          </template>
        </UBlogPost>
      </div>

      <UPagination
        v-if="filteredPosts.length > perPage"
        v-model:page="page"
        :total="filteredPosts.length"
        :items-per-page="perPage"
        class="mt-8"
      />
    </UPageSection>

    <UPageCTA
      variant="solid"
      title="Envie d'essayer Heya dans votre résidence ?"
      description="On installe, on forme, on accompagne. Vous observez le lien se recréer."
      :links="ctaLinks"
      class="rounded-none"
      :ui="{
        root: 'bg-heya-dark-footer py-20',
        title: 'text-3xl font-semibold text-white',
        description: 'text-[#e8e2d8]'
      }"
    />
  </div>
</template>
