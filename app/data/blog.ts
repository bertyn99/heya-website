export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  featured?: boolean
}

export const blogCategories = [
  'Tous',
  'Convivialité',
  'Résidences',
  'Produit',
  'Témoignages'
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'residence-vie-sociale-3-mois',
    title: 'Comment une résidence a relancé la vie sociale en 3 mois',
    excerpt: 'Retour sur le déploiement Heya dans une résidence de 80 logements : totem, lampes, premières activités et impact sur l\'isolement.',
    category: 'Convivialité',
    author: 'Élise Furnon',
    date: '12 juin 2026',
    readTime: '5 min',
    featured: true
  },
  {
    slug: '5-activites-federer-residents',
    title: '5 activités pour fédérer les résidents',
    excerpt: 'Des idées simples pour lancer les premières rencontres dans les espaces communs.',
    category: 'Convivialité',
    author: 'Élise Furnon',
    date: '28 mai 2026',
    readTime: '4 min'
  },
  {
    slug: 'totem-mode-emploi-equipes',
    title: 'Le totem Heya : mode d\'emploi pour les équipes',
    excerpt: 'Comment former votre conciergerie en 1h et lancer les premières activités.',
    category: 'Produit',
    author: 'Élise Furnon',
    date: '15 mai 2026',
    readTime: '6 min'
  },
  {
    slug: 'co-living-lien-spontane',
    title: 'Co-living : créer du lien sans WhatsApp',
    excerpt: 'Pourquoi les groupes de messagerie ne suffisent pas et comment Heya complète la vie collective.',
    category: 'Résidences',
    author: 'Élise Furnon',
    date: '2 mai 2026',
    readTime: '4 min'
  },
  {
    slug: 'etudiants-internationaux',
    title: 'Étudiants internationaux : un signal universel',
    excerpt: 'Comment la lampe relay dépasse les barrières de langue dans les résidences étudiantes.',
    category: 'Résidences',
    author: 'Élise Furnon',
    date: '20 avril 2026',
    readTime: '5 min'
  },
  {
    slug: 'habitat-inclusif-accessibilite',
    title: 'Habitat inclusif : au-delà de la fracture numérique',
    excerpt: 'Des outils physiques pour une inclusion réelle, sans écran ni application obligatoire.',
    category: 'Témoignages',
    author: 'Élise Furnon',
    date: '8 avril 2026',
    readTime: '5 min'
  }
]

export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}
