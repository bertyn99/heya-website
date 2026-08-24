<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { CAL_COM_URL, mainNav } from '~/utils/navigation'

const items = computed<NavigationMenuItem[]>(() =>
  mainNav.map(item => ({
    label: item.label,
    to: item.to
  }))
)
</script>

<template>
  <UHeader title="Heya">
    <template #title>
      <img
        src="/images/brand/heya-wordmark.png"
        alt="Heya"
        class="h-9 w-auto"
        width="49"
        height="36"
      >
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      class="hidden lg:flex"
    />

    <template #right>
      <UButton
        :to="CAL_COM_URL"
        target="_blank"
        size="sm"
        class="hidden rounded-full px-6 sm:inline-flex"
      >
        Prendre rendez-vous
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        :to="CAL_COM_URL"
        target="_blank"
        block
        class="mt-4 rounded-full"
      >
        Prendre rendez-vous
      </UButton>
    </template>
  </UHeader>
</template>
