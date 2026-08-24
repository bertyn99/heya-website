<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  labelClass?: string
}>()
</script>

<template>
  <div
    class="max-w-2xl"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <p
      class="mb-4 text-[11px] font-semibold uppercase tracking-widest"
      :class="labelClass ?? 'text-heya-violet'"
    >
      {{ label }}
    </p>
    <h2 class="text-3xl font-bold leading-tight text-heya-dark sm:text-4xl">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 text-lg leading-relaxed text-heya-dark-border"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </div>
</template>
