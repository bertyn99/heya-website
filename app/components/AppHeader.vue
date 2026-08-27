<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { CAL_COM_URL, mainNav } from '~/utils/navigation'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() =>
  mainNav.map((item) => {
    const path = item.to.split('#')[0] || '/'
    const onHomeAnchor = path === '/' && item.to.includes('#')

    return {
      label: item.label,
      to: item.to,
      active: onHomeAnchor
        ? route.path === '/'
        : route.path === path || route.path.startsWith(`${path}/`)
    }
  })
)
</script>

<template>
  <UHeader title="Heya">
    <template #title>
      <AppLogo class="h-9 w-auto" />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      highlight
      class="hidden lg:flex"
    />

    <template #right>
      <UButton
        :to="CAL_COM_URL"
        target="_blank"
        size="sm"
        class="hidden sm:inline-flex"
      >
        Prendre rendez-vous
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        highlight
        class="-mx-2.5"
      />
      <UButton
        :to="CAL_COM_URL"
        target="_blank"
        block
        class="mt-4 rounded-lg"
      >
        Prendre rendez-vous
      </UButton>
    </template>
  </UHeader>
</template>
