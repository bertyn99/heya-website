<script setup lang="ts">
interface HeroLayer {
  left: number
  top: number
  size: number
  src: string
  alt?: string
  rounded?: boolean
}

/** Positions from Figma node 137:317 (704×560 artboard). */
const layers: HeroLayer[] = [
  { left: 220, top: 60, size: 400, src: '/images/hero/rings/center-outer.svg' },
  { left: 240, top: 80, size: 360, src: '/images/hero/rings/center-mid.svg' },
  { left: 88, top: 108, size: 184, src: '/images/hero/rings/tl-outer.svg' },
  { left: 108, top: 128, size: 144, src: '/images/hero/rings/tl-mid.svg' },
  { left: 486, top: 46, size: 168, src: '/images/hero/rings/tr-outer.svg' },
  { left: 506, top: 66, size: 128, src: '/images/hero/rings/tr-mid.svg' },
  { left: 156, top: 306, size: 168, src: '/images/hero/rings/bl-outer.svg' },
  { left: 176, top: 326, size: 128, src: '/images/hero/rings/bl-mid.svg' },
  { left: 488, top: 308, size: 184, src: '/images/hero/rings/br-outer.svg' },
  { left: 508, top: 328, size: 144, src: '/images/hero/rings/br-mid.svg' },
  { left: 260, top: 100, size: 320, src: '/images/hero/center.png', alt: '', rounded: true },
  { left: 128, top: 148, size: 104, src: '/images/hero/top-left.png', alt: '', rounded: true },
  { left: 526, top: 86, size: 88, src: '/images/hero/top-right.png', alt: '', rounded: true },
  { left: 196, top: 346, size: 88, src: '/images/hero/bottom-left.png', alt: '', rounded: true },
  { left: 528, top: 348, size: 104, src: '/images/hero/bottom-right.png', alt: '', rounded: true }
]

const artboard = {
  width: 704,
  height: 560
}
</script>

<template>
  <div
    class="relative mx-auto w-full max-w-[704px] overflow-hidden"
    :style="{ aspectRatio: `${artboard.width} / ${artboard.height}` }"
    aria-hidden="true"
  >
    <div
      v-for="(layer, index) in layers"
      :key="index"
      class="absolute"
      :class="layer.rounded ? 'overflow-hidden rounded-full' : ''"
      :style="{
        left: `${(layer.left / artboard.width) * 100}%`,
        top: `${(layer.top / artboard.height) * 100}%`,
        width: `${(layer.size / artboard.width) * 100}%`,
        aspectRatio: '1 / 1'
      }"
    >
      <img
        :src="layer.src"
        :alt="layer.alt ?? ''"
        class="size-full"
        :class="layer.rounded ? 'object-cover object-center' : 'object-contain'"
        draggable="false"
      >
    </div>
  </div>
</template>
