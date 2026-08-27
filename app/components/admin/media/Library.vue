<script setup lang="ts">
import type { BlobRow } from '#shared/types/db'
import { mediaPublicUrl } from '#shared/media-url'
import { refDebounced } from '@vueuse/core'
import { apiErrorMessage } from '~/utils/api-error'
import { toIsoString } from '~/utils/serialize-date'

withDefaults(defineProps<{
  selectable?: boolean
}>(), {
  selectable: false
})

const emit = defineEmits<{
  select: [pathname: string]
}>()

const toast = useToast()
const { loggedIn } = useUserSession()

const search = ref('')
const q = refDebounced(search, 300)
const files = ref<File[]>([])
const uploading = ref(false)
const pendingDelete = ref<string | null>(null)
const deleting = ref(false)
const savingAlt = ref<string | null>(null)
const altDrafts = reactive<Record<string, string>>({})
const altServer = reactive<Record<string, string>>({})

const deleteOpen = computed({
  get: () => Boolean(pendingDelete.value),
  set: (open: boolean) => {
    if (!open) {
      pendingDelete.value = null
    }
  }
})

const query = computed(() => ({
  ...(q.value.trim() ? { q: q.value.trim() } : {}),
  limit: 100
}))

const { data: blobs, status, error, refresh } = useFetch<BlobRow[]>('/api/admin/media', {
  query,
  server: false,
  default: () => []
})

watch(blobs, (items) => {
  for (const item of items ?? []) {
    const serverAlt = item.alt
    const draft = altDrafts[item.pathname]
    const lastServer = altServer[item.pathname]

    if (draft === undefined || draft === lastServer) {
      altDrafts[item.pathname] = serverAlt
    }

    altServer[item.pathname] = serverAlt
  }
}, { immediate: true })

watch(loggedIn, (value) => {
  if (value) {
    void refresh()
  }
}, { immediate: true })

function mediaApiPath(pathname: string) {
  return `/api/admin/media/${pathname.split('/').map(encodeURIComponent).join('/')}`
}

async function uploadFiles(selected: File[]) {
  const form = new FormData()
  for (const file of selected) {
    form.append('files', file)
  }

  uploading.value = true
  try {
    await $fetch('/api/admin/media', {
      method: 'POST',
      body: form
    })
    toast.add({ title: 'Médias ajoutés', color: 'success' })
    await refresh()
  } catch (uploadError) {
    toast.add({
      title: 'Upload impossible',
      description: apiErrorMessage(uploadError, 'Vérifiez le format (JPEG, PNG, WebP) et la taille (8 Mo).'),
      color: 'error'
    })
  } finally {
    files.value = []
    uploading.value = false
  }
}

watch(files, (next) => {
  if (next.length > 0) {
    void uploadFiles(next)
  }
})

async function saveAlt(item: BlobRow) {
  const alt = altDrafts[item.pathname] ?? ''
  if (item.alt === alt) {
    return
  }

  savingAlt.value = item.pathname
  try {
    await $fetch(mediaApiPath(item.pathname), {
      method: 'PATCH',
      body: { alt }
    })
    altServer[item.pathname] = alt
    await refresh()
  } catch (patchError) {
    toast.add({
      title: 'Texte alternatif',
      description: apiErrorMessage(patchError),
      color: 'error'
    })
  } finally {
    savingAlt.value = null
  }
}

async function confirmDelete() {
  if (!pendingDelete.value) {
    return
  }

  deleting.value = true
  try {
    await $fetch(mediaApiPath(pendingDelete.value), {
      method: 'DELETE'
    })
    toast.add({ title: 'Média supprimé', color: 'success' })
    pendingDelete.value = null
    await refresh()
  } catch (deleteError) {
    toast.add({
      title: 'Suppression impossible',
      description: apiErrorMessage(deleteError),
      color: 'error'
    })
  } finally {
    deleting.value = false
  }
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} o`
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} Ko`
  }
  return `${(size / (1024 * 1024)).toFixed(1)} Mo`
}

function createdLabel(item: BlobRow) {
  const iso = toIsoString(item.createdAt)
  return iso ? new Date(iso).toLocaleDateString('fr-FR') : null
}
</script>

<template>
  <div class="space-y-4">
    <UFileUpload
      v-model="files"
      multiple
      accept="image/jpeg,image/png,image/webp"
      icon="i-lucide-image"
      label="Déposer des images"
      description="JPEG, PNG ou WebP — 8 Mo max"
      :disabled="uploading"
      class="w-full min-h-36"
    />

    <div class="flex flex-wrap items-center justify-between gap-2">
      <UInput
        v-model="search"
        class="max-w-sm"
        icon="i-lucide-search"
        placeholder="Rechercher un média..."
      />
      <p class="text-sm text-muted">
        {{ blobs.length }} fichier(s)
      </p>
    </div>

    <div
      v-if="status === 'pending' && blobs.length === 0"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <USkeleton
        v-for="n in 6"
        :key="n"
        class="h-48 w-full"
      />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      title="Médias indisponibles"
      :description="apiErrorMessage(error, 'Impossible de charger la médiathèque.')"
    />

    <p
      v-else-if="blobs.length === 0"
      class="rounded-xl border border-dashed border-default px-4 py-10 text-center text-sm text-muted"
    >
      Aucun média pour l'instant. Ajoutez une image ci-dessus.
    </p>

    <ul
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="item in blobs"
        :key="item.pathname"
        class="overflow-hidden rounded-xl border border-default/70 bg-default shadow-sm"
      >
        <button
          v-if="selectable"
          type="button"
          class="block w-full"
          @click="emit('select', item.pathname)"
        >
          <img
            :src="mediaPublicUrl(item.pathname)"
            :alt="item.alt || item.pathname"
            class="h-40 w-full object-cover"
          >
        </button>
        <img
          v-else
          :src="mediaPublicUrl(item.pathname)"
          :alt="item.alt || item.pathname"
          class="h-40 w-full object-cover"
        >

        <div class="space-y-2 p-3">
          <p
            class="truncate text-xs text-muted"
            :title="item.pathname"
          >
            {{ item.pathname }}
          </p>
          <p class="text-xs text-muted">
            {{ formatSize(item.size) }}
            <span v-if="createdLabel(item)">
              · {{ createdLabel(item) }}
            </span>
          </p>
          <UInput
            v-model="altDrafts[item.pathname]"
            placeholder="Texte alternatif"
            size="sm"
            :loading="savingAlt === item.pathname"
            @blur="saveAlt(item)"
          />
          <div class="flex justify-end gap-1">
            <UButton
              v-if="selectable"
              size="xs"
              label="Choisir"
              @click="emit('select', item.pathname)"
            />
            <UButton
              v-else
              size="xs"
              color="error"
              variant="ghost"
              icon="i-lucide-trash"
              aria-label="Supprimer"
              @click="pendingDelete = item.pathname"
            />
          </div>
        </div>
      </li>
    </ul>

    <UModal
      v-model:open="deleteOpen"
      title="Supprimer ce média ?"
      description="Le fichier sera retiré du stockage et de la médiathèque."
    >
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="neutral"
            variant="ghost"
            label="Annuler"
            @click="pendingDelete = null"
          />
          <UButton
            color="error"
            label="Supprimer"
            :loading="deleting"
            @click="confirmDelete"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
