import type { z } from 'zod'
import {
  blockSchemas,
  type BlockType,
  type PageBlock
} from '../schemas/blocks'
import type { SeoInput } from '../schemas/content'
import { createPageBlock } from './block-catalog'
import { blocksToComark } from './comark-blocks'

const CAL_URL = 'https://cal.com/elise-croguennoc/temps-d-echange'

function catalogBlock<T extends BlockType>(
  type: T,
  props?: Partial<z.infer<(typeof blockSchemas)[T]>>,
  body?: string
): PageBlock {
  const base = createPageBlock(type)
  const parsed = blockSchemas[type].parse({
    ...base.props,
    ...props
  })
  const nextBody = body ?? base.body

  return {
    type,
    props: parsed,
    ...(nextBody ? { body: nextBody } : {})
  } as PageBlock
}

function compose(...blocks: PageBlock[]) {
  return blocksToComark(blocks)
}

function composeTypes(...types: BlockType[]) {
  return blocksToComark(types.map(type => createPageBlock(type)))
}

const MENTIONS_MD = `## Éditeur

Le site **heyaconvivialite.fr** est édité par Heya — Fabrique des Collectifs, projet porté par Elise Furnon, basée à Nantes, Pays de la Loire.

Contact : [elise@heyaconvivialite.fr](mailto:elise@heyaconvivialite.fr) · 06 76 72 14 67

## Hébergement

Le site est destiné à être hébergé en France (Cloudflare). Les coordonnées précises de l'hébergeur seront indiquées à la mise en production.

## Propriété intellectuelle

Textes, visuels, marque et éléments graphiques de Heya sont protégés. Toute reproduction non autorisée est interdite.`

const POLITIQUE_MD = `Heya collecte uniquement les informations nécessaires pour répondre à une demande de démo, de devis ou de rendez-vous.

## Données collectées

Formulaire de contact : prénom, nom, email, téléphone (optionnel), type de résidence, durée de test envisagée, message.

## Finalité

Traiter votre demande et vous recontacter sous 24h. Aucune revente, aucun envoi publicitaire non sollicité.

## Conservation et droits

Les données sont conservées le temps du suivi commercial, puis supprimées. Pour accéder, rectifier ou supprimer vos données : [elise@heyaconvivialite.fr](mailto:elise@heyaconvivialite.fr).

## Cookies

Ce site n'utilise pas de cookies publicitaires. Seuls des cookies techniques éventuellement nécessaires au fonctionnement peuvent être déposés.`

export type SeedPageDef = {
  slug: string
  title: string
  contentMd: string
  seo: SeoInput
}

export type SeedPostDef = {
  slug: string
  title: string
  excerpt: string
  contentMd: string
  coverPathname: string | null
  category: string
  status: 'published' | 'scheduled' | 'draft'
  publishedDaysAgo: number | null
  scheduledDaysAhead: number | null
  seo?: SeoInput
}

export const SEED_PAGES: SeedPageDef[] = [
  {
    slug: 'accueil',
    title: 'Accueil',
    contentMd: composeTypes(
      'hero',
      'business-proof',
      'problem',
      'how-it-works',
      'values',
      'use-cases',
      'testimonials',
      'offers',
      'contact-cta'
    ),
    seo: {
      metaTitle: 'Heya — Créer du lien en habitat partagé',
      metaDescription: 'Totem, lampes relay et dashboard pour relancer la vie sociale en habitat partagé. Résidences seniors, étudiantes, co-living, habitat inclusif.',
      ogImage: null
    }
  },
  {
    slug: 'concept',
    title: 'Le concept',
    contentMd: compose(
      catalogBlock('hero', {
        headline: 'Le concept',
        title: 'Créer du lien en habitat partagé',
        description: 'Un totem dans l\'espace commun, des lampes dans chaque appartement. Les résidents proposent des activités, les lampes s\'allument, le lien se crée.',
        layout: 'center',
        links: [
          { label: 'Découvrir le produit', to: '#produits', target: '_self' },
          {
            label: 'Prendre rendez-vous',
            to: CAL_URL,
            target: '_blank',
            color: 'neutral',
            variant: 'outline'
          }
        ]
      }),
      createPageBlock('products'),
      createPageBlock('how-it-works'),
      createPageBlock('media'),
      createPageBlock('stats'),
      createPageBlock('activities'),
      createPageBlock('install'),
      createPageBlock('contact-cta')
    ),
    seo: {
      metaTitle: 'Heya c\'est quoi ? | Totem, lampes relay et dashboard',
      metaDescription: 'Découvrez le concept Heya : totem dans l\'espace commun, lampe relay dans chaque logement, 4 couleurs d\'activités, dashboard pour les équipes.',
      ogImage: null
    }
  },
  {
    slug: 'a-propos',
    title: 'Notre engagement',
    contentMd: compose(
      catalogBlock('hero', {
        headline: 'Notre engagement',
        title: 'Une aventure née d\'une conviction',
        description: 'Heya est né d\'une conviction simple : en habitat partagé, le lien social ne devrait pas dépendre d\'un affichage mal lu ou d\'une application de plus. Notre mission est de rendre la convivialité visible, accessible et mesurable.',
        layout: 'split',
        image: '/images/about/hero-circle.png',
        links: [
          {
            label: 'Découvrir notre mission',
            to: '#mission',
            target: '_self',
            icon: 'i-lucide-arrow-down'
          }
        ]
      }),
      createPageBlock('timeline'),
      createPageBlock('missions'),
      createPageBlock('founder'),
      createPageBlock('awards'),
      catalogBlock('business-proof', {
        title: 'Ils nous soutiennent',
        partners: [
          { name: 'Gérontopôle Autonomie Longévité', logo: '/images/partners/gerontopole.png' },
          { name: 'Nantes Métropole Habitat', logo: '/images/partners/nantes-metropole-habitat.png' },
          { name: 'Pépite Pays de la Loire', logo: '/images/partners/pepite-pays-de-la-loire.png' },
          { name: 'Startups & Innovation Day', logo: '/images/partners/startups-innovation-day.png' },
          { name: 'Équipe Heya', logo: '/images/partners/equipe.png' }
        ]
      }),
      catalogBlock('contact-cta', {
        title: 'Prêt à transformer votre résidence ?',
        description: 'Découvrez comment Heya peut aider votre équipe à gagner du temps et à recréer du lien entre les résidents.'
      })
    ),
    seo: {
      metaTitle: 'Notre engagement | Réenchanter le quotidien en habitat partagé',
      metaDescription: 'Heya, né à Nantes en 2023 : mission, valeurs et parcours d\'Elise Furnon. Lutter contre l\'isolement, créer du lien en habitat partagé.',
      ogImage: null
    }
  },
  {
    slug: 'contact',
    title: 'Contact',
    contentMd: compose(
      catalogBlock('hero', {
        headline: 'Contact',
        title: 'Parlons de votre habitat partagé',
        description: 'Demandez une démo personnalisée, un devis pour une période de test (3, 6 ou 12 mois), ou un rendez-vous avec l\'équipe Heya. Nous répondons sous 24h.',
        layout: 'center',
        links: [
          {
            label: 'Prendre rendez-vous',
            to: CAL_URL,
            target: '_blank',
            icon: 'i-lucide-calendar'
          },
          {
            label: 'Remplir le formulaire',
            to: '#contact',
            target: '_self',
            color: 'neutral',
            variant: 'outline'
          }
        ]
      }),
      createPageBlock('contact-cta'),
      createPageBlock('contact-form')
    ),
    seo: {
      metaTitle: 'Contact | Demande de démo et devis',
      metaDescription: 'Contactez Heya pour une démo, un devis Test/Location/Achat ou un rendez-vous avec Elise Furnon. Réponse sous 24h.',
      ogImage: null
    }
  },
  {
    slug: 'mentions-legales',
    title: 'Mentions légales',
    contentMd: compose(
      catalogBlock('hero', {
        headline: 'Légal',
        title: 'Mentions légales',
        layout: 'center',
        description: '',
        links: []
      }),
      catalogBlock('richtext', {}, MENTIONS_MD)
    ),
    seo: {
      metaTitle: 'Mentions légales',
      metaDescription: 'Éditeur, hébergeur et contacts légaux du site heyaconvivialite.fr.',
      ogImage: null
    }
  },
  {
    slug: 'politique-de-confidentialite',
    title: 'Politique de confidentialité',
    contentMd: compose(
      catalogBlock('hero', {
        headline: 'Légal',
        title: 'Politique de confidentialité',
        layout: 'center',
        description: '',
        links: []
      }),
      catalogBlock('richtext', {}, POLITIQUE_MD)
    ),
    seo: {
      metaTitle: 'Politique de confidentialité',
      metaDescription: 'Comment Heya traite les données du formulaire de contact et des demandes de démo.',
      ogImage: null
    }
  },
  {
    slug: 'solutions/residences-seniors',
    title: 'Résidences seniors',
    contentMd: compose(catalogBlock('solution', { slug: 'residences-seniors' })),
    seo: {
      metaTitle: 'Animation résidence seniors | Heya',
      metaDescription: 'Heya aide les résidences seniors à lutter contre l\'isolement : totem convivial, signal lumineux, dashboard pour la direction.',
      ogImage: null
    }
  },
  {
    slug: 'solutions/co-living',
    title: 'Co-living',
    contentMd: compose(catalogBlock('solution', { slug: 'co-living' })),
    seo: {
      metaTitle: 'Animer un habitat partagé | Heya',
      metaDescription: 'Heya facilite la vie collective en co-living : activités visibles au totem, signal dans chaque logement, dashboard.',
      ogImage: null
    }
  },
  {
    slug: 'solutions/residences-etudiantes',
    title: 'Résidences étudiantes',
    contentMd: compose(catalogBlock('solution', { slug: 'residences-etudiantes' })),
    seo: {
      metaTitle: 'Lutter contre l\'isolement en résidence étudiante | Heya',
      metaDescription: 'Heya aide les résidences étudiantes et CROUS à créer du lien : totem convivial, sans app ni barrière numérique.',
      ogImage: null
    }
  },
  {
    slug: 'solutions/habitat-inclusif',
    title: 'Habitat inclusif',
    contentMd: compose(catalogBlock('solution', { slug: 'habitat-inclusif' })),
    seo: {
      metaTitle: 'Lien social en habitat inclusif | Heya',
      metaDescription: 'Heya favorise la convivialité en habitat inclusif : interface accessible, signal lumineux, sans app ni QR code.',
      ogImage: null
    }
  }
]

export const SEED_POSTS: SeedPostDef[] = [
  {
    slug: 'residence-vie-sociale-3-mois',
    title: 'Comment une résidence a relancé la vie sociale en 3 mois',
    excerpt: 'Retour sur le déploiement Heya dans une résidence de 80 logements.',
    contentMd: '## Contexte\n\nUne résidence de 80 logements cherchait à relancer les échanges entre résidents.\n\n## Résultats\n\nEn trois mois, plus de 40 activités proposées spontanément.',
    coverPathname: '/images/blog/featured.png',
    category: 'Convivialité',
    status: 'published',
    publishedDaysAgo: 14,
    scheduledDaysAhead: null,
    seo: {
      metaTitle: 'Vie sociale relancée en 3 mois',
      metaDescription: 'Étude de cas Heya en résidence seniors.',
      ogImage: null
    }
  },
  {
    slug: '5-activites-federer-residents',
    title: '5 activités pour fédérer les résidents',
    excerpt: 'Des idées simples pour lancer les premières rencontres.',
    contentMd: '## 1. Jeux de société\n\nCouleur bleue sur le totem.\n\n## 2. Café-discussions\n\nCouleur violette.',
    coverPathname: '/images/blog/thumb-1.png',
    category: 'Convivialité',
    status: 'published',
    publishedDaysAgo: 30,
    scheduledDaysAhead: null,
    seo: {
      metaTitle: '5 activités pour fédérer les résidents',
      metaDescription: 'Idées d\'animations en habitat partagé.',
      ogImage: null
    }
  },
  {
    slug: 'totem-mode-emploi-equipes',
    title: 'Le totem Heya : mode d\'emploi pour les équipes',
    excerpt: 'Proposer une activité en 30 secondes.',
    contentMd: '## Étapes\n\n1. Choisir une couleur d\'activité.\n2. Valider sur le totem.\n3. Les lampes s\'allument.',
    coverPathname: '/images/blog/thumb-2.png',
    category: 'Produit',
    status: 'scheduled',
    publishedDaysAgo: null,
    scheduledDaysAhead: 3,
    seo: {
      metaTitle: 'Mode d\'emploi totem Heya',
      metaDescription: 'Guide pour les équipes de résidence.',
      ogImage: null
    }
  },
  {
    slug: 'co-living-lien-spontane',
    title: 'Co-living : créer du lien entre colocataires',
    excerpt: 'Retour d\'expérience d\'un foyer jeunes travailleurs.',
    contentMd: '## Le défi\n\nDes colocataires qui ne se croisent jamais.\n\n## La solution Heya\n\nUn totem dans la cuisine commune.',
    coverPathname: null,
    category: 'Résidences',
    status: 'draft',
    publishedDaysAgo: null,
    scheduledDaysAhead: null
  },
  {
    slug: 'couleurs-activites-code-heya',
    title: 'Le code couleur des activités Heya',
    excerpt: 'Bleu, jaune, orange, violet : à quoi correspondent les couleurs ?',
    contentMd: '## Le code\n\n- **Bleu** : jeux de société\n- **Jaune** : activité extérieure\n- **Orange** : activité manuelle\n- **Violet** : café / discussions',
    coverPathname: '/images/blog/thumb-3.png',
    category: 'Produit',
    status: 'draft',
    publishedDaysAgo: null,
    scheduledDaysAhead: null
  }
]
