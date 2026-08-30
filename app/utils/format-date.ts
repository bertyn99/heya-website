import { toIsoString } from './serialize-date'

export function formatFrDate(value: unknown) {
  const iso = toIsoString(value)
  if (!iso) {
    return ''
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(iso))
}

export function readingTimeMinutes(markdown: string) {
  const words = markdown
    .replace(/::[\s\S]*?::/gu, ' ')
    .split(/\s+/u)
    .filter(Boolean)
    .length

  return Math.max(1, Math.round(words / 200))
}
