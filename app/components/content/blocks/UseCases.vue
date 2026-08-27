<script setup lang="ts">
import type { UseCasesBlock } from '#shared/types/blocks'

const props = withDefaults(defineProps<UseCasesBlock>(), {
  headline: 'Pour qui'
})

const brokenImages = ref<string[]>([])

function imageSrc(src: string) {
  return brokenImages.value.includes(src) ? '' : src
}

function markBroken(src: string) {
  if (!brokenImages.value.includes(src)) {
    brokenImages.value = [...brokenImages.value, src]
  }
}
</script>

<template>
  <UPageSection
    id="pour-qui"
    :headline="props.headline"
    :title="props.title"
  >
    <div class="grid w-full gap-6 lg:grid-cols-3 lg:grid-rows-3">
      <NuxtLink
        v-for="item in props.items"
        :key="item.to"
        :to="item.to"
        class="group relative flex min-h-60 flex-col justify-end overflow-hidden rounded-[1.25rem] bg-linear-to-br from-heya-neutral-700 to-heya-neutral-900 p-6 shadow-(--shadow-heya) transition-transform duration-300 hover:-translate-y-1 sm:p-8"
        :class="item.featured ? 'lg:col-span-2 lg:row-span-3 lg:min-h-130' : 'lg:min-h-0'"
      >
        <img
          v-if="item.image && imageSrc(item.image)"
          :src="item.image"
          :alt="item.title"
          class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          @error="markBroken(item.image)"
        >
        <div class="absolute inset-0 bg-linear-to-b from-black/0 via-[#2a2520]/20 to-[#2a2520]/80" />

        <div class="relative space-y-3">
          <h3
            class="font-semibold text-white"
            :class="item.featured ? 'text-2xl sm:text-3xl' : 'text-xl'"
          >
            {{ item.title }}
          </h3>
          <p class="max-w-[42ch] text-sm leading-relaxed text-white/90 sm:text-base">
            {{ item.description }}
          </p>
          <span class="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-white">
            Découvrir
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </NuxtLink>
    </div>
  </UPageSection>
</template>
