<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { blogCategories, blogPosts } from '~/data/blog'
import { CAL_COM_URL } from '~/utils/navigation'

useSeoMeta({
  title: 'Blog Heya | Convivialité et habitat partagé',
  description: 'Actualités Heya, retours d\'expérience, conseils pour animer une résidence ou un habitat partagé.'
})

const activeCategory = ref('Tous')
const page = ref(1)

const featuredPost = computed(() => blogPosts.find(p => p.featured))

const filteredPosts = computed(() => {
  const nonFeatured = blogPosts.filter(p => !p.featured)
  if (activeCategory.value === 'Tous') return nonFeatured
  return nonFeatured.filter(p => p.category === activeCategory.value)
})

const ctaLinks: ButtonProps[] = [
  { label: 'Demander une démo', to: CAL_COM_URL, target: '_blank' }
]
</script>

<template>
  <div class="bg-default">
    <UPageHero
      headline="Le blog"
      title="Actualités & inspirations habitat partagé"
      description="Retours d'expérience, conseils pour animer votre résidence et nouveautés Heya."
      :ui="{
        root: 'bg-default pb-8 pt-12',
        container: 'items-center text-center',
        headline: 'text-primary text-[11px] font-semibold uppercase tracking-widest',
        title: 'text-4xl font-semibold text-highlighted max-w-3xl mx-auto',
        description: 'text-muted max-w-xl mx-auto'
      }"
    >
      <template #links>
        <div class="flex flex-wrap justify-center gap-2.5">
          <UBadge
            v-for="cat in blogCategories"
            :key="cat"
            :label="cat"
            :variant="activeCategory === cat ? 'solid' : 'subtle'"
            :color="activeCategory === cat ? 'neutral' : 'neutral'"
            class="cursor-pointer"
            :class="activeCategory === cat ? 'bg-inverted text-white' : 'bg-inverted/80 text-white'"
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
          root: 'rounded-[20px] overflow-hidden w-full',
          container: 'p-10',
          title: 'text-[28px] font-semibold',
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
              src="/images/blog/elise.png"
              :alt="featuredPost.author"
              size="sm"
            />
            <div>
              <p class="text-sm font-semibold">
                {{ featuredPost.author }}
              </p>
              <p class="text-xs text-muted">
                {{ featuredPost.date }} · {{ featuredPost.readTime }} de lecture
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
          :src="featuredPost.image"
          :alt="featuredPost.title"
          class="h-full min-h-[280px] w-full object-cover sm:w-[560px]"
          width="560"
          height="360"
        >
      </UPageCard>
    </UPageSection>

    <UPageSection :ui="{ root: 'bg-default pt-8' }">
      <div class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UBlogPost
          v-for="post in filteredPosts"
          :key="post.slug"
          :title="post.title"
          :description="post.excerpt"
          :date="`${post.date} · ${post.readTime}`"
          :image="{ src: post.image, alt: post.title }"
          :to="`/blog/${post.slug}`"
          :badge="{ label: post.category, color: 'neutral', variant: 'solid', class: 'bg-inverted' }"
          variant="outline"
          :ui="{
            root: 'rounded-2xl',
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
        v-model:page="page"
        :total="50"
        :items-per-page="6"
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
        root: 'bg-inverted py-20',
        title: 'text-3xl font-semibold text-inverted',
        description: 'text-[#e2e8f0]'
      }"
    />
  </div>
</template>
