<script setup lang="ts">
import type { BlockType } from '#shared/schemas/blocks'

defineProps<{
  type: BlockType
}>()
</script>

<template>
  <div class="cms-library-mini relative size-full overflow-hidden bg-heya-neutral-50">
    <div
      v-if="type === 'hero'"
      class="flex h-full gap-2 p-2.5"
    >
      <div class="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <span class="h-2 w-[88%] rounded-sm bg-heya-neutral-800" />
        <span class="h-1.5 w-full rounded-sm bg-heya-neutral-300" />
        <span class="h-1.5 w-3/4 rounded-sm bg-heya-neutral-300" />
        <div class="mt-1 flex gap-1">
          <span class="h-3 w-9 rounded-full bg-primary" />
          <span class="h-3 w-9 rounded-full bg-primary/25" />
        </div>
      </div>
      <div class="relative w-[38%] shrink-0">
        <span class="absolute top-1 right-2 size-8 rounded-full bg-heya-200" />
        <span class="absolute top-5 right-6 size-7 rounded-full bg-heya-400" />
        <span class="absolute bottom-2 right-1 size-9 rounded-full bg-heya-300" />
      </div>
    </div>

    <div
      v-else-if="type === 'business-proof'"
      class="flex h-full flex-col items-center justify-center gap-2 px-3"
    >
      <span class="h-1.5 w-16 rounded-sm bg-heya-neutral-300" />
      <div class="flex w-full items-center justify-center gap-1.5">
        <span
          v-for="n in 4"
          :key="n"
          class="h-5 flex-1 rounded-md bg-heya-neutral-200"
        />
      </div>
    </div>

    <div
      v-else-if="type === 'problem'"
      class="flex h-full items-end gap-1.5 p-2.5"
    >
      <span class="h-[55%] flex-1 rounded-md bg-heya-neutral-200" />
      <span class="h-[75%] flex-1 rounded-md bg-heya-200" />
      <span class="h-[45%] flex-1 rounded-md bg-heya-neutral-200" />
    </div>

    <div
      v-else-if="type === 'how-it-works'"
      class="flex h-full flex-col justify-center gap-1.5 p-2.5"
    >
      <div
        v-for="(tone, i) in ['bg-step-blue', 'bg-step-gold', 'bg-step-green']"
        :key="i"
        class="flex h-5 items-center gap-1.5 rounded-md px-1.5"
        :class="tone"
      >
        <span class="size-3 shrink-0 rounded-full bg-white/80 text-[7px]" />
        <span class="h-1.5 flex-1 rounded-sm bg-white/70" />
      </div>
    </div>

    <div
      v-else-if="type === 'values'"
      class="grid h-full grid-cols-3 gap-1.5 p-2.5"
    >
      <span class="rounded-md bg-step-blue" />
      <span class="rounded-md bg-step-gold" />
      <span class="rounded-md bg-step-green" />
    </div>

    <div
      v-else-if="type === 'use-cases'"
      class="grid h-full grid-cols-3 grid-rows-2 gap-1 p-2"
    >
      <span class="col-span-2 row-span-2 rounded-md bg-linear-to-br from-heya-neutral-700 to-heya-neutral-900" />
      <span class="rounded-md bg-linear-to-br from-heya-600 to-heya-800" />
      <span class="rounded-md bg-linear-to-br from-heya-violet-500 to-heya-violet-800" />
    </div>

    <div
      v-else-if="type === 'testimonials'"
      class="flex h-full flex-col justify-center gap-2 p-2.5"
    >
      <span class="h-1.5 w-10 rounded-sm bg-primary/50" />
      <span class="h-1.5 w-full rounded-sm bg-heya-neutral-300" />
      <span class="h-1.5 w-5/6 rounded-sm bg-heya-neutral-300" />
      <div class="mt-0.5 flex gap-1">
        <span class="size-4 rounded-full bg-heya-300" />
        <span class="size-4 rounded-full bg-heya-200" />
        <span class="size-4 rounded-full bg-heya-neutral-300" />
      </div>
    </div>

    <div
      v-else-if="type === 'offers'"
      class="flex h-full items-stretch gap-1.5 p-2.5"
    >
      <span class="flex-1 rounded-md border border-heya-neutral-200 bg-white" />
      <span class="flex-[1.15] rounded-md bg-primary" />
      <span class="flex-1 rounded-md border border-heya-neutral-200 bg-white" />
    </div>

    <div
      v-else-if="type === 'contact-cta'"
      class="flex h-full items-center justify-between gap-2 bg-heya-neutral-800 p-2.5"
    >
      <div class="min-w-0 flex-1 space-y-1">
        <span class="block h-1.5 w-4/5 rounded-sm bg-white/80" />
        <span class="block h-1 w-2/3 rounded-sm bg-white/40" />
      </div>
      <span class="h-4 w-10 shrink-0 rounded-full bg-primary" />
    </div>

    <div
      v-else-if="type === 'richtext'"
      class="flex h-full flex-col justify-center gap-1.5 p-3"
    >
      <span class="h-2 w-1/2 rounded-sm bg-heya-neutral-800" />
      <span class="h-1.5 w-full rounded-sm bg-heya-neutral-300" />
      <span class="h-1.5 w-full rounded-sm bg-heya-neutral-300" />
      <span class="h-1.5 w-2/3 rounded-sm bg-heya-neutral-300" />
    </div>

    <div
      v-else-if="type === 'products'"
      class="flex h-full items-stretch gap-1.5 p-2.5"
    >
      <span class="flex-1 rounded-md bg-heya-neutral-200" />
      <span class="flex-1 rounded-md bg-heya-200" />
    </div>

    <div
      v-else-if="type === 'media'"
      class="flex h-full flex-col justify-end bg-heya-neutral-800 p-2.5"
    >
      <span class="h-1.5 w-1/3 rounded-sm bg-primary/70" />
      <span class="mt-1 h-8 w-full rounded-md bg-white/15" />
    </div>

    <div
      v-else-if="type === 'stats'"
      class="grid h-full grid-cols-4 gap-1 p-2.5"
    >
      <span class="rounded-md bg-step-green" />
      <span class="rounded-md bg-heya-neutral-200" />
      <span class="rounded-md bg-heya-neutral-200" />
      <span class="rounded-md bg-heya-neutral-200" />
    </div>

    <div
      v-else-if="type === 'activities'"
      class="grid h-full grid-cols-2 gap-1 p-2"
    >
      <span class="rounded-md bg-[#e6f5ff]" />
      <span class="rounded-md bg-[#fff8e6]" />
      <span class="rounded-md bg-[#fff2e6]" />
      <span class="rounded-md bg-[#f3eeff]" />
    </div>

    <div
      v-else-if="type === 'install'"
      class="flex h-full items-stretch gap-1.5 p-2.5"
    >
      <span class="flex-1 rounded-md border border-step-green bg-white" />
      <span class="flex-1 rounded-md border border-step-green bg-white" />
      <span class="flex-1 rounded-md border border-step-green bg-white" />
    </div>

    <div
      v-else-if="type === 'timeline'"
      class="flex h-full items-center gap-1.5 p-2.5"
    >
      <span class="size-2 rounded-full bg-heya-orange" />
      <span class="h-0.5 flex-1 bg-heya-neutral-200" />
      <span class="size-2 rounded-full bg-heya-yellow" />
      <span class="h-0.5 flex-1 bg-heya-neutral-200" />
      <span class="size-2 rounded-full bg-primary" />
      <span class="h-0.5 flex-1 bg-heya-neutral-200" />
      <span class="size-2 rounded-full bg-heya-violet" />
    </div>

    <div
      v-else-if="type === 'missions'"
      class="flex h-full items-stretch gap-1.5 p-2.5"
    >
      <span class="flex-1 rounded-md bg-heya-violet/30" />
      <span class="flex-1 rounded-md bg-heya-teal/30" />
      <span class="flex-1 rounded-md bg-heya-blue/30" />
    </div>

    <div
      v-else-if="type === 'founder'"
      class="flex h-full gap-2 p-2.5"
    >
      <div class="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <span class="h-2 w-3/4 rounded-sm bg-heya-neutral-800" />
        <span class="h-1.5 w-full rounded-sm bg-heya-neutral-300" />
      </div>
      <span class="w-[32%] shrink-0 rounded-lg bg-primary" />
    </div>

    <div
      v-else-if="type === 'awards'"
      class="grid h-full grid-cols-4 gap-1 p-2"
    >
      <span class="rounded-md bg-heya-neutral-200" />
      <span class="rounded-md bg-heya-200" />
      <span class="rounded-md bg-heya-neutral-200" />
      <span class="rounded-md bg-heya-violet/40" />
    </div>

    <div
      v-else-if="type === 'faq'"
      class="grid h-full grid-cols-2 gap-x-2 gap-y-1.5 p-2.5"
    >
      <span class="h-1.5 w-full rounded-sm bg-heya-neutral-800" />
      <span class="h-1.5 w-4/5 rounded-sm bg-heya-neutral-800" />
      <span class="h-1 w-full rounded-sm bg-heya-neutral-300" />
      <span class="h-1 w-3/4 rounded-sm bg-heya-neutral-300" />
    </div>

    <div
      v-else-if="type === 'contact-form'"
      class="flex h-full flex-col justify-center gap-1.5 bg-heya-neutral-800 p-2.5"
    >
      <span class="h-3 w-full rounded-sm bg-white/15" />
      <span class="h-3 w-full rounded-sm bg-white/15" />
      <span class="h-6 w-full rounded-sm bg-white/10" />
    </div>

    <div
      v-else
      class="flex h-full items-center justify-center"
    >
      <span class="size-8 rounded-lg bg-primary/15" />
    </div>
  </div>
</template>
