const LABELS: Record<string, string> = {
  general: 'Général',
  seo: 'SEO',
  content: 'Contenu',
  blocks: 'Blocs',
  cover: 'Couverture'
}

export function contentFieldLabel(key: string): string {
  return LABELS[key] ?? key
}
