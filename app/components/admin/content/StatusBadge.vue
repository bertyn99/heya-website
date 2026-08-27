<script setup lang="ts">
import type { ContentStatus } from '#shared/types/content'
import { contentStatusBadgeColor, contentStatusLabel } from '~/utils/content-status'

defineProps<{
  status: ContentStatus
}>()
</script>

<template>
  <UBadge
    :color="contentStatusBadgeColor(status)"
    variant="subtle"
    class="capitalize"
  >
    {{ contentStatusLabel(status) }}
  </UBadge>
</template>
