<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  description?: string
  items: {
    label: string
    title: string
    description: string
    image?: string
    imageAlt?: string
  }[]
}>()

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
    id="produits"
    :headline="props.headline"
    :title="props.title"
    :description="props.description"
    :ui="{ root: 'bg-white' }"
  >
    <div class="grid w-full gap-8 md:grid-cols-2">
      <UPageCard
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :ui="{
          root: 'rounded-[1.25rem] p-8 text-center hover:-translate-y-1',
          header: 'flex w-full flex-col items-center',
          wrapper: 'items-center text-center',
          leading: 'justify-center',
          title: 'text-xl font-semibold',
          description: 'text-muted'
        }"
      >
        <template #header>
          <img
            v-if="imageSrc(item.image)"
            :src="item.image"
            :alt="item.imageAlt || item.title"
            class="mx-auto block h-[220px] w-auto max-w-full object-contain"
            width="280"
            height="220"
            @error="markBroken(item.image!)"
          >
          <p class="mt-5 text-[11px] font-semibold uppercase tracking-widest text-primary">
            {{ item.label }}
          </p>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
