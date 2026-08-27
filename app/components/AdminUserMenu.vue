<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const { user, signOut } = useUserSession()

const displayName = computed(() => user.value?.name || user.value?.email || 'Éditeur')

const items = computed<DropdownMenuItem[][]>(() => ([[{
  type: 'label',
  label: displayName.value,
  avatar: {
    alt: displayName.value,
    icon: 'i-lucide-user'
  }
}], [{
  label: 'Se déconnecter',
  icon: 'i-lucide-log-out',
  onSelect: async () => {
    await signOut()
    await navigateTo('/admin/login')
  }
}]]))
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      :label="collapsed ? undefined : displayName"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      icon="i-lucide-user"
      class="data-[state=open]:bg-elevated"
      :ui="{ trailingIcon: 'text-dimmed' }"
    />
  </UDropdownMenu>
</template>
