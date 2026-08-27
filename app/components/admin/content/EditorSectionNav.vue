<script setup lang="ts">
import type { EditorNavSection } from '#shared/types/admin'
import { CONTENT_EDITOR_SECTION_NAV_ID } from '~/utils/content-editor-toolbar'

const props = defineProps<{
  sections: EditorNavSection[]
}>()

const activeId = ref(props.sections[0]?.id ?? '')
const navReady = ref(false)

function hasNavTarget() {
  return Boolean(document.getElementById(CONTENT_EDITOR_SECTION_NAV_ID))
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) {
    return
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeId.value = id
}

onMounted(async () => {
  await nextTick()
  navReady.value = hasNavTarget()

  if (!navReady.value) {
    const observer = new MutationObserver(() => {
      if (hasNavTarget()) {
        navReady.value = true
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    onUnmounted(() => observer.disconnect())
  }

  if (!props.sections.length) {
    return
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]?.target.id) {
        activeId.value = visible[0].target.id
      }
    },
    { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.2, 0.4] }
  )

  for (const section of props.sections) {
    const el = document.getElementById(section.id)
    if (el) {
      sectionObserver.observe(el)
    }
  }

  onUnmounted(() => sectionObserver.disconnect())
})
</script>

<template>
  <Teleport
    :to="`#${CONTENT_EDITOR_SECTION_NAV_ID}`"
    :disabled="!navReady"
  >
    <nav
      class="flex gap-1 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Sections de la page"
    >
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="shrink-0 rounded-none border-b-2 px-3 py-2 text-sm transition-colors active:scale-[0.98]"
        :class="activeId === section.id
          ? 'border-primary font-medium text-primary'
          : 'border-transparent text-muted hover:text-default'"
        @click="scrollToSection(section.id)"
      >
        {{ section.label }}
      </button>
    </nav>
  </Teleport>
</template>
