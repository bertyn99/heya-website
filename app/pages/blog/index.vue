<script setup lang="ts">
import { blogCategories, blogPosts } from '~/data/blog'

useSeoMeta({
  title: 'Blog Heya | Convivialité et habitat partagé',
  description: 'Actualités Heya, retours d\'expérience, conseils pour animer une résidence ou un habitat partagé.'
})

const activeCategory = ref('Tous')

const featuredPost = computed(() => blogPosts.find(p => p.featured))

const filteredPosts = computed(() => {
  const nonFeatured = blogPosts.filter(p => !p.featured)
  if (activeCategory.value === 'Tous') return nonFeatured
  return nonFeatured.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-heya-cream py-16 sm:py-20">
      <UContainer class="text-center">
        <p class="mb-4 text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
          Le blog
        </p>
        <h1 class="text-4xl font-bold text-heya-dark">
          Actualités et inspirations habitat partagé
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-lg text-heya-dark-border">
          Retours d'expérience, conseils pour animer votre résidence, nouveautés produit.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in blogCategories"
            :key="cat"
            class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            :class="activeCategory === cat
              ? 'bg-heya-accent text-white'
              : 'border border-heya-dark-border/20 bg-white text-heya-dark-border hover:text-heya-dark'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </UContainer>
    </section>

    <!-- Featured -->
    <section
      v-if="featuredPost"
      class="bg-heya-cream pb-12"
    >
      <UContainer>
        <article class="overflow-hidden rounded-2xl border border-[#e1d9ca] bg-white sm:flex">
          <div class="h-64 shrink-0 bg-gradient-to-br from-heya-step-gold/40 to-heya-accent/20 sm:h-auto sm:w-2/5" />
          <div class="flex flex-col justify-center p-8 sm:w-3/5">
            <p class="text-[11px] font-semibold uppercase tracking-widest text-heya-accent">
              À la une
            </p>
            <h2 class="mt-3 text-2xl font-bold text-heya-dark">
              {{ featuredPost.title }}
            </h2>
            <p class="mt-3 text-heya-dark-border">
              {{ featuredPost.excerpt }}
            </p>
            <p class="mt-4 text-sm text-heya-dark-border">
              {{ featuredPost.author }} · {{ featuredPost.date }} · {{ featuredPost.readTime }}
            </p>
            <UButton
              :to="`/blog/${featuredPost.slug}`"
              class="mt-6 w-fit rounded-full bg-heya-accent text-white"
            >
              Lire l'article
            </UButton>
          </div>
        </article>
      </UContainer>
    </section>

    <!-- Grid -->
    <section class="bg-heya-cream pb-16">
      <UContainer>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="group"
          >
            <div class="mb-4 h-48 rounded-xl bg-[#f0eae0]" />
            <UBadge
              :label="post.category"
              variant="soft"
              class="mb-2 bg-heya-accent/10 text-heya-accent"
            />
            <h3 class="text-lg font-bold text-heya-dark group-hover:text-heya-accent">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="mt-2 text-sm text-heya-dark-border">
              {{ post.excerpt }}
            </p>
            <p class="mt-3 text-xs text-heya-dark-border">
              {{ post.date }} · {{ post.readTime }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <section class="bg-heya-dark py-16">
      <UContainer class="text-center">
        <h2 class="text-2xl font-bold text-[#f1ede6]">
          Envie d'essayer Heya dans votre résidence ?
        </h2>
        <UButton
          to="/contact"
          class="mt-6 rounded-full bg-heya-accent px-8 text-white"
        >
          Demander une démo
        </UButton>
      </UContainer>
    </section>
  </div>
</template>
