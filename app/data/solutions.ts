export interface SolutionStep {
  num: string
  title: string
  description: string
}

export interface SolutionChallenge {
  num: string
  title: string
  description: string
  markerClass: string
}

export interface SolutionPersona {
  icon: string
  title: string
  description: string
  iconBgClass: string
}

export interface SolutionBenefitFeature {
  icon: string
  title: string
  description?: string
}

export interface SolutionMetric {
  icon: string
  title: string
  description: string
}

export interface SolutionTestimonial {
  quote: string
  name: string
  role: string
  avatar?: string
}

export interface SolutionFAQ {
  question: string
  answer: string
}

export interface SolutionPageData {
  slug: string
  badge: string
  title: string
  subtitle: string
  heroImage: string
  proofChips: string[]
  audienceTitle: string
  audienceSubtitle: string
  personas: SolutionPersona[]
  challengesTitle: string
  challengesSubtitle: string
  challenges: SolutionChallenge[]
  helpTitle: string
  helpSubtitle: string
  helpSteps: SolutionStep[]
  helpImage: string
  benefitsTitle: string
  benefitsSubtitle: string
  teamBenefits: SolutionBenefitFeature[]
  directionMetrics: SolutionMetric[]
  benefitsFootnote: string
  testimonials: SolutionTestimonial[]
  faqTitle: string
  faq: SolutionFAQ[]
  ctaTitle: string
  ctaSubtitle: string
  relatedSolutions: Array<{
    label: string
    to: string
    dotClass: string
  }>
}

const defaultHelpSteps: SolutionStep[] = [
  {
    num: '01',
    title: 'Propositions au totem',
    description: 'Un résident ou l\'équipe propose jeux, sortie, atelier ou café au totem. Interface physique, sans écran complexe.'
  },
  {
    num: '02',
    title: 'Signal lumineux dans chaque appartement',
    description: 'Chaque lampe relay s\'allume dans la couleur de l\'activité. Sans affiche à lire ni notification téléphone.'
  },
  {
    num: '03',
    title: 'Participation spontanée',
    description: 'Les résidents voient l\'activité et se rejoignent naturellement. Pas d\'inscription ni de QR code.'
  },
  {
    num: '04',
    title: 'Données pour la direction',
    description: 'Dashboard en temps réel : activités mobilisées, créneaux qui fonctionnent, évolution de la vie sociale.'
  }
]

const defaultTeamBenefits: SolutionBenefitFeature[] = [
  { icon: 'i-lucide-heading-4', title: 'Agenda partagé', description: 'Planification, relances et suivi en un seul endroit' },
  { icon: 'i-lucide-layout-grid', title: 'Gestion simplifiée', description: 'Moins de saisies manuelles et moins d\'erreurs' },
  { icon: 'i-lucide-hand-coins', title: 'Accès terrain', description: 'Accès mobile pour les équipes en déplacement' },
  { icon: 'i-lucide-heart-handshake', title: 'Feedback terrain', description: 'Retours terrain clairs et centralisés' },
  { icon: 'i-lucide-circle-check', title: 'Onboarding guidé' }
]

const defaultDirectionMetrics: SolutionMetric[] = [
  { icon: 'i-lucide-layout-grid', title: 'Participation', description: 'Données exploitables par activité et par résident.' },
  { icon: 'i-lucide-grid-3x3', title: 'Adoption', description: 'Suivi de l\'adoption par équipe et par résidence.' },
  { icon: 'i-lucide-heart-handshake', title: 'Impact social', description: 'Indicateurs pour valoriser l\'action sociale.' },
  { icon: 'i-lucide-heading-1', title: 'Reporting', description: 'Tableaux de bord prêts à partager aux parties prenantes.' }
]

export const solutions: Record<string, SolutionPageData> = {
  'residences-seniors': {
    slug: 'residences-seniors',
    badge: 'HEYA POUR LES RÉSIDENCES SENIORS',
    title: 'Augmentez la participation aux animations, sans surcharger votre équipe',
    subtitle: 'Heya connecte le totem des espaces communs aux lampes de chaque appartement. Les résidents proposent des activités en un geste. Votre conciergerie voit enfin ce qui fonctionne.',
    heroImage: '/images/solutions/hero-seniors.png',
    proofChips: [
      'Sans écran ni application à installer pour les résidents',
      'Interface accessible, pensée pour tous les profils',
      'Dashboard de participation pour la direction'
    ],
    audienceTitle: 'Une solution pour les équipes de terrain et la direction',
    audienceSubtitle: 'Trois profils, trois freins récurrents en résidence seniors.',
    personas: [
      {
        icon: 'i-lucide-users',
        title: 'Directrice / Directeur',
        description: 'Pilotez la qualité de vie et la participation avec une vision claire, sans réunions en plus.',
        iconBgClass: 'bg-[#ffe4d9]'
      },
      {
        icon: 'i-lucide-bell',
        title: 'Conciergerie & animation',
        description: 'Moins de relances manuelles : les propositions deviennent visibles dans chaque logement.',
        iconBgClass: 'bg-[#ffc9b3]'
      },
      {
        icon: 'i-lucide-calendar',
        title: 'Responsable ANIM',
        description: 'Un outil simple et inclusif, sans smartphone, qui complète votre programmation.',
        iconBgClass: 'bg-[#ffa882]'
      }
    ],
    challengesTitle: 'Les freins récurrents en résidence seniors',
    challengesSubtitle: 'Des problèmes concrets, identifiables, qui bloquent la qualité de vie et l\'efficacité des équipes.',
    challenges: [
      {
        num: '01',
        title: 'Isolement malgré la vie collective',
        description: 'En résidence, beaucoup croisent du monde dans les couloirs mais restent seuls chez eux. Heya crée des occasions simples de se retrouver.',
        markerClass: 'bg-[#ffe4d9]'
      },
      {
        num: '02',
        title: 'Charge conciergerie et équipe d\'animation',
        description: 'Affiches, messages oraux, tableaux : l\'info se perd. L\'équipe communique au lieu d\'animer, sans visibilité sur ce qui fonctionne.',
        markerClass: 'bg-[#ffc9b3]'
      },
      {
        num: '03',
        title: 'Activités peu visibles, donc peu suivies',
        description: 'Une séance bien préparée peut réunir trois personnes faute de visibilité. Les résidents oublient ou hésitent à descendre.',
        markerClass: 'bg-[#ffa882]'
      }
    ],
    helpTitle: 'Une solution simple, du totem au dashboard',
    helpSubtitle: 'Heya relie le lieu de vie commun et chaque appartement en quatre étapes. Pas de formation complexe, pas d\'écran à apprendre.',
    helpSteps: defaultHelpSteps,
    helpImage: '/images/solutions/help-visual.png',
    benefitsTitle: 'Ce que votre résidence gagne concrètement',
    benefitsSubtitle: 'Un impact concret pour les équipes de terrain et la direction.',
    teamBenefits: defaultTeamBenefits,
    directionMetrics: defaultDirectionMetrics,
    benefitsFootnote: 'Heya ne remplace pas votre équipe d\'animation. Il amplifie ce qu\'elle fait déjà : rendre visible l\'envie de partager un moment ensemble.',
    testimonials: [
      {
        quote: 'Avant Heya, on préparait des animations correctes, mais on ne savait pas pourquoi certaines ne décollaient pas. Aujourd\'hui, on voit ce qui mobilise réellement. Et surtout, des résidents proposent eux-mêmes des activités.',
        name: 'Sophie Martin',
        role: 'Directrice de résidence services seniors',
        avatar: '/images/solutions/avatar-sophie.png'
      },
      {
        quote: 'Je ne lis plus les affiches, mais je vois la lumière dans mon entrée. Quand c\'est violet, je sais qu\'on se retrouve pour discuter. C\'est simple, et ça m\'a remis en lien avec les voisins.',
        name: 'Marie Dupont',
        role: 'Résidente',
        avatar: '/images/solutions/avatar-marie.png'
      }
    ],
    faqTitle: 'Questions fréquentes des résidences seniors',
    faq: [
      {
        question: 'Faut-il que les résidents aient un smartphone ?',
        answer: 'Non. Heya fonctionne avec un totem physique et des lampes relay dans les appartements. Aucune application à installer pour les résidents.'
      },
      {
        question: 'Heya convient-il aux résidences autonomie et services seniors ?',
        answer: 'Oui. Heya s\'adapte aux résidences autonomie, services seniors et EHPAD selon la configuration des espaces communs et le nombre de logements.'
      },
      {
        question: 'Combien de temps faut-il pour installer Heya ?',
        answer: 'Comptez une demi-journée pour le totem et les lampes relay, plus 1h de formation avec l\'équipe sur site.'
      },
      {
        question: 'Est-ce compatible avec notre programmation d\'animations existante ?',
        answer: 'Oui. Heya complète votre programmation : les activités planifiées et spontanées coexistent via le totem.'
      },
      {
        question: 'Qui utilise le dashboard ?',
        answer: 'La direction, la conciergerie et l\'équipe d\'animation, selon les droits que vous définissez.'
      },
      {
        question: 'Comment lutter contre l\'isolement sans stigmatiser les résidents ?',
        answer: 'Le signal lumineux est discret et positif : il invite à une activité, sans cibler personne. Chacun participe à son rythme.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre résidence seniors',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois avec votre équipe sur site.',
    relatedSolutions: [
      { label: 'Co-living', to: '/solutions/co-living', dotClass: 'bg-heya-step-green-fg' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', dotClass: 'bg-heya-step-blue-fg' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', dotClass: 'bg-heya-orange' }
    ]
  },
  'co-living': {
    slug: 'co-living',
    badge: 'HEYA POUR LE CO-LIVING',
    title: 'Créez une vraie vie de coloc, sans dépendre des habitués',
    subtitle: 'Heya transforme les espaces communs en lieux de rencontre spontanée. Les colocataires proposent des activités, les lampes s\'allument, la cohésion se construit naturellement.',
    heroImage: '/images/solutions/hero-seniors.png',
    proofChips: [
      'Sans groupe WhatsApp ni app à imposer',
      'Idéal pour les nouveaux arrivants',
      'Suivi de la vie collective pour le gestionnaire'
    ],
    audienceTitle: 'Une solution pour les gestionnaires et les colocataires',
    audienceSubtitle: 'Trois profils, trois freins récurrents en co-living.',
    personas: [
      {
        icon: 'i-lucide-building-2',
        title: 'Gestionnaire / Opérateur',
        description: 'Pilotez la cohésion et la satisfaction des colocataires avec des indicateurs concrets.',
        iconBgClass: 'bg-[#ffe4d9]'
      },
      {
        icon: 'i-lucide-users',
        title: 'Community manager',
        description: 'Moins de relances : les propositions d\'activités deviennent visibles dans chaque chambre.',
        iconBgClass: 'bg-[#ffc9b3]'
      },
      {
        icon: 'i-lucide-home',
        title: 'Colocataires',
        description: 'Un signal simple pour proposer ou rejoindre une activité, sans dépendre des habitués.',
        iconBgClass: 'bg-[#ffa882]'
      }
    ],
    challengesTitle: 'Les freins récurrents en co-living',
    challengesSubtitle: 'Des problèmes concrets qui freinent la cohésion et l\'utilisation des espaces communs.',
    challenges: [
      {
        num: '01',
        title: 'Cohésion fragile entre colocataires',
        description: 'Les nouveaux arrivants peinent à s\'intégrer. La vie collective repose souvent sur quelques personnes très actives.',
        markerClass: 'bg-[#ffe4d9]'
      },
      {
        num: '02',
        title: 'Communication informelle inefficace',
        description: 'Groupes WhatsApp, affiches dans la cuisine : l\'information circule mal et crée parfois plus de bruit que de lien.',
        markerClass: 'bg-[#ffc9b3]'
      },
      {
        num: '03',
        title: 'Espaces communs sous-utilisés',
        description: 'Salon, rooftop, cuisine partagée : les lieux existent mais les occasions de se retrouver manquent.',
        markerClass: 'bg-[#ffa882]'
      }
    ],
    helpTitle: 'Heya pour fédérer vos colocataires',
    helpSubtitle: 'Du totem commun à chaque chambre, en quatre étapes simples.',
    helpSteps: defaultHelpSteps,
    helpImage: '/images/solutions/help-visual.png',
    benefitsTitle: 'Ce que votre co-living gagne concrètement',
    benefitsSubtitle: 'Un impact concret pour les équipes et les résidents.',
    teamBenefits: defaultTeamBenefits,
    directionMetrics: defaultDirectionMetrics,
    benefitsFootnote: 'Heya ne remplace pas votre community manager. Il rend visible l\'envie de partager un moment ensemble.',
    testimonials: [
      {
        quote: 'Depuis Heya, on ne dépend plus de deux colocataires pour organiser la vie du lieu. Tout le monde peut proposer, et ça change tout.',
        name: 'Thomas Leroy',
        role: 'Gestionnaire de co-living',
        avatar: '/images/solutions/avatar-sophie.png'
      },
      {
        quote: 'Quand la lampe s\'allume, je descends voir ce qui se passe. C\'est devenu un réflexe, même pour les nouveaux.',
        name: 'Léa Bernard',
        role: 'Colocataire',
        avatar: '/images/solutions/avatar-marie.png'
      }
    ],
    faqTitle: 'Questions fréquentes du co-living',
    faq: [
      {
        question: 'Faut-il que les colocataires installent une application ?',
        answer: 'Non. Heya fonctionne avec un totem et des lampes relay. Aucune app requise pour les résidents.'
      },
      {
        question: 'Heya convient-il aux petits et grands co-living ?',
        answer: 'Oui, de quelques chambres à plusieurs dizaines de logements. Le déploiement s\'adapte à votre configuration.'
      },
      {
        question: 'Combien de temps pour l\'installation ?',
        answer: 'Une demi-journée pour le totem et les lampes, plus 1h de formation avec l\'équipe.'
      },
      {
        question: 'Peut-on tester avant de s\'engager ?',
        answer: 'Oui. L\'offre Test permet de prêter le dispositif sur 3, 6 ou 12 mois.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre co-living',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', dotClass: 'bg-heya-violet' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', dotClass: 'bg-heya-step-blue-fg' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', dotClass: 'bg-heya-orange' }
    ]
  },
  'residences-etudiantes': {
    slug: 'residences-etudiantes',
    badge: 'HEYA POUR LES RÉSIDENCES ÉTUDIANTES',
    title: 'Fédérez vos résidents, y compris les étudiants internationaux',
    subtitle: 'Heya crée une vraie vie de campus sans imposer une application de plus. Le totem et les lampes relay parlent à tous les profils.',
    heroImage: '/images/solutions/hero-seniors.png',
    proofChips: [
      'Signal universel, sans barrière de langue',
      'Pas d\'app à installer pour les résidents',
      'Pilotage pour la direction et le CROUS'
    ],
    audienceTitle: 'Une solution pour la direction et les résidents',
    audienceSubtitle: 'Trois profils, trois freins récurrents en résidence étudiante.',
    personas: [
      {
        icon: 'i-lucide-graduation-cap',
        title: 'Direction / CROUS',
        description: 'Pilotez la vie étudiante et l\'engagement avec des données exploitables.',
        iconBgClass: 'bg-[#ffe4d9]'
      },
      {
        icon: 'i-lucide-bell',
        title: 'Équipe vie étudiante',
        description: 'Moins de relances manuelles : les activités deviennent visibles dans chaque chambre.',
        iconBgClass: 'bg-[#ffc9b3]'
      },
      {
        icon: 'i-lucide-globe',
        title: 'Résidents internationaux',
        description: 'Un signal lumineux compris par tous, indépendamment de la langue ou du smartphone.',
        iconBgClass: 'bg-[#ffa882]'
      }
    ],
    challengesTitle: 'Les freins récurrents en résidence étudiante',
    challengesSubtitle: 'Des problèmes concrets qui freinent la vie de campus et l\'intégration.',
    challenges: [
      {
        num: '01',
        title: 'Isolement des étudiants internationaux',
        description: 'Barrière de langue, codes culturels différents : beaucoup d\'étudiants restent isolés dans leur chambre.',
        markerClass: 'bg-[#ffe4d9]'
      },
      {
        num: '02',
        title: 'Turnover et vie éphémère',
        description: 'Les résidents changent chaque année. Difficile de maintenir une dynamique collective durable.',
        markerClass: 'bg-[#ffc9b3]'
      },
      {
        num: '03',
        title: 'Surcharge des équipes',
        description: 'Peu de moyens pour animer la vie sociale. Les équipes jonglent entre logistique et animation.',
        markerClass: 'bg-[#ffa882]'
      }
    ],
    helpTitle: 'Une vie de campus accessible à tous',
    helpSubtitle: 'Du totem au hall, en quatre étapes simples et inclusives.',
    helpSteps: defaultHelpSteps,
    helpImage: '/images/solutions/help-visual.png',
    benefitsTitle: 'Ce que votre résidence gagne concrètement',
    benefitsSubtitle: 'Un impact concret pour les équipes et les étudiants.',
    teamBenefits: defaultTeamBenefits,
    directionMetrics: defaultDirectionMetrics,
    benefitsFootnote: 'Heya complète votre programmation : il rend visible l\'envie de se retrouver, sans imposer une app de plus.',
    testimonials: [
      {
        quote: 'Nos étudiants internationaux comprennent le signal lumineux immédiatement. C\'est devenu un réflexe de descendre quand la lampe s\'allume.',
        name: 'Camille Rousseau',
        role: 'Responsable vie étudiante',
        avatar: '/images/solutions/avatar-sophie.png'
      },
      {
        quote: 'Je ne parlais pas bien français au début. La lampe, c\'était plus simple qu\'un message sur un groupe.',
        name: 'Yuki Tanaka',
        role: 'Étudiante internationale',
        avatar: '/images/solutions/avatar-marie.png'
      }
    ],
    faqTitle: 'Questions fréquentes des résidences étudiantes',
    faq: [
      {
        question: 'Faut-il un smartphone pour utiliser Heya ?',
        answer: 'Non. Le totem et les lampes relay fonctionnent sans application pour les résidents.'
      },
      {
        question: 'Heya convient-il aux résidences CROUS et privées ?',
        answer: 'Oui. Heya s\'adapte aux résidences universitaires, CROUS et opérateurs privés.'
      },
      {
        question: 'Comment gérer le turnover annuel ?',
        answer: 'L\'onboarding des nouveaux résidents est simple : le signal lumineux se comprend en quelques minutes.'
      },
      {
        question: 'Peut-on tester sur une résidence pilote ?',
        answer: 'Oui. L\'offre Test permet un déploiement progressif sur 3, 6 ou 12 mois.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre résidence étudiante',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', dotClass: 'bg-heya-violet' },
      { label: 'Co-living', to: '/solutions/co-living', dotClass: 'bg-heya-step-green-fg' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', dotClass: 'bg-heya-orange' }
    ]
  },
  'habitat-inclusif': {
    slug: 'habitat-inclusif',
    badge: 'HEYA POUR L\'HABITAT INCLUSIF',
    title: 'Favorisez l\'inclusion et l\'autonomie avec des outils accessibles',
    subtitle: 'Heya dépasse les barrières de langue, de génération, de handicap et de fracture numérique. Un signal simple pour inviter au lien.',
    heroImage: '/images/solutions/hero-seniors.png',
    proofChips: [
      'Interface physique, sans écran complexe',
      'Accessible à tous les profils',
      'Données pour les équipes d\'accompagnement'
    ],
    audienceTitle: 'Une solution pour les équipes et les résidents',
    audienceSubtitle: 'Trois profils, trois freins récurrents en habitat inclusif.',
    personas: [
      {
        icon: 'i-lucide-accessibility',
        title: 'Direction / Coordinateur',
        description: 'Pilotez l\'inclusion et la vie collective avec des indicateurs clairs.',
        iconBgClass: 'bg-[#ffe4d9]'
      },
      {
        icon: 'i-lucide-hand-heart',
        title: 'Équipe d\'accompagnement',
        description: 'Un outil simple qui encourage l\'autonomie sans surcharge administrative.',
        iconBgClass: 'bg-[#ffc9b3]'
      },
      {
        icon: 'i-lucide-users-round',
        title: 'Résidents',
        description: 'Proposer ou rejoindre une activité à son rythme, sans fracture numérique.',
        iconBgClass: 'bg-[#ffa882]'
      }
    ],
    challengesTitle: 'Les freins récurrents en habitat inclusif',
    challengesSubtitle: 'Des problèmes concrets liés à la diversité des profils et des modes de communication.',
    challenges: [
      {
        num: '01',
        title: 'Diversité des profils et des modes de communication',
        description: 'Résidents aux profils variés : comment proposer un outil qui parle à chacun sans exclure personne ?',
        markerClass: 'bg-[#ffe4d9]'
      },
      {
        num: '02',
        title: 'Autonomie vs accompagnement',
        description: 'Encourager l\'initiative des résidents tout en soutenant les équipes d\'accompagnement.',
        markerClass: 'bg-[#ffc9b3]'
      },
      {
        num: '03',
        title: 'Fracture numérique',
        description: 'Les solutions digitales excluent une partie des résidents. Il faut des interfaces physiques et intuitives.',
        markerClass: 'bg-[#ffa882]'
      }
    ],
    helpTitle: 'Un dispositif pensé pour l\'inclusivité',
    helpSubtitle: 'Quatre étapes simples, du totem au tableau de bord.',
    helpSteps: defaultHelpSteps,
    helpImage: '/images/solutions/help-visual.png',
    benefitsTitle: 'Ce que votre structure gagne concrètement',
    benefitsSubtitle: 'Un impact concret pour les équipes et les résidents.',
    teamBenefits: defaultTeamBenefits,
    directionMetrics: defaultDirectionMetrics,
    benefitsFootnote: 'Heya respecte l\'autonomie des résidents tout en donnant une vision claire de la vie collective.',
    testimonials: [
      {
        quote: 'Heya respecte l\'autonomie de nos résidents tout en nous donnant une vision claire de la vie collective. C\'est exactement ce qu\'il nous fallait.',
        name: 'Nadia Benali',
        role: 'Directrice d\'habitat inclusif',
        avatar: '/images/solutions/avatar-sophie.png'
      },
      {
        quote: 'Je n\'ai pas besoin de téléphone. Quand la lampe s\'allume, je sais qu\'il y a quelque chose. C\'est rassurant.',
        name: 'Jean-Pierre Moreau',
        role: 'Résident',
        avatar: '/images/solutions/avatar-marie.png'
      }
    ],
    faqTitle: 'Questions fréquentes de l\'habitat inclusif',
    faq: [
      {
        question: 'Heya est-il accessible aux personnes en situation de handicap ?',
        answer: 'Oui. L\'interface physique au totem et le signal lumineux sont pensés pour l\'accessibilité, sans dépendre du numérique.'
      },
      {
        question: 'Faut-il savoir lire ou utiliser un écran ?',
        answer: 'Non. Quatre couleurs, quatre types d\'activités. Le signal est visuel et universel.'
      },
      {
        question: 'Comment les équipes d\'accompagnement utilisent-ils Heya ?',
        answer: 'Le dashboard leur donne une vision de la vie sociale pour adapter leur soutien, sans surveiller les résidents.'
      },
      {
        question: 'Peut-on tester avant un déploiement complet ?',
        answer: 'Oui. L\'offre Test permet un pilote sur 3, 6 ou 12 mois.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre habitat inclusif',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', dotClass: 'bg-heya-violet' },
      { label: 'Co-living', to: '/solutions/co-living', dotClass: 'bg-heya-step-green-fg' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', dotClass: 'bg-heya-step-blue-fg' }
    ]
  }
}
