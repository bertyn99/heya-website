<template>
  <UPageSection>
    <UPageLogos title="Ils nous font confiance">
      <div class="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
        <div
          v-for="i in 4"
          :key="i"
          class="h-12 w-28 rounded-lg bg-accented"
          aria-hidden="true"
        />
      </div>
    </UPageLogos>
  </UPageSection>
</template>
