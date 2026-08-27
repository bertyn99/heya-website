<script setup lang="ts">
import { DASHBOARD_SURFACE_CLASS } from '~/utils/dashboard-shell'

const props = defineProps<{
  flush?: boolean
}>()
</script>

<template>
  <div
    :class="[
      DASHBOARD_SURFACE_CLASS,
      props.flush ? 'overflow-hidden' : 'p-4 sm:p-5'
    ]"
  >
    <slot />
  </div>
</template>
