<script setup lang="ts">
import { DASHBOARD_HEADER_CHROME_CLASS } from '~/utils/dashboard-shell'

const props = defineProps<{
  id?: string
  flush?: boolean
}>()

const panelUi = computed(() => {
  if (!props.flush) {
    return undefined
  }

  return {
    body: 'flex min-h-0 flex-1 flex-col overflow-hidden bg-heya-neutral-50/50 p-0 sm:p-0 gap-0'
  }
})
</script>

<template>
  <UDashboardPanel
    :id="id"
    :ui="panelUi"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <div :class="DASHBOARD_HEADER_CHROME_CLASS">
        <slot name="header" />
      </div>
    </template>

    <template #body>
      <slot name="body">
        <slot />
      </slot>
    </template>
  </UDashboardPanel>
</template>
