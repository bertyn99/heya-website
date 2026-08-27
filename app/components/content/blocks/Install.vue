<script setup lang="ts">
const props = defineProps<{
  headline?: string
  title: string
  items: {
    title: string
    description: string
    image?: string
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
    :headline="props.headline"
    :title="props.title"
  >
    <div class="grid w-full gap-8 md:grid-cols-3">
      <UPageCard
        v-for="item in props.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :ui="{
          root: 'rounded-[1.25rem] border border-step-green p-6 text-center',
          title: 'text-lg font-semibold',
          description: 'text-sm text-muted'
        }"
      >
        <template #header>
          <img
            v-if="imageSrc(item.image)"
            :src="item.image"
            :alt="item.title"
            class="mx-auto h-40 w-full rounded-xl object-cover"
            width="240"
            height="160"
            @error="markBroken(item.image!)"
          >
          <div
            v-else
            class="mx-auto flex h-40 w-full items-center justify-center rounded-xl bg-heya-neutral-100 text-muted"
          >
            <UIcon
              name="i-lucide-image"
              class="size-8"
            />
          </div>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
