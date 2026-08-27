<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  items: {
    title: string
    org: string
    tag: string
    image?: string
    tone: 'blue' | 'gold' | 'orange' | 'violet'
  }[]
}>()

const toneClass = {
  blue: { tag: 'bg-[#5b8fb9]/12 text-[#5b8fb9]', bar: 'bg-[#5b8fb9]' },
  gold: { tag: 'bg-[#e0a542]/12 text-[#e0a542]', bar: 'bg-[#e0a542]' },
  orange: { tag: 'bg-[#d4763a]/12 text-[#d4763a]', bar: 'bg-[#d4763a]' },
  violet: { tag: 'bg-[#8b7ab8]/12 text-[#8b7ab8]', bar: 'bg-[#8b7ab8]' }
} as const

const brokenImages = ref<string[]>([])

function imageSrc(src?: string) {
  return src && !brokenImages.value.includes(src) ? src : ''
}

function markBroken(src: string) {
  if (!brokenImages.value.includes(src)) {
    brokenImages.value = [...brokenImages.value, src]
  }
}
</script>

<template>
  <UPageSection
    :headline="props.headline"
    :title="props.title"
    :ui="{ root: '!py-16 sm:!py-20' }"
  >
    <div class="grid w-full gap-7 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="item in props.items"
        :key="item.title"
        class="overflow-hidden rounded-[1.25rem] border border-default bg-white shadow-(--shadow-heya) transition-transform duration-200 hover:-translate-y-1"
      >
        <img
          v-if="imageSrc(item.image)"
          :src="item.image"
          :alt="item.title"
          class="h-40 w-full object-cover"
          width="302"
          height="160"
          @error="markBroken(item.image!)"
        >
        <div
          v-else
          class="flex h-40 items-center justify-center bg-heya-neutral-100 text-muted"
        >
          <UIcon
            name="i-lucide-trophy"
            class="size-8"
          />
        </div>
        <div class="space-y-2.5 px-6 pb-5 pt-4">
          <UBadge
            :label="item.tag"
            :class="toneClass[item.tone].tag"
            variant="soft"
          />
          <h3 class="text-lg font-bold text-highlighted">
            {{ item.title }}
          </h3>
          <p class="text-sm text-muted">
            {{ item.org }}
          </p>
        </div>
        <div
          class="h-[3px] w-full"
          :class="toneClass[item.tone].bar"
        />
      </article>
    </div>
  </UPageSection>
</template>
