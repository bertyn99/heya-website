export type HelpStepSceneKind = 'totem' | 'lamp' | 'gather' | 'dashboard'

export type ActivityAccent = 'blue' | 'yellow' | 'orange' | 'violet'

export type SolutionAudience =
  | 'residences-seniors'
  | 'co-living'
  | 'residences-etudiantes'
  | 'habitat-inclusif'

export interface SolutionStep {
  num: string
  title: string
  description: string
  scene: HelpStepSceneKind
}

export interface SolutionChallenge {
  num: string
  title: string
  description: string
}

export interface SolutionPersona {
  icon: string
  title: string
  description: string
}

export type BenefitMarkKind = 'lamp' | 'gesture' | 'together' | 'chart' | 'spaces' | 'spark'

export interface SolutionBenefitRow {
  title: string
  team: string
  direction: string
  mark: BenefitMarkKind
}

export interface SolutionHighlight {
  title: string
  description: string
  mark: BenefitMarkKind
}

export interface SolutionUseCase {
  title: string
  activityLabel: string
  activityColorClass: string
  image: string
  imageAlt: string
  story: string
  outcome: string
}

export interface SolutionTestimonial {
  quote: string
  name: string
  role: string
  badge: string
  initials: string
  avatar?: string
}

export interface SolutionFAQ {
  question: string
  answer: string
}

export interface SolutionPageData {
  slug: string
  metaTitle: string
  metaDescription: string
  badge: string
  title: string
  subtitle: string
  heroImage: string
  heroImageAlt: string
  proofChips: string[]
  audienceTitle: string
  audienceSubtitle: string
  personas: SolutionPersona[]
  challengesTitle: string
  challengesSubtitle: string
  challenges: SolutionChallenge[]
  helpTitle: string
  helpSubtitle: string
  helpAccent: ActivityAccent
  helpSteps: SolutionStep[]
  benefitsTitle: string
  benefitsLayout: 'matrix' | 'highlights'
  benefitRows?: SolutionBenefitRow[]
  benefitHighlights?: SolutionHighlight[]
  benefitsFootnote?: string
  useCase: SolutionUseCase
  testimonials: SolutionTestimonial[]
  faqTitle: string
  faq: SolutionFAQ[]
  ctaTitle: string
  ctaSubtitle: string
  relatedSolutions: Array<{
    label: string
    to: string
    image: string
  }>
}

export const solutions: Record<string, SolutionPageData> = {
  'residences-seniors': {
    slug: 'residences-seniors',
    metaTitle: 'Animation résidence seniors | Heya — participation sans surcharge conciergerie',
    metaDescription: 'Heya aide les résidences seniors à lutter contre l\'isolement : totem convivial, signal lumineux dans chaque appartement, dashboard pour la direction. Demandez une démo.',
    badge: 'Heya pour les résidences seniors',
    title: 'Augmentez la participation aux animations, sans surcharger votre équipe',
    subtitle: 'Heya connecte le totem des espaces communs aux lampes de chaque appartement. Les résidents proposent des activités en un geste. Votre conciergerie et votre direction voient enfin ce qui fonctionne.',
    heroImage: '/images/solutions/hero-seniors.png',
    heroImageAlt: 'Résidents seniors en conversation dans un salon partagé',
    proofChips: [
      'Sans écran ni application à installer pour les résidents',
      'Interface accessible, pensée pour tous les profils',
      'Dashboard de participation pour la direction'
    ],
    audienceTitle: 'Une solution pensée pour les équipes de terrain et la direction',
    audienceSubtitle: 'Trois publics qui portent la vie sociale de la résidence au quotidien.',
    personas: [
      {
        icon: 'i-lucide-users',
        title: 'Directrice / Directeur de résidence',
        description: 'Vous pilotez la qualité de vie et la fréquentation des animations. Heya vous donne une vision claire de la participation, sans multiplier les réunions avec l\'équipe.'
      },
      {
        icon: 'i-lucide-bell',
        title: 'Conciergerie et équipe d\'animation',
        description: 'Vous êtes sollicités en permanence, mais les activités peinent à se remplir. Heya rend les propositions visibles dans chaque logement, sans affichage à refaire chaque semaine.'
      },
      {
        icon: 'i-lucide-calendar',
        title: 'Responsable ANIM ou coordinateur vie sociale',
        description: 'Vous cherchez des outils simples, inclusifs, qui ne reposent pas sur le smartphone. Heya complète votre programmation sans la remplacer.'
      }
    ],
    challengesTitle: 'Les défis du quotidien en résidence seniors',
    challengesSubtitle: 'Trois freins reviennent dans presque toutes les résidences que nous rencontrons. Heya a été conçu pour y répondre concrètement.',
    challenges: [
      {
        num: '01',
        title: 'Isolement malgré la vie collective',
        description: 'En résidence, beaucoup de résidents croisent du monde dans les couloirs, mais restent seuls dans leur appartement. L\'isolement touche une part importante des personnes âgées en France. Le lien social ne se décrète pas : il faut des occasions simples de se retrouver.'
      },
      {
        num: '02',
        title: 'Charge conciergerie et équipe d\'animation',
        description: 'Relances, affiches, messages oraux, tableaux dans le hall : l\'information se perd. L\'équipe passe du temps à communiquer, pas à animer. Sans outil de suivi, impossible de savoir quelles activités méritent d\'être reconduites.'
      },
      {
        num: '03',
        title: 'Activités peu visibles, donc peu suivies',
        description: 'Une séance bien préparée peut réunir trois personnes faute de visibilité au bon moment. Les résidents oublient, hésitent, ou ne savent pas que « ce soir, c\'est café-discussions ». Résultat : découragement des proposants et baisse progressive de la dynamique collective.'
      }
    ],
    helpTitle: 'Une solution simple, du totem au dashboard',
    helpSubtitle: 'Heya relie le lieu de vie commun et chaque appartement en quatre étapes. Pas de formation complexe, pas d\'écran à apprendre.',
    helpAccent: 'violet',
    helpSteps: [
      {
        num: '01',
        title: 'Propositions au totem',
        description: 'Un résident ou un membre de l\'équipe propose une activité directement au totem : jeux de société, sortie, atelier manuel, moment café. Interface physique, intuitive, sans écran complexe.',
        scene: 'totem',
      },
      {
        num: '02',
        title: 'Signal lumineux dans chaque appartement',
        description: 'Chaque lampe relay s\'allume dans la couleur de l\'activité : bleu, jaune, orange ou violet. Le message arrive chez le résident, sans affiche à lire ni notification sur téléphone.',
        scene: 'lamp',
      },
      {
        num: '03',
        title: 'Participation spontanée',
        description: 'Les résidents voient qu\'une activité est proposée et se rejoignent naturellement. Pas besoin de s\'inscrire sur une liste ou de scanner un QR code. Le geste reste léger, social, inclusif.',
        scene: 'gather',
      },
      {
        num: '04',
        title: 'Données pour la direction',
        description: 'Le dashboard affiche la participation en temps réel : quelles activités mobilisent, quels créneaux fonctionnent, comment évolue la vie sociale. Vous pilotez avec des indicateurs, pas seulement des impressions.',
        scene: 'dashboard',
      }
    ],
    benefitsTitle: 'Ce que votre résidence gagne concrètement',
    benefitsLayout: 'matrix',
    benefitRows: [
      { title: 'Visibilité des activités', team: 'Moins de relances manuelles', direction: 'Meilleure fréquentation des animations', mark: 'lamp' },
      { title: 'Simplicité d\'usage', team: 'Moins de charge conciergerie', direction: 'Adoption rapide par les résidents', mark: 'gesture' },
      { title: 'Inclusivité', team: 'Accessible sans smartphone', direction: 'Image résidence engagée sur le lien social', mark: 'together' },
      { title: 'Pilotage', team: 'Retours terrain plus clairs', direction: 'Données de participation exploitables', mark: 'chart' }
    ],
    benefitsFootnote: 'Heya ne remplace pas votre équipe d\'animation. Il amplifie ce qu\'elle fait déjà : rendre visible l\'envie de partager un moment ensemble.',
    useCase: {
      title: 'Exemple concret : un café-discussions un mardi soir',
      activityLabel: 'Café / discussions',
      activityColorClass: 'bg-activity-violet',
      image: '/images/solutions/use-case-seniors.png',
      imageAlt: 'Résidents seniors en discussion dans un salon commun',
      story: 'Marie, 78 ans, propose un café-discussions au totem en fin d\'après-midi. Dans les appartements, les lampes s\'allument en violet. Robert, qui ne consulte jamais l\'affiche du hall, voit le signal depuis son fauteuil. Il descend. Deux autres résidents le rejoignent.',
      outcome: 'Le lendemain, la directrice consulte le dashboard : l\'activité a mobilisé quatre personnes, dont deux qui ne participaient plus depuis plusieurs semaines. L\'équipe décide de reconduire le créneau. Sans Heya, cette dynamique serait restée invisible.'
    },
    testimonials: [
      {
        quote: 'Avant Heya, on préparait des animations correctes, mais on ne savait pas pourquoi certaines ne décollaient pas. Aujourd\'hui, on voit ce qui mobilise réellement. Et surtout, des résidents proposent eux-mêmes des activités.',
        name: 'Sophie Martin',
        role: 'Directrice de résidence services seniors',
        badge: 'Direction',
        initials: 'SM',
        avatar: '/images/solutions/avatar-sophie.png'
      },
      {
        quote: 'Je ne lis plus les affiches, mais je vois la lumière dans mon entrée. Quand c\'est violet, je sais qu\'on se retrouve pour discuter. C\'est simple, et ça m\'a remis en lien avec les voisins.',
        name: 'Marie Dupont',
        role: 'Résidente',
        badge: 'Résidente',
        initials: 'MD',
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
        answer: 'Oui. Heya s\'adresse à tout habitat partagé où des résidents vivent en collectif et où la direction souhaite renforcer le lien social.'
      },
      {
        question: 'Combien de temps faut-il pour installer Heya ?',
        answer: 'L\'installation est pensée pour être rapide, avec un accompagnement de l\'équipe Heya. Une période de test de 3 à 12 mois permet de valider l\'adoption sur site.'
      },
      {
        question: 'Est-ce compatible avec notre programmation d\'animations existante ?',
        answer: 'Oui. Heya ne remplace pas vos animations : il les rend visibles et mesurables. Jeux, sorties, ateliers, moments conviviaux : tout peut transiter par le totem.'
      },
      {
        question: 'Qui utilise le dashboard ?',
        answer: 'La direction et, selon votre organisation, la conciergerie ou le responsable animation. Les données aident à ajuster la programmation et à valoriser l\'action sociale de la résidence.'
      },
      {
        question: 'Comment lutter contre l\'isolement sans stigmatiser les résidents ?',
        answer: 'Heya part d\'une logique positive : proposer un moment ensemble, pas diagnostiquer un isolement. Le signal lumineux invite, il n\'interpelle pas.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre résidence seniors',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois avec votre équipe sur site.',
    relatedSolutions: [
      { label: 'Co-living', to: '/solutions/co-living', image: '/images/solutions/hero-coliving.png' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', image: '/images/solutions/hero-etudiants.png' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', image: '/images/solutions/hero-inclusif.png' }
    ]
  },
  'co-living': {
    slug: 'co-living',
    metaTitle: 'Animer un habitat partagé | Heya — convivialité en espaces communs',
    metaDescription: 'Heya facilite la vie collective en co-living et habitat partagé : activités visibles au totem, signal dans chaque logement, dashboard pour les gestionnaires. Demandez une démo.',
    badge: 'Heya pour l\'habitat partagé',
    title: 'Donnez vie à vos espaces communs, sans dépendre de quelques habitués',
    subtitle: 'En co-living, la convivialité ne se décrète pas dans un règlement intérieur. Heya rend les propositions d\'activités visibles pour tous les colocataires, y compris les nouveaux arrivants.',
    heroImage: '/images/solutions/hero-coliving.png',
    heroImageAlt: 'Colocataires préparant un repas dans une cuisine partagée',
    proofChips: [
      'Idéal pour salles communes, cuisines partagées, halls d\'accueil',
      'Signal discret dans chaque logement',
      'Vision claire pour le gestionnaire ou community manager'
    ],
    audienceTitle: 'Une solution pour animer l\'habitat partagé au quotidien',
    audienceSubtitle: 'Trois publics concernés par la vie collective en co-living.',
    personas: [
      {
        icon: 'i-lucide-building-2',
        title: 'Gestionnaire de résidence / opérateur coliving',
        description: 'Vous cherchez à différencier votre offre par la qualité de vie collective. Heya vous aide à animer l\'espace sans recruter un community manager à temps plein.'
      },
      {
        icon: 'i-lucide-users',
        title: 'Community manager ou responsable vie collective',
        description: 'Vous portez la dynamique du lieu, mais vous ne pouvez pas être partout. Heya distribue l\'information et encourage les propositions spontanées.'
      },
      {
        icon: 'i-lucide-home',
        title: 'Colocataires',
        description: 'Ils découvrent simplement qu\'un dîner, un jeu ou une sortie est proposé. Pas d\'app, pas de groupe WhatsApp obligatoire.'
      }
    ],
    challengesTitle: 'Les défis de la vie collective en habitat partagé',
    challengesSubtitle: 'Le co-living promet du lien. En pratique, trois obstacles reviennent sans cesse.',
    challenges: [
      {
        num: '01',
        title: 'Turnover et intégration des nouveaux',
        description: 'Tous les trimestres, de nouveaux visages arrivent. Sans repères, ils restent dans leur studio. Les espaces communs semblent réservés à un noyau de colocataires déjà installés.'
      },
      {
        num: '02',
        title: 'Espaces communs sous-utilisés',
        description: 'Salon, cuisine, rooftop, salle de jeux : investis à la conception, souvent vides en semaine. La volonté de partager existe, mais personne ne sait qu\'un moment convivial est lancé.'
      },
      {
        num: '03',
        title: 'Coordination informelle et épuisante',
        description: 'Un groupe de colocataires actifs porte l\'ambiance. Quand ils partent, la dynamique s\'effondre. Les activités dépendent de l\'énergie de quelques personnes, pas d\'un système simple et durable.'
      }
    ],
    helpTitle: 'Un fil conducteur entre le lieu commun et chaque logement',
    helpSubtitle: 'Heya transforme un espace partagé en vrai lieu de rencontre, sans surcharger le gestionnaire.',
    helpAccent: 'orange',
    helpSteps: [
      {
        num: '01',
        title: 'Propositions au totem',
        description: 'Un colocataire propose un dîner collectif, une session jeux, une sortie running ou un café du matin au totem. L\'interface reste physique et immédiate.',
        scene: 'totem',
      },
      {
        num: '02',
        title: 'Signal lumineux chez chaque colocataire',
        description: 'La lampe relay s\'allume dans la couleur de l\'activité. Même ceux qui ne lisent pas le groupe Telegram voient qu\'un moment convivial est lancé.',
        scene: 'lamp',
      },
      {
        num: '03',
        title: 'Rencontres spontanées',
        description: 'Les colocataires se retrouvent sans friction d\'inscription. La barrière du « je ne connais personne » baisse, surtout pour les nouveaux.',
        scene: 'gather',
      },
      {
        num: '04',
        title: 'Pilotage pour le gestionnaire',
        description: 'Le dashboard montre quelles activités créent de la dynamique, quels créneaux fonctionnent, comment la vie collective évolue dans le bâtiment.',
        scene: 'dashboard',
      }
    ],
    benefitsTitle: 'Pourquoi les opérateurs choisissent Heya',
    benefitsLayout: 'highlights',
    benefitHighlights: [
      { title: 'Rétention des colocataires', description: 'Une vie collective visible améliore l\'expérience et réduit le turnover perçu.', mark: 'together' },
      { title: 'Valorisation des espaces communs', description: 'Le ROI des aménagements partagés devient tangible.', mark: 'spaces' },
      { title: 'Charge réduite pour l\'équipe', description: 'Moins de relances, plus de propositions spontanées.', mark: 'gesture' },
      { title: 'Différenciation commerciale', description: '« Habitat partagé qui vit vraiment » devient un argument de vente.', mark: 'spark' }
    ],
    useCase: {
      title: 'Exemple concret : un dîner du mardi dans la cuisine commune',
      activityLabel: 'Activité manuelle',
      activityColorClass: 'bg-activity-orange',
      image: '/images/solutions/use-case-coliving.png',
      imageAlt: 'Jeunes colocataires partageant un repas dans une cuisine rustique',
      story: 'Lucas, colocataire depuis deux semaines, hésite à proposer quoi que ce soit. Il teste le totem : « Dîner partagé, 19h30, cuisine ». Les lampes s\'allument en orange. Emma, qui ne check jamais le Slack du coliving, voit le signal et descend avec des pâtes.',
      outcome: 'Trois autres colocataires rejoignent. Le gestionnaire note dans le dashboard une activité spontanée réussie, sans qu\'il ait eu à organiser quoi que ce soit. Lucas se sent enfin intégré.'
    },
    testimonials: [
      {
        quote: 'Nos espaces communs étaient magnifiques sur le papier, mais calmes en semaine. Heya a relancé des moments spontanés. On n\'a pas recruté plus, on a mieux connecté les colocataires entre eux.',
        name: 'Thomas Leroy',
        role: 'Responsable vie collective',
        badge: 'Gestion',
        initials: 'TL'
      },
      {
        quote: 'Je ne lisais jamais les messages du groupe. La lumière orange dans mon couloir, c\'est devenu mon signal pour descendre. J\'ai rencontré la moitié de l\'immeuble comme ça.',
        name: 'Inès K.',
        role: 'Colocataire',
        badge: 'Colocataire',
        initials: 'IK'
      }
    ],
    faqTitle: 'Questions fréquentes des opérateurs de co-living',
    faq: [
      {
        question: 'Heya est-il réservé au co-living « nomade » ou digital ?',
        answer: 'Non. Heya s\'adresse à tout habitat partagé en France : co-living, résidences avec espaces communs, colocations structurées, foyers avec vie collective.'
      },
      {
        question: 'Faut-il imposer une application aux colocataires ?',
        answer: 'Non. Le signal passe par une lampe relay dans le logement. Pas de compte, pas de notification push.'
      },
      {
        question: 'Qui peut proposer une activité ?',
        answer: 'Tout colocataire ou membre de l\'équipe sur site. Heya encourage la participation horizontale.'
      },
      {
        question: 'Comment gérer les nouveaux arrivants ?',
        answer: 'Dès l\'installation de la lampe relay, le nouveau colocataire reçoit les signaux d\'activité. L\'intégration devient visible, pas seulement administrative.'
      },
      {
        question: 'Le dashboard est-il utile si je n\'ai qu\'un seul bâtiment ?',
        answer: 'Oui. Même à petite échelle, comprendre ce qui mobilise aide à ajuster les espaces, les horaires et la communication.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre co-living ou habitat partagé',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', image: '/images/solutions/hero-seniors.png' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', image: '/images/solutions/hero-etudiants.png' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', image: '/images/solutions/hero-inclusif.png' }
    ]
  },
  'residences-etudiantes': {
    slug: 'residences-etudiantes',
    metaTitle: 'Lutter contre l\'isolement en résidence étudiante | Heya',
    metaDescription: 'Heya aide les résidences étudiantes et CROUS à créer du lien : totem convivial, signal dans chaque chambre, sans app ni barrière numérique. Demandez une démo.',
    badge: 'Heya pour les résidences étudiantes',
    title: 'Brisez l\'isolement en résidence, sans imposer une application de plus',
    subtitle: 'Heya aide les étudiants à se retrouver autour d\'activités simples. Propositions au totem, signal lumineux dans chaque chambre, tableau de bord pour la gestion de résidence. Accessible à tous, y compris aux étudiants internationaux.',
    heroImage: '/images/solutions/hero-etudiants.png',
    heroImageAlt: 'Étudiants travaillant ensemble autour d\'une table ensoleillée',
    proofChips: [
      'Sans barrière de langue ni fracture numérique',
      'Alternative à l\'affiche ignorée et au groupe silencieux',
      'Suivi pour gestionnaires CROUS et résidences privées'
    ],
    audienceTitle: 'Une solution pour animer la vie de résidence, sans barrière numérique',
    audienceSubtitle: 'Trois publics concernés par le lien social en résidence étudiante.',
    personas: [
      {
        icon: 'i-lucide-graduation-cap',
        title: 'Gestionnaire de résidence universitaire / CROUS',
        description: 'Vous gérez des centaines d\'étudiants, dont beaucoup de nouveaux chaque rentrée. Heya vous aide à animer la vie sociale sans multiplier les permanences.'
      },
      {
        icon: 'i-lucide-bell',
        title: 'Assistant·e de vie étudiante / responsable vie sociale',
        description: 'Vous cherchez des formats inclusifs, visibles, qui ne reposent pas sur les réseaux sociaux. Heya complète affichage et événements ponctuels.'
      },
      {
        icon: 'i-lucide-globe',
        title: 'Étudiants, y compris internationaux',
        description: 'Ils comprennent le signal lumineux sans lire un panneau en français. Le geste reste universel : proposer, voir, rejoindre.'
      }
    ],
    challengesTitle: 'Les défis de la vie sociale en résidence étudiante',
    challengesSubtitle: 'Entre précarité, charge de travail et turnover annuel, le lien social en résidence est fragile. Trois freins reviennent souvent.',
    challenges: [
      {
        num: '01',
        title: 'Arrivée en résidence et création de réseau',
        description: 'La rentrée concentre stress académique et isolement. Beaucoup d\'étudiants ne connaissent personne dans leur bâtiment. Les espaces communs existent, mais personne ne sait comment les activer.'
      },
      {
        num: '02',
        title: 'Barrières linguistiques et culturelles',
        description: 'Les étudiants internationaux peinent à s\'intégrer aux initiatives existantes, souvent portées par un noyau francophone. Affiches, groupes en ligne, permanences : autant de filtres qui excluent.'
      },
      {
        num: '03',
        title: 'Animations peu visibles, faible participation',
        description: 'Le panneau d\'affichage au RDC est ignoré. Les soirées organisées par le bureau des étudiants peinent à mobiliser au-delà des habitués. Résultat : isolement dans 10 m², parfois appelé « chambre-coucou ».'
      }
    ],
    helpTitle: 'Créer du lien, du hall d\'accueil à la chambre',
    helpSubtitle: 'Heya rend la vie sociale visible là où les étudiants vivent vraiment : dans leur logement.',
    helpAccent: 'blue',
    helpSteps: [
      {
        num: '01',
        title: 'Propositions au totem',
        description: 'Un étudiant propose un FIFA, un cours de cuisine, une session révisions ou un café multilingue au totem du hall. Pas d\'écran complexe, pas de compte à créer.',
        scene: 'totem',
      },
      {
        num: '02',
        title: 'Signal lumineux dans chaque chambre',
        description: 'La lampe relay s\'allume dans la couleur de l\'activité. L\'information traverse les barrières de langue : voir, comprendre, descendre.',
        scene: 'lamp',
      },
      {
        num: '03',
        title: 'Participation spontanée',
        description: 'Les étudiants se rejoignent sans s\'inscrire sur une liste. Les nouveaux et les internationaux accèdent au même signal que les anciens.',
        scene: 'gather',
      },
      {
        num: '04',
        title: 'Données pour la gestion de résidence',
        description: 'Le dashboard montre quelles activités fonctionnent, quels moments de la semaine mobilisent, comment la vie sociale évolue dans le bâtiment.',
        scene: 'dashboard',
      }
    ],
    benefitsTitle: 'Impact pour la résidence et les étudiants',
    benefitsLayout: 'highlights',
    benefitHighlights: [
      { title: 'Réduction de l\'isolement', description: 'Surtout en début de semestre, quand le réseau n\'existe pas encore.', mark: 'lamp' },
      { title: 'Espaces communs utilisés', description: 'Cuisine, salle détente, cour : les lieux aménagés redeviennent des lieux de rencontre.', mark: 'spaces' },
      { title: 'Inclusion des internationaux', description: 'Sans outil numérique exclusif, ni affiche à déchiffrer.', mark: 'together' },
      { title: 'Preuve d\'action vie sociale', description: 'Des données pour le CROUS, le bailleur ou la direction.', mark: 'chart' }
    ],
    useCase: {
      title: 'Exemple concret : un café multilingue un jeudi soir',
      activityLabel: 'Café / discussions',
      activityColorClass: 'bg-activity-violet',
      image: '/images/solutions/use-case-etudiants.png',
      imageAlt: 'Étudiantes partageant un moment autour d\'un livre',
      story: 'Sara, étudiante en échange Erasmus, ne comprend pas l\'affiche du hall. Un autre résident propose un « café langues » au totem. Les lampes s\'allument en violet. Sara voit le signal depuis sa chambre, descend, rencontre trois autres étudiants.',
      outcome: 'Le gestionnaire de résidence constate via le dashboard une activité spontanée réussie, sans avoir mobilisé son équipe. Sara a créé son premier réseau local en une soirée.'
    },
    testimonials: [
      {
        quote: 'Chaque rentrée, même problème : des étudiants seuls dans leur chambre alors que la cuisine est à dix mètres. Heya a relancé des activités qu\'on ne voyait plus. Et surtout, ce ne sont plus toujours les mêmes qui proposent.',
        name: 'Karim Benali',
        role: 'Responsable vie étudiante',
        badge: 'Vie étudiante',
        initials: 'KB'
      },
      {
        quote: 'Je ne lisais pas les affiches. Quand ma lampe s\'allume, je comprends qu\'il se passe quelque chose. C\'est comme ça que j\'ai rencontré ma colocataire de projet.',
        name: 'Yuki T.',
        role: 'Étudiante en échange',
        badge: 'Étudiante',
        initials: 'YT'
      }
    ],
    faqTitle: 'Questions fréquentes des résidences étudiantes',
    faq: [
      {
        question: 'Heya remplace-t-il le bureau des étudiants ou le CROUS ?',
        answer: 'Non. Heya complète la vie sociale existante. Il facilite les propositions spontanées et rend les activités visibles.'
      },
      {
        question: 'Est-ce adapté aux étudiants qui ne parlent pas français ?',
        answer: 'Oui. Le signal lumineux et le totem physique ne reposent pas sur la lecture d\'un panneau ou d\'une app en français.'
      },
      {
        question: 'Faut-il le WiFi étudiant pour que ça fonctionne ?',
        answer: 'Heya s\'appuie sur l\'infrastructure du bâtiment. Les détails d\'installation sont validés avec l\'équipe Heya lors de la phase de déploiement.'
      },
      {
        question: 'Comment mesurer l\'impact sur l\'isolement ?',
        answer: 'Le dashboard de participation donne des indicateurs sur la fréquentation des activités. Couplé aux retours terrain, il aide à objectiver la dynamique sociale.'
      },
      {
        question: 'Peut-on tester avant un déploiement complet ?',
        answer: 'Oui. Heya propose des périodes de test de 3 à 12 mois pour valider l\'adoption sur un bâtiment ou une aile de résidence.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre résidence étudiante',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', image: '/images/solutions/hero-seniors.png' },
      { label: 'Co-living', to: '/solutions/co-living', image: '/images/solutions/hero-coliving.png' },
      { label: 'Habitat inclusif', to: '/solutions/habitat-inclusif', image: '/images/solutions/hero-inclusif.png' }
    ]
  },
  'habitat-inclusif': {
    slug: 'habitat-inclusif',
    metaTitle: 'Lien social en habitat inclusif | Heya — sans fracture numérique',
    metaDescription: 'Heya favorise la convivialité en habitat inclusif : interface accessible, signal lumineux, dashboard pour mesurer la participation. Sans app ni QR code. Demandez une démo.',
    badge: 'Heya pour l\'habitat inclusif',
    title: 'Créez du lien social en habitat inclusif, sans exclure personne',
    subtitle: 'Heya dépasse les barrières de langue, de génération et de fracture numérique. Un totem accessible, un signal lumineux chez chaque habitant, des données pour les équipes qui pilotent l\'inclusion au quotidien.',
    heroImage: '/images/solutions/hero-inclusif.png',
    heroImageAlt: 'Moment intergénérationnel autour d\'une table partagée',
    proofChips: [
      'Sans application, sans QR code, sans écran complexe',
      'Accessible aux profils variés (âge, langue, handicap numérique)',
      'Dashboard pour objectiver la vie sociale partagée'
    ],
    audienceTitle: 'Une solution pour les équipes d\'accompagnement et les habitants',
    audienceSubtitle: 'Trois publics concernés par le lien social en habitat inclusif.',
    personas: [
      {
        icon: 'i-lucide-accessibility',
        title: 'Directeur·rice ou coordinateur·rice de structure',
        description: 'Vous portez un projet de logement accompagné, partagé et inséré localement. Heya vous aide à mesurer et stimuler la vie sociale, au-delà des présences administratives.'
      },
      {
        icon: 'i-lucide-hand-heart',
        title: 'Équipe éducative, soignante ou d\'accompagnement',
        description: 'Vous cherchez des outils simples, non stigmatisants, qui ne reposent pas sur le smartphone de chacun.'
      },
      {
        icon: 'i-lucide-users-round',
        title: 'Habitants aux profils variés',
        description: 'Personnes âgées, personnes en situation de handicap, colocataires valides : Heya part d\'une logique inclusive par le geste, pas par l\'écran.'
      }
    ],
    challengesTitle: 'Les défis de l\'inclusion dans les habitats mixtes',
    challengesSubtitle: 'L\'habitat inclusif réunit des profils, des âges et des modes de communication différents. Trois obstacles reviennent régulièrement.',
    challenges: [
      {
        num: '01',
        title: 'Diversité des résidents, outils uniformes',
        description: 'Applications, QR codes, groupes en ligne : autant de solutions qui excluent ceux qui ne maîtrisent pas le numérique, ne lisent pas facilement, ou ne parlent pas la langue dominante.'
      },
      {
        num: '02',
        title: 'Fracture numérique au cœur du logement',
        description: 'Imposer une app pour participer à la vie collective crée une barrière invisible. L\'inclusion se joue aussi dans la simplicité du geste quotidien.'
      },
      {
        num: '03',
        title: 'Inclusion difficile à objectiver',
        description: 'Les équipes savent que le lien social compte, mais disposent de peu d\'indicateurs concrets. Comment montrer qu\'un habitat « vit » vraiment ensemble ?'
      }
    ],
    helpTitle: 'Une convivialité accessible, mesurable, partagée',
    helpSubtitle: 'Heya s\'inscrit dans la logique de l\'habitat inclusif : chez soi, ensemble, sans seul recours au numérique.',
    helpAccent: 'yellow',
    helpSteps: [
      {
        num: '01',
        title: 'Propositions au totem',
        description: 'Un habitant ou un membre de l\'équipe propose une activité au totem : café, jeux, jardinage, moment musique. Interface physique, pensée pour être comprise sans formation.',
        scene: 'totem',
      },
      {
        num: '02',
        title: 'Signal lumineux chez chaque habitant',
        description: 'La lampe relay s\'allume dans la couleur de l\'activité. Le message arrive chez chacun, y compris ceux qui ne consultent pas d\'écran.',
        scene: 'lamp',
      },
      {
        num: '03',
        title: 'Rencontres naturelles entre profils variés',
        description: 'Les habitants se rejoignent autour d\'un moment convivial. La diversité des profils devient une force, pas un frein à la communication.',
        scene: 'gather',
      },
      {
        num: '04',
        title: 'Données pour piloter l\'inclusion',
        description: 'Le dashboard montre la participation à la vie sociale. Les équipes disposent d\'indicateurs pour ajuster l\'accompagnement et valoriser le projet auprès des financeurs.',
        scene: 'dashboard',
      }
    ],
    benefitsTitle: 'Pourquoi Heya s\'intègre à un projet inclusif',
    benefitsLayout: 'highlights',
    benefitHighlights: [
      { title: 'Accessibilité universelle', description: 'Pas de prérequis numérique pour participer.', mark: 'gesture' },
      { title: 'Respect des différences', description: 'Langue, génération, handicap ne bloquent plus l\'information.', mark: 'together' },
      { title: 'Vie sociale objectivée', description: 'Des données pour les bilans, les ARS, les financeurs.', mark: 'chart' },
      { title: 'Cohérence avec les valeurs API', description: 'Un logement partagé qui crée du lien, pas seulement de la cohabitation.', mark: 'spark' }
    ],
    useCase: {
      title: 'Exemple concret : un atelier jardinage un samedi matin',
      activityLabel: 'Activité extérieur',
      activityColorClass: 'bg-activity-yellow',
      image: '/images/solutions/use-case-inclusif.png',
      imageAlt: 'Habitants en atelier jardinage dans un habitat partagé',
      story: 'Dans un habitat inclusif mêlant personnes âgées et colocataires en accompagnement, Paul propose un atelier jardinage au totem. Les lampes s\'allument en jaune. Anne, 72 ans, ne possède pas de smartphone : elle voit le signal depuis sa fenêtre ouverte sur le couloir.',
      outcome: 'Quatre habitants se retrouvent. L\'équipe d\'accompagnement note une participation spontanée intergénérationnelle. Le dashboard confirme une dynamique sociale qui aurait été invisible autrement.'
    },
    testimonials: [
      {
        quote: 'Nos habitants ne voulaient pas d\'une énième application. Heya a trouvé le bon niveau : simple, visible, inclusif. On voit enfin si la vie collective décolle, au-delà des impressions de l\'équipe.',
        name: 'Émilie Rousseau',
        role: 'Coordinatrice de projet API',
        badge: 'Coordination',
        initials: 'ÉR'
      },
      {
        quote: 'Je ne suis pas à l\'aise avec les écrans. Quand la lumière s\'allume, je sais qu\'on se retrouve. C\'est devenu mon repère dans la maison.',
        name: 'Jean-Pierre L.',
        role: 'Habitant',
        badge: 'Habitant',
        initials: 'JP',
        avatar: '/images/solutions/avatar-resident.png'
      }
    ],
    faqTitle: 'Questions fréquentes des structures habitat inclusif',
    faq: [
      {
        question: 'Heya est-il compatible avec un habitat inclusif (API) ?',
        answer: 'Oui. Heya répond à la logique de vie partagée en habitat inclusif : logement ordinaire, espaces communs, accompagnement, inclusion dans le quartier.'
      },
      {
        question: 'Faut-il savoir utiliser un smartphone ?',
        answer: 'Non. Le totem et la lampe relay fonctionnent sans application pour les habitants.'
      },
      {
        question: 'Comment Heya traite-t-il la diversité des profils ?',
        answer: 'Heya part d\'un signal simple (lumière + couleur) et d\'une interface physique au totem. Pas de texte obligatoire à lire pour comprendre qu\'une activité est proposée.'
      },
      {
        question: 'Les données respectent-elles la vie privée des habitants ?',
        answer: 'Heya mesure la participation aux activités proposées via le système, pas la surveillance individuelle. Les détails RGPD sont validés lors du déploiement avec la structure.'
      },
      {
        question: 'Peut-on utiliser Heya pour valoriser un projet auprès de la CNSA ou des financeurs ?',
        answer: 'Le dashboard aide à objectiver la dynamique sociale du lieu. Couplé aux retours qualitatifs de l\'équipe, il nourrit les bilans et les rapports d\'activité.'
      }
    ],
    ctaTitle: 'Testez Heya dans votre habitat inclusif',
    ctaSubtitle: 'Demandez une démo personnalisée ou lancez un test de 3 à 12 mois avec votre équipe sur site.',
    relatedSolutions: [
      { label: 'Résidences seniors', to: '/solutions/residences-seniors', image: '/images/solutions/hero-seniors.png' },
      { label: 'Co-living', to: '/solutions/co-living', image: '/images/solutions/hero-coliving.png' },
      { label: 'Résidences étudiantes', to: '/solutions/residences-etudiantes', image: '/images/solutions/hero-etudiants.png' }
    ]
  }
}
