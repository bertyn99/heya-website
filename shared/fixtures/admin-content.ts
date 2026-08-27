import { comarkPreviewMarkdown } from '../content/comark-preview'
import type { AdminPageRecord, AdminPostRecord } from '../types/admin'

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 86_400_000).toISOString()
const daysAhead = (days: number) => new Date(now.getTime() + days * 86_400_000).toISOString()

export const mockAdminPages: AdminPageRecord[] = [
  {
    id: 'page-001',
    slug: 'accueil',
    title: 'Accueil',
    status: 'published',
    contentMd: comarkPreviewMarkdown,
    scheduledAt: null,
    publishedAt: daysAgo(45),
    updatedAt: daysAgo(3),
    seo: {
      metaTitle: 'Heya — Créer du lien en habitat partagé',
      metaDescription: 'Totem convivial et lampes relay pour relancer la vie sociale en résidence.',
      ogImage: null
    }
  },
  {
    id: 'page-002',
    slug: 'concept',
    title: 'Heya, c\'est quoi ?',
    status: 'published',
    contentMd: '::problem\n---\ntitle: L\'isolement en habitat partagé\n---\n::',
    scheduledAt: null,
    publishedAt: daysAgo(40),
    updatedAt: daysAgo(8),
    seo: {
      metaTitle: 'Le concept Heya',
      metaDescription: 'Comprendre le totem, les lampes relay et le parcours résident.',
      ogImage: null
    }
  },
  {
    id: 'page-003',
    slug: 'a-propos',
    title: 'Notre engagement',
    status: 'published',
    contentMd: '::values\n---\ntitle: Nos valeurs\n---\n::',
    scheduledAt: null,
    publishedAt: daysAgo(35),
    updatedAt: daysAgo(12),
    seo: {
      metaTitle: 'Notre engagement — Heya',
      metaDescription: 'Inclusivité, lutte contre l\'isolement, dépassement des barrières.',
      ogImage: null
    }
  },
  {
    id: 'page-004',
    slug: 'contact',
    title: 'Contact',
    status: 'draft',
    contentMd: '::contact-cta\n---\ntitle: Parlons de votre projet\n---\n::',
    scheduledAt: null,
    publishedAt: null,
    updatedAt: daysAgo(1),
    seo: null
  },
  {
    id: 'page-005',
    slug: 'mentions-legales',
    title: 'Mentions légales',
    status: 'published',
    contentMd: '::richtext\n## Mentions légales\n\nÉditeur : Heya Convivialité.\n::',
    scheduledAt: null,
    publishedAt: daysAgo(60),
    updatedAt: daysAgo(60),
    seo: {
      metaTitle: 'Mentions légales',
      metaDescription: '',
      ogImage: null
    }
  },
  {
    id: 'page-006',
    slug: 'solutions/residences-seniors',
    title: 'Résidences seniors',
    status: 'scheduled',
    contentMd: '::solution\n---\ntitle: Heya en résidence seniors\n---\n::',
    scheduledAt: daysAhead(5),
    publishedAt: null,
    updatedAt: daysAgo(2),
    seo: {
      metaTitle: 'Heya pour les résidences seniors',
      metaDescription: 'Relancer la convivialité dans les espaces communs.',
      ogImage: null
    }
  }
]

export const mockAdminPosts: AdminPostRecord[] = [
  {
    id: 'post-001',
    slug: 'residence-vie-sociale-3-mois',
    title: 'Comment une résidence a relancé la vie sociale en 3 mois',
    excerpt: 'Retour sur le déploiement Heya dans une résidence de 80 logements.',
    contentMd: '## Contexte\n\nUne résidence de 80 logements cherchait à relancer les échanges entre résidents.\n\n## Résultats\n\nEn trois mois, plus de 40 activités proposées spontanément.',
    coverPathname: '/images/blog/featured.png',
    category: 'Convivialité',
    status: 'published',
    scheduledAt: null,
    publishedAt: daysAgo(14),
    updatedAt: daysAgo(14),
    seo: {
      metaTitle: 'Vie sociale relancée en 3 mois',
      metaDescription: 'Étude de cas Heya en résidence seniors.',
      ogImage: null
    }
  },
  {
    id: 'post-002',
    slug: '5-activites-federer-residents',
    title: '5 activités pour fédérer les résidents',
    excerpt: 'Des idées simples pour lancer les premières rencontres.',
    contentMd: '## 1. Jeux de société\n\nCouleur bleue sur le totem.\n\n## 2. Café-discussions\n\nCouleur violette.',
    coverPathname: '/images/blog/thumb-1.png',
    category: 'Convivialité',
    status: 'published',
    scheduledAt: null,
    publishedAt: daysAgo(30),
    updatedAt: daysAgo(30),
    seo: {
      metaTitle: '5 activités pour fédérer les résidents',
      metaDescription: 'Idées d\'animations en habitat partagé.',
      ogImage: null
    }
  },
  {
    id: 'post-003',
    slug: 'totem-mode-emploi-equipes',
    title: 'Le totem Heya : mode d\'emploi pour les équipes',
    excerpt: 'Proposer une activité en 30 secondes.',
    contentMd: '## Étapes\n\n1. Choisir une couleur d\'activité.\n2. Valider sur le totem.\n3. Les lampes s\'allument.',
    coverPathname: '/images/blog/thumb-2.png',
    category: 'Produit',
    status: 'scheduled',
    scheduledAt: daysAhead(3),
    publishedAt: null,
    updatedAt: daysAgo(4),
    seo: {
      metaTitle: 'Mode d\'emploi totem Heya',
      metaDescription: 'Guide pour les équipes de résidence.',
      ogImage: null
    }
  },
  {
    id: 'post-004',
    slug: 'co-living-lien-spontane',
    title: 'Co-living : créer du lien entre colocataires',
    excerpt: 'Retour d\'expérience d\'un foyer jeunes travailleurs.',
    contentMd: '## Le défi\n\nDes colocataires qui ne se croisent jamais.\n\n## La solution Heya\n\nUn totem dans la cuisine commune.',
    coverPathname: null,
    category: 'Résidences',
    status: 'draft',
    scheduledAt: null,
    publishedAt: null,
    updatedAt: daysAgo(2),
    seo: null
  },
  {
    id: 'post-005',
    slug: 'couleurs-activites-code-heya',
    title: 'Le code couleur des activités Heya',
    excerpt: 'Bleu, jaune, orange, violet : à quoi correspondent les couleurs ?',
    contentMd: '## Le code\n\n- **Bleu** : jeux de société\n- **Jaune** : activité extérieure\n- **Orange** : activité manuelle\n- **Violet** : café / discussions',
    coverPathname: '/images/blog/thumb-3.png',
    category: 'Produit',
    status: 'draft',
    scheduledAt: null,
    publishedAt: null,
    updatedAt: daysAgo(0),
    seo: null
  }
]

export const mockPostCategories = [
  'Convivialité',
  'Résidences',
  'Produit',
  'Témoignages'
]

export const mockPageBlockTypes = [
  { type: 'hero', label: 'Hero', icon: 'i-lucide-sparkles' },
  { type: 'business-proof', label: 'Preuve sociale', icon: 'i-lucide-badge-check' },
  { type: 'problem', label: 'Problème', icon: 'i-lucide-circle-alert' },
  { type: 'how-it-works', label: 'Comment ça marche', icon: 'i-lucide-list-ordered' },
  { type: 'values', label: 'Valeurs', icon: 'i-lucide-heart-handshake' },
  { type: 'use-cases', label: 'Cas d\'usage', icon: 'i-lucide-building-2' },
  { type: 'testimonials', label: 'Témoignages', icon: 'i-lucide-quote' },
  { type: 'offers', label: 'Offres', icon: 'i-lucide-tags' },
  { type: 'contact-cta', label: 'CTA contact', icon: 'i-lucide-mail' },
  { type: 'solution', label: 'Solution', icon: 'i-lucide-lightbulb' },
  { type: 'richtext', label: 'Texte libre', icon: 'i-lucide-align-left' }
] as const
