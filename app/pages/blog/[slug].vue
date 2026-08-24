<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { blogPosts, getPostBySlug } from '~/data/blog'
import { CAL_COM_URL } from '~/utils/navigation'

const route = useRoute()
const slug = route.params.slug as string
const post = getPostBySlug(slug)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article non trouvé' })
}

useSeoMeta({
  title: `${post.title} | Blog Heya`,
  description: post.excerpt
})

const related = computed(() =>
  blogPosts.filter(item => item.slug !== post!.slug && !item.featured).slice(0, 3)
)

const ctaLinks: ButtonProps[] = [
  { label: 'Demander une démo', to: CAL_COM_URL, target: '_blank' }
]
</script>

<template>
  <article class="bg-default">
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
            src="/images/blog/elise.png"
            :alt="post.author"
            size="sm"
          />
          <div class="text-left text-sm text-muted">
            <p class="font-semibold text-highlighted">
              {{ post.author }}
            </p>
            <p>{{ post.authorRole }}</p>
          </div>
          <span>·</span>
          <span>{{ post.date }}</span>
          <span>·</span>
          <span>{{ post.readTime }} de lecture</span>
        </div>
      </template>
    </UPageHero>

    <UContainer class="pb-8">
      <img
        :src="post.image"
        :alt="post.title"
        class="mx-auto w-full max-w-4xl rounded-[20px] object-cover"
        width="1040"
        height="452"
      >
    </UContainer>

    <UPageSection :ui="{ root: 'bg-white py-12' }">
      <div class="prose prose-neutral mx-auto max-w-2xl">
        <p class="text-lg leading-relaxed text-muted">
          {{ post.excerpt }}
        </p>
        <p>
          Dans une résidence de 80 logements, l'équipe cherchait un moyen simple de relancer les échanges. Les affichages papier ne suffisaient plus. En trois mois avec Heya, le rythme a changé.
        </p>
        <h2>Le contexte</h2>
        <p>
          Malgré des espaces communs accueillants, beaucoup de résidents restaient isolés. La conciergerie passait du temps à relayer l'information. Heya a remplacé ce relais par un signal visible, sans smartphone obligatoire.
        </p>
        <h2>Ce qui a changé</h2>
        <p>
          Les résidents proposent des activités au totem. Les lampes s'allument. Les équipes constatent moins de questions répétitives et plus de moments spontanés.
        </p>
      </div>
    </UPageSection>

    <UPageSection
      headline="À propos de l'auteur"
      :ui="{ root: 'bg-default' }"
    >
      <UPageCard
        :title="post.author"
        :description="post.authorRole"
        orientation="horizontal"
        :ui="{ root: 'rounded-2xl w-full max-w-3xl mx-auto' }"
      >
        <UAvatar
          src="/images/blog/elise.png"
          :alt="post.author"
          size="3xl"
        />
      </UPageCard>
    </UPageSection>

    <UPageSection
      headline="À lire aussi"
      title="D'autres articles"
    >
      <div class="grid w-full gap-6 md:grid-cols-3">
        <UBlogPost
          v-for="item in related"
          :key="item.slug"
          :title="item.title"
          :description="item.excerpt"
          :image="{ src: item.image, alt: item.title }"
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
        root: 'bg-inverted py-16',
        title: 'text-3xl font-semibold text-inverted'
      }"
    />
  </article>
</template>
