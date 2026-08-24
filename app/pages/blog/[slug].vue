<script setup lang="ts">
import { getPostBySlug } from '~/data/blog'

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
</script>

<template>
  <article>
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer class="mx-auto max-w-3xl">
        <UBadge
          :label="post.category"
          variant="soft"
          class="mb-4 bg-heya-accent/10 text-heya-accent"
        />
        <h1 class="text-3xl font-bold leading-tight text-heya-dark sm:text-4xl">
          {{ post.title }}
        </h1>
        <p class="mt-4 text-heya-dark-border">
          Par {{ post.author }} · {{ post.date }} · {{ post.readTime }} de lecture
        </p>
      </UContainer>
    </section>

    <section class="bg-white py-12">
      <UContainer class="prose prose-heya mx-auto max-w-3xl">
        <p class="text-lg leading-relaxed text-heya-dark-border">
          {{ post.excerpt }}
        </p>
        <p class="mt-6 leading-relaxed text-heya-dark-border">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Heya transforme les espaces de vie partagés en communautés actives grâce à un dispositif simple : un totem dans l'espace commun et des lampes relay dans chaque logement.
        </p>
        <p class="mt-4 leading-relaxed text-heya-dark-border">
          Les résidents proposent des activités en un geste, les lampes s'allument dans la couleur correspondante, et le lien se crée naturellement dans les espaces communs. Sans application, sans écran complexe.
        </p>
        <h2 class="mt-10 text-2xl font-bold text-heya-dark">
          Les résultats observés
        </h2>
        <p class="mt-4 leading-relaxed text-heya-dark-border">
          Les équipes constatent une augmentation de la participation aux activités, une meilleure visibilité de la vie collective, et une charge administrative réduite pour la conciergerie.
        </p>
      </UContainer>
    </section>

    <section class="bg-heya-cream py-12">
      <UContainer class="flex flex-wrap items-center justify-between gap-4">
        <UButton
          to="/blog"
          variant="ghost"
          icon="i-lucide-arrow-left"
          class="text-heya-dark"
        >
          Retour au blog
        </UButton>
        <UButton
          to="/contact"
          class="rounded-full bg-heya-accent text-white"
        >
          Demander une démo
        </UButton>
      </UContainer>
    </section>
  </article>
</template>
