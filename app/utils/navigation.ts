export interface NavItem {
  label: string
  to: string
  external?: boolean
}

export const mainNav: NavItem[] = [
  { label: 'Comment ça marche', to: '/#comment-ca-marche' },
  { label: 'Heya c\'est quoi', to: '/concept' },
  { label: 'Notre engagement', to: '/a-propos' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' }
]

export const footerProjectLinks: NavItem[] = [
  { label: 'Comment ça marche', to: '/#comment-ca-marche' },
  { label: 'Offres', to: '/#offres' },
  { label: 'Heya c\'est quoi', to: '/concept' },
  { label: 'Notre engagement', to: '/a-propos' },
  { label: 'Contact', to: '/contact' }
]

export const solutionLinks = [
  { label: 'Résidences Seniors', to: '/solutions/residences-seniors', color: 'text-heya-violet' },
  { label: 'Co-living', to: '/solutions/co-living', color: 'text-heya-step-green-fg' },
  { label: 'Étudiants', to: '/solutions/residences-etudiantes', color: 'text-heya-step-blue-fg' },
  { label: 'Inclusif', to: '/solutions/habitat-inclusif', color: 'text-heya-orange' }
]

export const CAL_COM_URL = 'https://cal.com/elise-croguennoc/temps-d-echange'
