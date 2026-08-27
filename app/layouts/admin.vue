<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

const links = computed(() => {
  const primary: NavigationMenuItem[] = [{
    label: 'Tableau de bord',
    icon: 'i-lucide-layout-dashboard',
    to: '/admin',
    onSelect: () => { open.value = false }
  }, {
    label: 'Pages',
    icon: 'i-lucide-file-text',
    to: '/admin/pages',
    onSelect: () => { open.value = false }
  }, {
    label: 'Blog',
    icon: 'i-lucide-newspaper',
    to: '/admin/blog',
    onSelect: () => { open.value = false }
  }, {
    label: 'Planning',
    icon: 'i-lucide-calendar-days',
    to: '/admin/planning',
    onSelect: () => { open.value = false }
  }, {
    label: 'Médias',
    icon: 'i-lucide-image',
    to: '/admin/media',
    onSelect: () => { open.value = false }
  }]

  const secondary: NavigationMenuItem[] = [{
    label: 'Site public',
    icon: 'i-lucide-external-link',
    to: '/',
    target: '_blank'
  }]

  return [primary, secondary] satisfies NavigationMenuItem[][]
})

const groups = computed(() => [{
  id: 'links',
  label: 'Navigation',
  items: links.value.flat().map(item => ({
    label: item.label ?? '',
    icon: typeof item.icon === 'string' ? item.icon : undefined,
    to: item.to,
    target: item.target
  }))
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="heya-admin"
      v-model:open="open"
      collapsible
      resizable
      :ui="{
        root: 'bg-heya-neutral-50/80 border-default/70',
        footer: 'lg:border-t lg:border-default/60'
      }"
    >
      <template #header="{ collapsed }">
        <AdminBrandMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <AdminUserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />
  </UDashboardGroup>
</template>
