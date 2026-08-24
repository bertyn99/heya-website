export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  image: string
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
    authorRole: 'Fondatrice, Heya',
    date: '12 juin 2026',
    readTime: '5 min',
    image: '/images/blog/featured.png',
    featured: true
  },
  {
    slug: '5-activites-federer-residents',
    title: '5 activités pour fédérer les résidents',
    excerpt: 'Des idées simples pour lancer les premières rencontres dans les espaces communs.',
    category: 'Convivialité',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '28 mai 2026',
    readTime: '4 min',
    image: '/images/blog/thumb-1.png'
  },
  {
    slug: 'totem-mode-emploi-equipes',
    title: 'Le totem Heya : mode d\'emploi pour les équipes',
    excerpt: 'Comment proposer une activité, choisir une couleur et lancer l\'animation en 30 secondes.',
    category: 'Produit',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '15 mai 2026',
    readTime: '3 min',
    image: '/images/blog/thumb-2.png'
  },
  {
    slug: 'co-living-lien-spontane',
    title: 'Co-living : créer du lien entre colocataires',
    excerpt: 'Retour d\'expérience d\'un foyer jeunes travailleurs qui a adopté Heya.',
    category: 'Résidences',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '2 mai 2026',
    readTime: '6 min',
    image: '/images/blog/thumb-3.png'
  },
  {
    slug: 'lutter-contre-isolement-etudes',
    title: 'Lutter contre l\'isolement : ce que disent les études',
    excerpt: 'Chiffres clés et bonnes pratiques pour les résidences et habitats partagés.',
    category: 'Convivialité',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '18 avr. 2026',
    readTime: '7 min',
    image: '/images/blog/thumb-4.png'
  },
  {
    slug: 'couleurs-activites-code-heya',
    title: 'Couleurs d\'activités : le code Heya expliqué',
    excerpt: 'Bleu, jaune, orange, violet : chaque couleur correspond à un type d\'activité.',
    category: 'Produit',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '5 avr. 2026',
    readTime: '2 min',
    image: '/images/blog/thumb-5.png'
  },
  {
    slug: 'temoignage-conciergerie',
    title: 'Témoignage : une conciergerie qui a changé de rythme',
    excerpt: '« On ne court plus après l\'info, les résidents se retrouvent d\'eux-mêmes. »',
    category: 'Témoignages',
    author: 'Élise Furnon',
    authorRole: 'Fondatrice, Heya',
    date: '22 mars 2026',
    readTime: '5 min',
    image: '/images/blog/thumb-6.png'
  }
]

export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}
