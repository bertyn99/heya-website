<script setup lang="ts">
type LogoVariant = 'wordmark' | 'lockup'

const props = withDefaults(defineProps<{
  variant?: LogoVariant
  alt?: string
}>(), {
  variant: 'wordmark',
  alt: 'Heya'
})

const sources = {
  wordmark: {
    src: '/images/brand/heya-wordmark.png',
    width: 49,
    height: 36
  },
  lockup: {
    src: '/images/brand/heya-logo-lockup.png',
    width: 68,
    height: 50
  }
} as const

const logo = computed(() => sources[props.variant])
</script>

<template>
  <img
    :src="logo.src"
    :alt="alt"
    :width="logo.width"
    :height="logo.height"
    class="w-auto object-contain"
    v-bind="$attrs"
  >
</template>
