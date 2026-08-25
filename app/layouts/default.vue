<template>
  <div class="min-h-dvh flex flex-col">
    <AppHeader />
    <UMain
      id="contenu-principal"
      class="flex-1"
    >
      <slot />
    </UMain>
    <AppFooter />
  </div>
</template>
