import {
  blockSchemas,
  type BlockType,
  type PageBlock
} from '../schemas/blocks'

export type BlockFieldKind
  = | 'text'
    | 'textarea'
    | 'image'
    | 'icon'
    | 'url'
    | 'select'
    | 'toggle'
    | 'richtext'
    | 'string-list'
    | 'repeat'

export interface BlockFieldOption {
  label: string
  value: string
}

export interface BlockField {
  key: string
  label: string
  kind: BlockFieldKind
  hint?: string
  options?: BlockFieldOption[]
  itemLabel?: string
  addLabel?: string
  itemFields?: BlockField[]
  itemDefaults?: Record<string, unknown>
}

export interface BlockDefinition {
  type: BlockType
  label: string
  description: string
  icon: string
  defaults: Record<string, unknown>
  defaultBody?: string
  fields: BlockField[]
  /** Hidden from the insert library. Existing pages can still contain the block. */
  insertable?: boolean
}

const TONE_OPTIONS: BlockFieldOption[] = [
  { label: 'Bleu', value: 'blue' },
  { label: 'Or', value: 'gold' },
  { label: 'Vert', value: 'green' }
]

const SOLUTION_OPTIONS: BlockFieldOption[] = [
  { label: 'Résidences seniors', value: 'residences-seniors' },
  { label: 'Co-living', value: 'co-living' },
  { label: 'Résidences étudiantes', value: 'residences-etudiantes' },
  { label: 'Habitat inclusif', value: 'habitat-inclusif' }
]

const BUTTON_COLOR_OPTIONS: BlockFieldOption[] = [
  { label: 'Primaire', value: 'primary' },
  { label: 'Secondaire', value: 'secondary' },
  { label: 'Neutre', value: 'neutral' },
  { label: 'Succès', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Attention', value: 'warning' },
  { label: 'Erreur', value: 'error' }
]

const BUTTON_VARIANT_OPTIONS: BlockFieldOption[] = [
  { label: 'Plein', value: 'solid' },
  { label: 'Contour', value: 'outline' },
  { label: 'Doux', value: 'soft' },
  { label: 'Subtil', value: 'subtle' },
  { label: 'Fantôme', value: 'ghost' },
  { label: 'Lien', value: 'link' }
]

const CAL_URL = 'https://cal.com/elise-croguennoc/temps-d-echange'

export const BLOCK_CATALOG: Record<BlockType, BlockDefinition> = {
  'hero': {
    type: 'hero',
    label: 'Hero',
    description: 'Titre, texte et boutons en haut de page',
    icon: 'i-lucide-sparkles',
    defaults: {
      headline: '',
      title: 'Créer du lien en habitat partagé',
      description: 'Un totem dans l\'espace commun, des lampes chez chaque résident. Quelqu\'un propose une activité, les lampes s\'allument, tout le monde se retrouve.',
      layout: 'split',
      links: [
        { label: 'Prendre rendez-vous', to: CAL_URL, target: '_blank', color: 'primary', variant: 'solid' },
        { label: 'Voir le produit', to: '/concept', target: '_self', color: 'neutral', variant: 'outline' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'layout',
        kind: 'select',
        label: 'Mise en page',
        options: [
          { label: 'Texte + visuel', value: 'split' },
          { label: 'Centré', value: 'center' }
        ]
      },
      {
        key: 'image',
        kind: 'image',
        label: 'Image',
        hint: 'Vide = visuel par défaut (anneaux). Sinon, une photo de la médiathèque.'
      },
      {
        key: 'links',
        kind: 'repeat',
        label: 'Boutons',
        addLabel: 'Ajouter un bouton',
        itemLabel: 'Bouton',
        itemDefaults: {
          label: 'Nouveau bouton',
          to: '/contact',
          target: '_self',
          color: 'primary',
          variant: 'solid'
        },
        itemFields: [
          { key: 'label', kind: 'text', label: 'Libellé' },
          { key: 'to', kind: 'url', label: 'Lien' },
          {
            key: 'target',
            kind: 'select',
            label: 'Ouverture',
            options: [
              { label: 'Même onglet', value: '_self' },
              { label: 'Nouvel onglet', value: '_blank' }
            ]
          },
          {
            key: 'color',
            kind: 'select',
            label: 'Couleur',
            options: BUTTON_COLOR_OPTIONS
          },
          {
            key: 'variant',
            kind: 'select',
            label: 'Style',
            options: BUTTON_VARIANT_OPTIONS
          },
          { key: 'icon', kind: 'icon', label: 'Icône' }
        ]
      }
    ]
  },
  'business-proof': {
    type: 'business-proof',
    label: 'Partenaires',
    description: 'Logos des structures partenaires',
    icon: 'i-lucide-badge-check',
    defaults: {
      title: 'Ils nous font confiance',
      partners: [
        { name: 'Gérontopôle Autonomie Longévité', logo: '/images/partners/gerontopole.png' },
        { name: 'Nantes Métropole Habitat', logo: '/images/partners/nantes-metropole-habitat.png' },
        { name: 'Pépite Pays de la Loire', logo: '/images/partners/pepite-pays-de-la-loire.png' },
        { name: 'Startups & Innovation Day', logo: '/images/partners/startups-innovation-day.png' }
      ]
    },
    fields: [
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'partners',
        kind: 'repeat',
        label: 'Logos',
        addLabel: 'Ajouter un partenaire',
        itemLabel: 'Partenaire',
        itemDefaults: { name: 'Partenaire', logo: '' },
        itemFields: [
          { key: 'name', kind: 'text', label: 'Nom' },
          { key: 'logo', kind: 'image', label: 'Logo' }
        ]
      }
    ]
  },
  'problem': {
    type: 'problem',
    label: 'Constat',
    description: 'Problèmes à gauche, solutions à droite',
    icon: 'i-lucide-circle-alert',
    defaults: {
      badge: 'Le constat',
      title: 'Le quotidien des résidences,',
      titleAccent: 'sans lien entre les habitants',
      description: 'Des résidents isolés, des équipes qui diffusent l\'info à la main, des espaces communs sous-utilisés. Et si on remettait le lien au centre ?',
      problems: [
        { title: 'Isolation des résidents', description: 'Chacun dans son appart, peu d\'occasions de se croiser', icon: 'i-lucide-users' },
        { title: 'Communication manuelle', description: 'Affichages, mails, allers-retours sans fin', icon: 'i-lucide-lamp-wall-down' },
        { title: 'Gestion administrative lourde', description: 'L\'équipe court après l\'info au lieu de l\'animer', icon: 'i-lucide-file-check' }
      ],
      solutions: [
        { title: 'Communauté active', description: 'Les résidents proposent et rejoignent des activités', icon: 'i-lucide-users-round' },
        { title: 'Communication centralisée', description: 'Une info, un totem : tout le monde est au courant', icon: 'i-lucide-scroll' },
        { title: 'Équipe libérée', description: 'Moins de logistique, plus de présence sur le terrain', icon: 'i-lucide-lamp' }
      ]
    },
    fields: [
      { key: 'badge', kind: 'text', label: 'Badge' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'titleAccent', kind: 'text', label: 'Titre accentué' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'problems',
        kind: 'repeat',
        label: 'Problèmes',
        addLabel: 'Ajouter un problème',
        itemLabel: 'Problème',
        itemDefaults: { title: 'Nouveau problème', description: 'Décrivez le constat.', icon: 'i-lucide-circle-alert' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'icon', kind: 'icon', label: 'Icône' }
        ]
      },
      {
        key: 'solutions',
        kind: 'repeat',
        label: 'Solutions',
        addLabel: 'Ajouter une solution',
        itemLabel: 'Solution',
        itemDefaults: { title: 'Nouvelle solution', description: 'Décrivez le bénéfice.', icon: 'i-lucide-check' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'icon', kind: 'icon', label: 'Icône' }
        ]
      }
    ]
  },
  'how-it-works': {
    type: 'how-it-works',
    label: 'Étapes',
    description: 'Comment ça marche, avec images',
    icon: 'i-lucide-list-ordered',
    defaults: {
      headline: 'Comment ça marche',
      title: 'Une méthode propre, un accompagnement humain',
      description: 'Un résident propose une activité au totem. Les lampes s\'allument chez chacun. Il n\'y a plus qu\'à se retrouver dans le salon.',
      steps: [
        {
          num: '01',
          title: 'Proposer une activité',
          description: 'Au totem, un résident crée une activité avec son porte-clés : jeux, café, balade. Chacun choisit le code couleur.',
          tone: 'blue',
          image: '/images/how-it-works/etape-1-cles.png',
          imageAlt: 'Un résident propose une activité au totem avec son porte-clés Heya'
        },
        {
          num: '02',
          title: 'Les relais s\'allument',
          description: 'Les lampes dans chaque appartement s\'illuminent de la couleur de l\'activité. Impossible de manquer l\'invitation.',
          tone: 'gold',
          image: '/images/how-it-works/etape-2-lampe.png',
          imageAlt: 'Une lampe-relais s\'allume dans un appartement avec la couleur de l\'activité'
        },
        {
          num: '03',
          title: 'Se retrouver ensemble',
          description: 'Les voisins rejoignent l\'activité dans les espaces communs. Le lien se crée naturellement.',
          tone: 'green',
          image: '/images/how-it-works/etape-3-cartes.png',
          imageAlt: 'Des résidents se retrouvent dans le couloir grâce à leurs cartes Heya'
        }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'steps',
        kind: 'repeat',
        label: 'Étapes',
        addLabel: 'Ajouter une étape',
        itemLabel: 'Étape',
        itemDefaults: {
          num: '04',
          title: 'Nouvelle étape',
          description: 'Décrivez cette étape.',
          tone: 'blue',
          image: '',
          imageAlt: ''
        },
        itemFields: [
          { key: 'num', kind: 'text', label: 'Numéro' },
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'tone', kind: 'select', label: 'Couleur', options: TONE_OPTIONS },
          { key: 'image', kind: 'image', label: 'Image' },
          { key: 'imageAlt', kind: 'text', label: 'Texte alternatif' }
        ]
      }
    ]
  },
  'values': {
    type: 'values',
    label: 'Valeurs',
    description: 'Trois cartes colorées',
    icon: 'i-lucide-heart-handshake',
    defaults: {
      headline: 'Nos valeurs',
      title: 'Simple, inclusif, ludique',
      description: 'Heya dépasse les barrières de langue, de génération, de handicap et de fracture numérique.',
      items: [
        { title: 'Simple', description: 'Pas d\'écran complexe, pas d\'application obligatoire. Le totem et la lampe relay parlent à tout le monde.', tone: 'blue' },
        { title: 'Inclusif', description: 'Accessible aux personnes âgées, aux étudiants internationaux, aux personnes en fracture numérique.', tone: 'gold' },
        { title: 'Ludique', description: 'Proposer une activité devient un geste léger. La convivialité repart du quotidien.', tone: 'green' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Cartes',
        addLabel: 'Ajouter une valeur',
        itemLabel: 'Valeur',
        itemDefaults: { title: 'Nouvelle valeur', description: 'Décrivez cette valeur.', tone: 'blue' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'tone', kind: 'select', label: 'Couleur', options: TONE_OPTIONS }
        ]
      }
    ]
  },
  'use-cases': {
    type: 'use-cases',
    label: 'Pour qui',
    description: 'Section cartes habitats (landing)',
    icon: 'i-lucide-building-2',
    defaults: {
      headline: 'Pour qui',
      title: 'Heya pour tous les habitats partagés',
      items: [
        { title: 'Résidences seniors', description: 'Animez les espaces communs et créez du lien entre résidents grâce à des activités adaptées.', to: '/solutions/residences-seniors', image: '/images/use-cases/seniors.png', featured: true },
        { title: 'Co-living', description: 'Renforcez la cohésion sans recruter un community manager à temps plein.', to: '/solutions/co-living', image: '/images/use-cases/coliving.png', featured: false },
        { title: 'Résidences étudiantes', description: 'Fédérez vos résidents autour d\'activités spontanées, sans application à installer.', to: '/solutions/residences-etudiantes', image: '/images/use-cases/etudiants.png', featured: false },
        { title: 'Habitat inclusif', description: 'Un signal visible pour tous les profils, pensé avec les accompagnants.', to: '/solutions/habitat-inclusif', image: '/images/use-cases/inclusif.png', featured: false }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Habitats',
        addLabel: 'Ajouter un habitat',
        itemLabel: 'Habitat',
        itemDefaults: {
          title: 'Nouvel habitat',
          description: 'Décrivez ce type de résidence.',
          to: '/solutions/residences-seniors',
          image: '',
          featured: false
        },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'to', kind: 'url', label: 'Lien' },
          { key: 'image', kind: 'image', label: 'Image' },
          { key: 'featured', kind: 'toggle', label: 'Carte mise en avant' }
        ]
      }
    ]
  },
  'testimonials': {
    type: 'testimonials',
    label: 'Témoignages',
    description: 'Citations équipes et résidents',
    icon: 'i-lucide-quote',
    defaults: {
      headline: 'Témoignages',
      title: 'Ce qu\'en disent les équipes et les résidents',
      description: 'Des retours de structures équipées. Les citations ci-dessous sont des exemples en attendant les témoignages clients.',
      items: [
        {
          quote: 'Depuis l\'installation de Heya, les voisins se retrouvent vraiment. On se propose des activités, on s\'entraide. C\'est exactement ce qu\'il nous fallait.',
          name: 'Claire Renaud',
          role: 'Résidente, habitat partagé à Nantes',
          badge: 'Résidente',
          initials: 'CR'
        },
        {
          quote: 'On ne court plus après l\'info. Les résidents se retrouvent d\'eux-mêmes, et on voit enfin ce qui mobilise.',
          name: 'Nadia Benali',
          role: 'Directrice de résidence',
          badge: 'Direction',
          initials: 'NB'
        }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Témoignages',
        addLabel: 'Ajouter un témoignage',
        itemLabel: 'Témoignage',
        itemDefaults: {
          quote: 'Ajoutez ici la citation.',
          name: 'Prénom Nom',
          role: 'Rôle, structure',
          badge: 'Résidente',
          initials: 'PN'
        },
        itemFields: [
          { key: 'quote', kind: 'textarea', label: 'Citation' },
          { key: 'name', kind: 'text', label: 'Nom' },
          { key: 'role', kind: 'text', label: 'Rôle' },
          { key: 'badge', kind: 'text', label: 'Badge' },
          { key: 'initials', kind: 'text', label: 'Initiales' }
        ]
      }
    ]
  },
  'offers': {
    type: 'offers',
    label: 'Offres',
    description: 'Test, location, achat',
    icon: 'i-lucide-tags',
    defaults: {
      headline: 'Nos offres',
      title: 'Tester, louer ou acheter',
      description: 'Trois formules pour adapter Heya à votre structure et à votre rythme de déploiement.'
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' }
    ]
  },
  'contact-cta': {
    type: 'contact-cta',
    label: 'Appel à l\'action',
    description: 'Bandeau de prise de rendez-vous',
    icon: 'i-lucide-mail',
    defaults: {
      title: 'Et si on recréait du lien ?',
      description: 'Heya aide votre équipe à animer la résidence sans surcharge.',
      bullets: [
        'Une démo personnalisée à votre rythme',
        'Un accompagnement pour la mise en place',
        'Des outils simples pour vos équipes'
      ],
      footnote: 'Une réponse sous 24h. Vos données sont protégées.'
    },
    fields: [
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'bullets',
        kind: 'string-list',
        label: 'Points forts',
        addLabel: 'Ajouter un point',
        itemLabel: 'Point'
      },
      { key: 'footnote', kind: 'text', label: 'Note de bas de bloc' }
    ]
  },
  'solution': {
    type: 'solution',
    label: 'Page habitat',
    description: 'Gabarit complet /solutions/…, pas une section landing',
    icon: 'i-lucide-lightbulb',
    insertable: false,
    defaults: {
      slug: 'residences-seniors'
    },
    fields: [
      {
        key: 'slug',
        kind: 'select',
        label: 'Habitat',
        options: SOLUTION_OPTIONS
      }
    ]
  },
  'richtext': {
    type: 'richtext',
    label: 'Texte libre',
    description: 'Mentions, politique, prose',
    icon: 'i-lucide-align-left',
    defaults: {},
    defaultBody: '## Nouveau bloc texte\n\nRédigez le contenu ici. Vous pouvez mettre du **gras**, des listes et des images.',
    fields: [
      { key: 'body', kind: 'richtext', label: 'Contenu' }
    ]
  },
  'products': {
    type: 'products',
    label: 'Produits',
    description: 'Totem et lampe, deux cartes image',
    icon: 'i-lucide-box',
    defaults: {
      headline: 'Les produits',
      title: 'Deux objets, un seul objectif',
      description: 'Le totem dans l\'espace commun et la lampe dans chaque logement.',
      items: [
        { label: 'Le boîtier', title: 'Le totem interactif', description: 'Installé dans l\'espace commun, le totem permet aux résidents de proposer une activité en quelques secondes grâce à 4 emplacements couleur.', image: '/images/concept/totem.png', imageAlt: 'Totem Heya avec quatre emplacements couleur' },
        { label: 'La lampe', title: 'La lampe relais', description: 'Dans chaque appartement, la lampe s\'allume dans la couleur de l\'activité proposée. Un signal simple et visible pour créer du lien.', image: '/images/concept/lampe.png', imageAlt: 'Lampe relais Heya allumée' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Produits',
        addLabel: 'Ajouter un produit',
        itemLabel: 'Produit',
        itemDefaults: { label: 'Produit', title: 'Nouveau produit', description: 'Décrivez l\'objet.', image: '', imageAlt: '' },
        itemFields: [
          { key: 'label', kind: 'text', label: 'Sur-titre' },
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'image', kind: 'image', label: 'Image' },
          { key: 'imageAlt', kind: 'text', label: 'Texte alternatif' }
        ]
      }
    ]
  },
  'media': {
    type: 'media',
    label: 'Image large',
    description: 'Capture dashboard, photo pleine largeur',
    icon: 'i-lucide-monitor',
    defaults: {
      headline: 'Dashboard',
      title: 'Suivez la vie de votre résidence',
      description: 'Données réelles des résidences équipées',
      image: '/images/concept/dashboard.png',
      imageAlt: 'Aperçu du dashboard Heya',
      tone: 'dark'
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      { key: 'image', kind: 'image', label: 'Image' },
      { key: 'imageAlt', kind: 'text', label: 'Texte alternatif' },
      {
        key: 'tone',
        kind: 'select',
        label: 'Fond',
        options: [
          { label: 'Sombre', value: 'dark' },
          { label: 'Clair', value: 'light' }
        ]
      }
    ]
  },
  'stats': {
    type: 'stats',
    label: 'Chiffres',
    description: 'Indicateurs d\'impact',
    icon: 'i-lucide-chart-column',
    defaults: {
      headline: 'Qualité & impact',
      title: 'Des résultats mesurables',
      items: [
        { value: '-32%', title: 'Sollicitations conciergerie', description: 'Moins de questions répétitives', featured: true, accent: 'primary' },
        { value: '+45%', title: 'Participation résidents', description: 'Plus d\'activités proposées', featured: false, accent: 'teal' },
        { value: '1h', title: 'Formation équipe', description: 'Prise en main rapide', featured: false, accent: 'blue' },
        { value: '0', title: 'Maintenance', description: 'Fonctionne en autonomie', featured: false, accent: 'violet' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Chiffres',
        addLabel: 'Ajouter un chiffre',
        itemLabel: 'Chiffre',
        itemDefaults: { value: '0', title: 'Indicateur', description: '', featured: false, accent: 'primary' },
        itemFields: [
          { key: 'value', kind: 'text', label: 'Valeur' },
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'text', label: 'Légende' },
          { key: 'featured', kind: 'toggle', label: 'Carte mise en avant' },
          {
            key: 'accent',
            kind: 'select',
            label: 'Couleur',
            options: [
              { label: 'Orange', value: 'primary' },
              { label: 'Vert', value: 'teal' },
              { label: 'Bleu', value: 'blue' },
              { label: 'Violet', value: 'violet' }
            ]
          }
        ]
      }
    ]
  },
  'activities': {
    type: 'activities',
    label: 'Activités',
    description: 'Quatre couleurs, quatre types',
    icon: 'i-lucide-palette',
    defaults: {
      headline: 'Les activités',
      title: '4 couleurs, 4 types d\'activités',
      description: 'Ces activités sont personnalisables et peuvent évoluer selon vos envies.',
      items: [
        { title: 'Jeux de société', description: 'Parties de cartes, échecs, jeux de plateau entre voisins.', icon: 'i-lucide-gamepad-2', tone: 'blue' },
        { title: 'Activité extérieure', description: 'Balades, jardinage, sorties dans le quartier.', icon: 'i-lucide-map-pin', tone: 'yellow' },
        { title: 'Activité manuelle', description: 'Ateliers créatifs, bricolage, cuisine ensemble.', icon: 'i-lucide-paintbrush', tone: 'orange' },
        { title: 'Café / discussions', description: 'Moments conviviaux autour d\'un café ou d\'un thé.', icon: 'i-lucide-coffee', tone: 'violet' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Activités',
        addLabel: 'Ajouter une activité',
        itemLabel: 'Activité',
        itemDefaults: { title: 'Nouvelle activité', description: 'Décrivez l\'activité.', icon: 'i-lucide-sparkles', tone: 'blue' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'icon', kind: 'icon', label: 'Icône' },
          {
            key: 'tone',
            kind: 'select',
            label: 'Couleur',
            options: [
              { label: 'Bleu', value: 'blue' },
              { label: 'Jaune', value: 'yellow' },
              { label: 'Orange', value: 'orange' },
              { label: 'Violet', value: 'violet' }
            ]
          }
        ]
      }
    ]
  },
  'install': {
    type: 'install',
    label: 'Installation',
    description: 'Trois étapes avec photos',
    icon: 'i-lucide-wrench',
    defaults: {
      headline: 'Installation',
      title: 'Opérationnel en une demi-journée',
      items: [
        { title: 'Audit sur site', description: 'Identification des espaces communs et du nombre d\'appartements.', image: '/images/concept/install-1.png' },
        { title: 'Pose des boîtiers', description: 'Installation du totem et des lampes par notre équipe.', image: '/images/concept/install-2.png' },
        { title: 'Formation & lancement', description: '1h de formation conciergerie, puis les résidents prennent le relais.', image: '/images/concept/install-3.png' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Étapes',
        addLabel: 'Ajouter une étape',
        itemLabel: 'Étape',
        itemDefaults: { title: 'Nouvelle étape', description: 'Décrivez l\'étape.', image: '' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          { key: 'image', kind: 'image', label: 'Image' }
        ]
      }
    ]
  },
  'timeline': {
    type: 'timeline',
    label: 'Parcours',
    description: 'Frise d\'années, page engagement',
    icon: 'i-lucide-milestone',
    defaults: {
      headline: 'La genèse',
      title: 'Notre parcours pas à pas',
      items: [
        { year: '2021', title: 'Naissance de l\'idée', description: 'La Fabrique des Collectifs dessine les premiers contours d\'habitat partagé innovant.', tone: 'orange' },
        { year: '2022', title: 'Premiers tests', description: 'Lancement des premiers projets pilotes à Nantes auprès d\'une communauté pionnière.', tone: 'yellow' },
        { year: '2023', title: 'Lancement officiel', description: 'Heya se déploie pour structurer et animer la vie collective en habitat partagé.', tone: 'primary' },
        { year: '2026', title: 'Croissance nationale', description: 'Déploiement de notre solution dans plusieurs grandes métropoles françaises.', tone: 'violet' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Années',
        addLabel: 'Ajouter une année',
        itemLabel: 'Année',
        itemDefaults: { year: '2026', title: 'Nouvelle étape', description: 'Décrivez ce moment.', tone: 'primary' },
        itemFields: [
          { key: 'year', kind: 'text', label: 'Année' },
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          {
            key: 'tone',
            kind: 'select',
            label: 'Pastille',
            options: [
              { label: 'Orange', value: 'orange' },
              { label: 'Jaune', value: 'yellow' },
              { label: 'Primaire', value: 'primary' },
              { label: 'Violet', value: 'violet' }
            ]
          }
        ]
      }
    ]
  },
  'missions': {
    type: 'missions',
    label: 'Mission',
    description: 'Trois cartes ce qui nous anime',
    icon: 'i-lucide-target',
    defaults: {
      headline: 'Notre mission',
      title: 'Ce qui nous anime au quotidien',
      items: [
        { title: 'Créer du lien social', description: 'Lutter contre l\'isolement en encourageant la convivialité intergénérationnelle et l\'esprit de famille au quotidien.', tone: 'violet' },
        { title: 'Favoriser l\'inclusivité', description: 'Dépasser les barrières de langue, de génération, de handicap et de fracture numérique.', tone: 'teal' },
        { title: 'Simplifier le travail des équipes', description: 'Soulager conciergeries et équipes d\'animation grâce à un outil fluide et un accompagnement de proximité.', tone: 'blue' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Missions',
        addLabel: 'Ajouter une mission',
        itemLabel: 'Mission',
        itemDefaults: { title: 'Nouvelle mission', description: 'Décrivez la mission.', tone: 'violet' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'description', kind: 'textarea', label: 'Description' },
          {
            key: 'tone',
            kind: 'select',
            label: 'Couleur',
            options: [
              { label: 'Violet', value: 'violet' },
              { label: 'Vert', value: 'teal' },
              { label: 'Bleu', value: 'blue' }
            ]
          }
        ]
      }
    ]
  },
  'founder': {
    type: 'founder',
    label: 'Fondatrice',
    description: 'Portrait Elise, texte et photo',
    icon: 'i-lucide-user-round',
    defaults: {
      headline: 'La fondatrice',
      title: 'Elise Furnon',
      role: 'Fondatrice de Heya',
      description: 'Designer à l\'École de Design de Nantes, Elise imagine des solutions pour recréer du lien dans les habitats partagés. Convaincue que le bien-vivre collectif passe par des objets simples, elle a conçu Heya autour du totem et de la lampe relay.',
      image: '/images/about/elise.png',
      imageAlt: 'Elise Furnon, fondatrice de Heya',
      links: [{ label: 'Nous contacter', to: '/contact', target: '_self', color: 'primary', variant: 'solid' }]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Nom' },
      { key: 'role', kind: 'text', label: 'Rôle' },
      { key: 'description', kind: 'textarea', label: 'Biographie' },
      { key: 'image', kind: 'image', label: 'Photo' },
      { key: 'imageAlt', kind: 'text', label: 'Texte alternatif' },
      {
        key: 'links',
        kind: 'repeat',
        label: 'Boutons',
        addLabel: 'Ajouter un bouton',
        itemLabel: 'Bouton',
        itemDefaults: { label: 'Nous contacter', to: '/contact', target: '_self', color: 'primary', variant: 'solid' },
        itemFields: [
          { key: 'label', kind: 'text', label: 'Libellé' },
          { key: 'to', kind: 'url', label: 'Lien' },
          {
            key: 'target',
            kind: 'select',
            label: 'Ouverture',
            options: [
              { label: 'Même onglet', value: '_self' },
              { label: 'Nouvel onglet', value: '_blank' }
            ]
          },
          { key: 'color', kind: 'select', label: 'Couleur', options: BUTTON_COLOR_OPTIONS },
          { key: 'variant', kind: 'select', label: 'Style', options: BUTTON_VARIANT_OPTIONS }
        ]
      }
    ]
  },
  'awards': {
    type: 'awards',
    label: 'Prix',
    description: 'Récompenses avec visuel',
    icon: 'i-lucide-trophy',
    defaults: {
      headline: 'Prix & récompenses',
      title: 'Des distinctions qui honorent notre démarche',
      items: [
        { title: 'Prix de l\'Innovation Sociale', org: 'Région Pays de la Loire', tag: 'Innovation Sociale', image: '/images/about/award-1.png', tone: 'blue' },
        { title: 'Lauréat Silver Economy', org: 'Ministère de la Santé', tag: 'Silver Economy', image: '/images/about/award-2.png', tone: 'gold' },
        { title: 'Trophée Inclusion', org: 'Fondation de France', tag: 'Inclusion', image: '/images/about/award-3.png', tone: 'orange' },
        { title: 'Prix Startup Logement', org: 'Union Sociale Habitat', tag: 'Startup', image: '/images/about/award-4.png', tone: 'violet' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Prix',
        addLabel: 'Ajouter un prix',
        itemLabel: 'Prix',
        itemDefaults: { title: 'Nouveau prix', org: 'Organisme', tag: 'Prix', image: '', tone: 'blue' },
        itemFields: [
          { key: 'title', kind: 'text', label: 'Titre' },
          { key: 'org', kind: 'text', label: 'Organisme' },
          { key: 'tag', kind: 'text', label: 'Badge' },
          { key: 'image', kind: 'image', label: 'Image' },
          {
            key: 'tone',
            kind: 'select',
            label: 'Couleur',
            options: [
              { label: 'Bleu', value: 'blue' },
              { label: 'Or', value: 'gold' },
              { label: 'Orange', value: 'orange' },
              { label: 'Violet', value: 'violet' }
            ]
          }
        ]
      }
    ]
  },
  'faq': {
    type: 'faq',
    label: 'FAQ',
    description: 'Questions / réponses',
    icon: 'i-lucide-circle-help',
    defaults: {
      headline: '',
      title: '',
      items: [
        { question: 'Combien de temps dure l\'installation ?', answer: 'Une demi-journée pour poser le totem et les lampes relay, plus 1h de formation avec l\'équipe sur site.' },
        { question: 'Puis-je essayer avant de m\'engager ?', answer: 'Oui. L\'offre Test prête le dispositif sur 3, 6 ou 12 mois, sans engagement au-delà de la période choisie.' },
        { question: 'Quels types de résidences ?', answer: 'Résidences seniors, foyers jeunes travailleurs, co-living, copropriétés, résidences étudiantes, habitats inclusifs.' },
        { question: 'Y a-t-il un support dédié ?', answer: 'Support email pour la Location. Support prioritaire et formation sur site pour l\'Achat.' }
      ]
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      {
        key: 'items',
        kind: 'repeat',
        label: 'Questions',
        addLabel: 'Ajouter une question',
        itemLabel: 'Question',
        itemDefaults: { question: 'Nouvelle question ?', answer: 'La réponse.' },
        itemFields: [
          { key: 'question', kind: 'text', label: 'Question' },
          { key: 'answer', kind: 'textarea', label: 'Réponse' }
        ]
      }
    ]
  },
  'contact-form': {
    type: 'contact-form',
    label: 'Formulaire',
    description: 'Demande de démo / devis (le schéma reste en code)',
    icon: 'i-lucide-clipboard-list',
    defaults: {
      headline: 'Contact',
      title: 'Demander une démo ou un devis',
      description: 'Une réponse sous 24h. Vos données sont protégées.'
    },
    fields: [
      { key: 'headline', kind: 'text', label: 'Sur-titre' },
      { key: 'title', kind: 'text', label: 'Titre' },
      { key: 'description', kind: 'textarea', label: 'Description' }
    ]
  }
}

export const BLOCK_LIBRARY: BlockDefinition[] = (Object.keys(BLOCK_CATALOG) as BlockType[])
  .map(type => BLOCK_CATALOG[type])
  .filter(item => item.insertable !== false)

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return BLOCK_CATALOG[type]
}

export function createPageBlock(type: BlockType): PageBlock {
  const definition = BLOCK_CATALOG[type]
  const parsed = blockSchemas[type].parse(structuredClone(definition.defaults))

  return {
    type,
    props: parsed,
    ...(definition.defaultBody ? { body: definition.defaultBody } : {})
  } as PageBlock
}
