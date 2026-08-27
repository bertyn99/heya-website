<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import {
  ICON_LIBRARIES,
  filterIconNames,
  iconifyName,
  loadIconNames,
  parseIconifyName,
  type IconLibraryPrefix
} from '#shared/content/icon-libraries'

const model = defineModel<string>({ default: '' })

defineProps<{
  label: string
  hint?: string
}>()

const open = ref(false)
const query = ref('')
const prefix = ref<IconLibraryPrefix>('lucide')
const names = ref<string[]>([])
const loading = ref(false)
const GRID_LIMIT = 160

const libraryItems: TabsItem[] = ICON_LIBRARIES.map(library => ({
  label: library.label,
  value: library.prefix
}))

const parsed = computed(() => parseIconifyName(model.value))

const visibleNames = computed(() => {
  return filterIconNames(names.value, query.value).slice(0, GRID_LIMIT)
})

const remainingCount = computed(() => {
  return Math.max(0, filterIconNames(names.value, query.value).length - visibleNames.value.length)
})

watch([open, prefix], async ([isOpen, currentPrefix]) => {
  if (!isOpen) {
    return
  }
  loading.value = true
  names.value = await loadIconNames(currentPrefix)
  loading.value = false
})

watch(open, (isOpen) => {
  if (!isOpen) {
    return
  }
  const current = parsed.value
  if (current) {
    prefix.value = current.prefix
  }
  query.value = ''
})

function selectIcon(name: string) {
  model.value = iconifyName(prefix.value, name)
  open.value = false
}

function clearIcon() {
  model.value = ''
}
</script>

<template>
  <UFormField
    :label="label"
    :hint="hint"
  >
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-default bg-heya-neutral-50 text-primary transition hover:border-primary/40"
        :aria-label="model ? `Changer l'icône ${model}` : 'Choisir une icône'"
        @click="open = true"
      >
        <UIcon
          v-if="model"
          :name="model"
          class="size-5"
        />
        <UIcon
          v-else
          name="i-lucide-smile-plus"
          class="size-5 text-dimmed"
        />
      </button>
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="sm"
        icon="i-lucide-layout-grid"
        label="Choisir"
        class="min-w-0 flex-1"
        @click="open = true"
      />
      <UButton
        v-if="model"
        type="button"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-trash-2"
        aria-label="Retirer l'icône"
        @click="clearIcon"
      />
    </div>
    <p
      v-if="model"
      class="mt-1.5 truncate text-xs text-muted"
    >
      {{ model }}
    </p>
  </UFormField>

  <UModal
    v-model:open="open"
    title="Choisir une icône"
    description="Lucide, Heroicons ou Phosphor. Cliquez une icône pour l'utiliser."
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #body>
      <div class="space-y-3">
        <UInput
          v-model="query"
          icon="i-lucide-search"
          placeholder="Rechercher, ex. users, heart, home"
        />
        <UTabs
          v-model="prefix"
          :items="libraryItems"
          variant="link"
          color="primary"
          size="sm"
          :content="false"
          class="w-full"
        />
        <p
          v-if="loading"
          class="py-10 text-center text-sm text-muted"
        >
          Chargement des icônes…
        </p>
        <div
          v-else
          class="max-h-[22rem] overflow-y-auto"
        >
          <div class="grid grid-cols-6 gap-1 sm:grid-cols-8">
            <button
              v-for="name in visibleNames"
              :key="name"
              type="button"
              class="flex size-10 items-center justify-center rounded-lg text-highlighted transition hover:bg-primary/10 hover:text-primary"
              :class="parsed?.prefix === prefix && parsed.name === name ? 'bg-primary/15 text-primary ring-1 ring-primary/40' : ''"
              :title="name"
              :aria-label="name"
              @click="selectIcon(name)"
            >
              <UIcon
                :name="iconifyName(prefix, name)"
                class="size-5"
              />
            </button>
          </div>
          <p
            v-if="!visibleNames.length"
            class="py-8 text-center text-sm text-muted"
          >
            Aucune icône ne correspond.
          </p>
          <p
            v-else-if="remainingCount"
            class="mt-3 text-center text-xs text-muted"
          >
            {{ remainingCount }} autres. Affinez la recherche.
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
