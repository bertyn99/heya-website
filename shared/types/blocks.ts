export type BlockTone = 'blue' | 'gold' | 'green'
export type LinkTarget = '_blank' | '_self'

export interface BlockLink {
  label: string
  to: string
  target?: LinkTarget
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  icon?: string
}

export interface BlockIconItem {
  title: string
  description: string
  icon: string
}

export interface HeroBlock {
  headline?: string
  title: string
  description?: string
  image?: string
  layout?: 'split' | 'center'
  links?: BlockLink[]
}

export interface ValuesBlockItem {
  title: string
  description: string
  tone: BlockTone
}

export interface ValuesBlock {
  headline?: string
  title: string
  description?: string
  items: ValuesBlockItem[]
}

export interface BusinessProofPartner {
  name: string
  logo: string
}

export interface BusinessProofBlock {
  title?: string
  partners?: BusinessProofPartner[]
}

export interface ProblemBlock {
  badge?: string
  title: string
  titleAccent?: string
  description?: string
  problems?: BlockIconItem[]
  solutions?: BlockIconItem[]
}

export interface HowItWorksStep {
  num: string
  title: string
  description: string
  tone: BlockTone
  image?: string
  imageAlt?: string
}

export interface HowItWorksBlock {
  headline?: string
  title: string
  description?: string
  steps: HowItWorksStep[]
}

export interface UseCaseItem {
  title: string
  description: string
  to: string
  image: string
  featured?: boolean
}

export interface UseCasesBlock {
  headline?: string
  title: string
  items: UseCaseItem[]
}

export interface TestimonialItem {
  quote: string
  name: string
  role: string
  badge?: string
  initials?: string
}

export interface TestimonialsBlock {
  headline?: string
  title: string
  description?: string
  items: TestimonialItem[]
}

export interface OffersBlock {
  headline?: string
  title: string
  description?: string
}

export interface ContactCtaBlock {
  title: string
  description: string
  bullets?: string[]
  footnote?: string
}

export interface SolutionBlock {
  slug: string
}

export interface RichtextBlock {
  class?: string
}

export interface ProductsBlockItem {
  label: string
  title: string
  description: string
  image?: string
  imageAlt?: string
}

export interface ProductsBlock {
  headline?: string
  title: string
  description?: string
  items: ProductsBlockItem[]
}

export interface MediaBlock {
  headline?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  tone?: 'light' | 'dark'
}

export interface StatsBlockItem {
  value: string
  title: string
  description?: string
  featured?: boolean
  accent?: 'primary' | 'teal' | 'blue' | 'violet'
}

export interface StatsBlock {
  headline?: string
  title: string
  items: StatsBlockItem[]
}

export interface ActivitiesBlockItem {
  title: string
  description: string
  icon: string
  tone: 'blue' | 'yellow' | 'orange' | 'violet'
}

export interface ActivitiesBlock {
  headline?: string
  title: string
  description?: string
  items: ActivitiesBlockItem[]
}

export interface InstallBlockItem {
  title: string
  description: string
  image?: string
}

export interface InstallBlock {
  headline?: string
  title: string
  items: InstallBlockItem[]
}

export interface TimelineBlockItem {
  year: string
  title: string
  description: string
  tone: 'orange' | 'yellow' | 'primary' | 'violet'
}

export interface TimelineBlock {
  headline?: string
  title: string
  items: TimelineBlockItem[]
}

export interface MissionsBlockItem {
  title: string
  description: string
  tone: 'violet' | 'teal' | 'blue'
}

export interface MissionsBlock {
  headline?: string
  title: string
  items: MissionsBlockItem[]
}

export interface FounderBlock {
  headline?: string
  title: string
  role?: string
  description?: string
  image?: string
  imageAlt?: string
  links?: BlockLink[]
}

export interface AwardsBlockItem {
  title: string
  org: string
  tag: string
  image?: string
  tone: 'blue' | 'gold' | 'orange' | 'violet'
}

export interface AwardsBlock {
  headline?: string
  title: string
  items: AwardsBlockItem[]
}

export interface FaqBlockItem {
  question: string
  answer: string
}

export interface FaqBlock {
  headline?: string
  title?: string
  items: FaqBlockItem[]
}

export interface ContactFormBlock {
  headline?: string
  title: string
  description?: string
}
