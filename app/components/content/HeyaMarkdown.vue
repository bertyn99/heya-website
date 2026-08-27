<script setup lang="ts">
import { heyaComarkComponents } from '~/utils/comark-components'

const props = defineProps<{
  markdown: string
}>()
</script>

<template>
  <Markdown
    :value="markdown"
    :components="heyaComarkComponents"
  />
</template>
