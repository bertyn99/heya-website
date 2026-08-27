export const ICON_LIBRARIES = [
  { prefix: 'lucide', label: 'Lucide' },
  { prefix: 'heroicons', label: 'Heroicons' },
  { prefix: 'ph', label: 'Phosphor' }
] as const

export type IconLibraryPrefix = (typeof ICON_LIBRARIES)[number]['prefix']

const FALLBACK_NAMES: Record<IconLibraryPrefix, string[]> = {
  lucide: [
    'users', 'users-round', 'heart', 'heart-handshake', 'home', 'building-2', 'sparkles',
    'calendar', 'mail', 'phone', 'map-pin', 'check', 'circle-alert', 'lightbulb', 'lamp',
    'scroll', 'file-check', 'tags', 'quote', 'hand-heart', 'accessibility', 'globe',
    'graduation-cap', 'bell', 'coffee', 'gamepad-2', 'paintbrush', 'arrow-right'
  ],
  heroicons: [
    'users', 'user-group', 'heart', 'home', 'building-office-2', 'sparkles', 'calendar',
    'envelope', 'phone', 'map-pin', 'check', 'exclamation-circle', 'light-bulb', 'tag',
    'chat-bubble-left-right', 'globe-alt', 'academic-cap', 'bell'
  ],
  ph: [
    'users', 'users-three', 'heart', 'house', 'buildings', 'sparkle', 'calendar', 'envelope',
    'phone', 'map-pin', 'check', 'warning-circle', 'lightbulb', 'tag', 'chats-circle', 'globe',
    'graduation-cap', 'bell'
  ]
}

const collectionCache = new Map<IconLibraryPrefix, string[]>()

function isIconLibraryPrefix(value: string): value is IconLibraryPrefix {
  return ICON_LIBRARIES.some(library => library.prefix === value)
}

export function iconifyName(prefix: IconLibraryPrefix, name: string) {
  return `i-${prefix}-${name}`
}

export function parseIconifyName(value: string): { prefix: IconLibraryPrefix, name: string } | null {
  const match = value.trim().match(/^i-([a-z0-9]+)-(.+)$/)
  if (!match) {
    return null
  }
  const prefix = match[1]
  const name = match[2]
  if (!prefix || !name || !isIconLibraryPrefix(prefix)) {
    return null
  }
  return { prefix, name }
}

export async function loadIconNames(prefix: IconLibraryPrefix): Promise<string[]> {
  const cached = collectionCache.get(prefix)
  if (cached) {
    return cached
  }

  try {
    const response = await fetch(`https://api.iconify.design/collection?prefix=${prefix}`)
    if (!response.ok) {
      throw new Error(`Iconify ${prefix} ${response.status}`)
    }
    const data = await response.json() as {
      uncategorized?: string[]
      categories?: Record<string, string[]>
    }
    const names = [
      ...(data.uncategorized ?? []),
      ...Object.values(data.categories ?? {}).flat()
    ].filter((name, index, list) => list.indexOf(name) === index)

    if (!names.length) {
      throw new Error(`Empty Iconify collection ${prefix}`)
    }

    collectionCache.set(prefix, names)
    return names
  } catch {
    return FALLBACK_NAMES[prefix]
  }
}

export function filterIconNames(names: string[], query: string) {
  const needle = query.trim().toLowerCase().replaceAll(/\s+/g, '-')
  if (!needle) {
    return names
  }
  return names.filter(name => name.includes(needle))
}
