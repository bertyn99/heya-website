<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()
</script>

<template>
  <NuxtLink
    to="/admin"
    class="flex min-w-0 items-center gap-2.5 rounded-lg px-1.5 py-1 transition-colors hover:bg-elevated/60"
  >
    <AppLogo
      variant="lockup"
      class="h-9 w-auto shrink-0"
    />
    <div
      v-if="!collapsed"
      class="min-w-0"
    >
      <p class="truncate text-sm font-semibold text-highlighted">
        Heya
      </p>
      <p class="truncate text-xs text-muted">
        Administration
      </p>
    </div>
  </NuxtLink>
</template>
