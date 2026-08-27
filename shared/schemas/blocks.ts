import * as z from 'zod'

const linkSchema = z.object({
  label: z.string().trim().min(1),
  to: z.string().trim().min(1),
  target: z.enum(['_blank', '_self']).optional(),
  color: z.enum(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']).optional(),
  variant: z.enum(['solid', 'outline', 'soft', 'subtle', 'ghost', 'link']).optional(),
  icon: z.string().trim().optional()
})

const iconItemSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  icon: z.string().trim().min(1)
})

export const heroBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
  layout: z.enum(['split', 'center']).default('split'),
  links: z.array(linkSchema).default([])
})

export const valuesBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tone: z.enum(['blue', 'gold', 'green']).default('blue')
  })).min(1)
})

export const businessProofBlockSchema = z.object({
  title: z.string().trim().default('Ils nous font confiance'),
  partners: z.array(z.object({
    name: z.string().trim().min(1),
    logo: z.string().trim().min(1)
  })).default([])
})

export const problemBlockSchema = z.object({
  badge: z.string().trim().default('Le constat'),
  title: z.string().trim().min(1),
  titleAccent: z.string().trim().optional(),
  description: z.string().trim().optional(),
  problems: z.array(iconItemSchema).default([]),
  solutions: z.array(iconItemSchema).default([])
})

export const howItWorksBlockSchema = z.object({
  headline: z.string().trim().default('Comment ça marche'),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  steps: z.array(z.object({
    num: z.string().trim().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tone: z.enum(['blue', 'gold', 'green']).default('blue'),
    image: z.string().trim().optional(),
    imageAlt: z.string().trim().optional()
  })).min(1)
})

export const useCasesBlockSchema = z.object({
  headline: z.string().trim().default('Pour qui'),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    to: z.string().trim().min(1),
    image: z.string().trim().min(1),
    featured: z.boolean().default(false)
  })).min(1)
})

export const testimonialsBlockSchema = z.object({
  headline: z.string().trim().default('Témoignages'),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  items: z.array(z.object({
    quote: z.string().trim().min(1),
    name: z.string().trim().min(1),
    role: z.string().trim().min(1),
    badge: z.string().trim().optional(),
    initials: z.string().trim().optional()
  })).min(1)
})

export const offersBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional()
})

export const contactCtaBlockSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  bullets: z.array(z.string().trim().min(1)).default([]),
  footnote: z.string().trim().optional()
})

export const solutionBlockSchema = z.object({
  slug: z.string().trim().min(1)
})

export const richtextBlockSchema = z.object({
  class: z.string().trim().optional()
})

export const productsBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  items: z.array(z.object({
    label: z.string().trim().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    image: z.string().trim().optional(),
    imageAlt: z.string().trim().optional()
  })).min(1)
})

export const mediaBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
  imageAlt: z.string().trim().optional(),
  tone: z.enum(['light', 'dark']).default('dark')
})

export const statsBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    value: z.string().trim().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().optional(),
    featured: z.boolean().default(false),
    accent: z.enum(['primary', 'teal', 'blue', 'violet']).default('primary')
  })).min(1)
})

export const activitiesBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    icon: z.string().trim().min(1),
    tone: z.enum(['blue', 'yellow', 'orange', 'violet']).default('blue')
  })).min(1)
})

export const installBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    image: z.string().trim().optional()
  })).min(1)
})

export const timelineBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    year: z.string().trim().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tone: z.enum(['orange', 'yellow', 'primary', 'violet']).default('primary')
  })).min(1)
})

export const missionsBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tone: z.enum(['violet', 'teal', 'blue']).default('violet')
  })).min(1)
})

export const founderBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  role: z.string().trim().optional(),
  description: z.string().trim().optional(),
  image: z.string().trim().optional(),
  imageAlt: z.string().trim().optional(),
  links: z.array(linkSchema).default([])
})

export const awardsBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  items: z.array(z.object({
    title: z.string().trim().min(1),
    org: z.string().trim().min(1),
    tag: z.string().trim().min(1),
    image: z.string().trim().optional(),
    tone: z.enum(['blue', 'gold', 'orange', 'violet']).default('blue')
  })).min(1)
})

export const faqBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().optional(),
  items: z.array(z.object({
    question: z.string().trim().min(1),
    answer: z.string().trim().min(1)
  })).min(1)
})

export const contactFormBlockSchema = z.object({
  headline: z.string().trim().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional()
})

export type HeroBlock = z.infer<typeof heroBlockSchema>
export type ValuesBlock = z.infer<typeof valuesBlockSchema>
export type BusinessProofBlock = z.infer<typeof businessProofBlockSchema>
export type ProblemBlock = z.infer<typeof problemBlockSchema>
export type HowItWorksBlock = z.infer<typeof howItWorksBlockSchema>
export type UseCasesBlock = z.infer<typeof useCasesBlockSchema>
export type TestimonialsBlock = z.infer<typeof testimonialsBlockSchema>
export type OffersBlock = z.infer<typeof offersBlockSchema>
export type ContactCtaBlock = z.infer<typeof contactCtaBlockSchema>
export type SolutionBlock = z.infer<typeof solutionBlockSchema>
export type RichtextBlock = z.infer<typeof richtextBlockSchema>
export type ProductsBlock = z.infer<typeof productsBlockSchema>
export type MediaBlock = z.infer<typeof mediaBlockSchema>
export type StatsBlock = z.infer<typeof statsBlockSchema>
export type ActivitiesBlock = z.infer<typeof activitiesBlockSchema>
export type InstallBlock = z.infer<typeof installBlockSchema>
export type TimelineBlock = z.infer<typeof timelineBlockSchema>
export type MissionsBlock = z.infer<typeof missionsBlockSchema>
export type FounderBlock = z.infer<typeof founderBlockSchema>
export type AwardsBlock = z.infer<typeof awardsBlockSchema>
export type FaqBlock = z.infer<typeof faqBlockSchema>
export type ContactFormBlock = z.infer<typeof contactFormBlockSchema>

export const blockSchemas = {
  'hero': heroBlockSchema,
  'business-proof': businessProofBlockSchema,
  'problem': problemBlockSchema,
  'how-it-works': howItWorksBlockSchema,
  'values': valuesBlockSchema,
  'use-cases': useCasesBlockSchema,
  'testimonials': testimonialsBlockSchema,
  'offers': offersBlockSchema,
  'contact-cta': contactCtaBlockSchema,
  'solution': solutionBlockSchema,
  'richtext': richtextBlockSchema,
  'products': productsBlockSchema,
  'media': mediaBlockSchema,
  'stats': statsBlockSchema,
  'activities': activitiesBlockSchema,
  'install': installBlockSchema,
  'timeline': timelineBlockSchema,
  'missions': missionsBlockSchema,
  'founder': founderBlockSchema,
  'awards': awardsBlockSchema,
  'faq': faqBlockSchema,
  'contact-form': contactFormBlockSchema
} as const

export type BlockType = keyof typeof blockSchemas

export type PageBlock = {
  [K in BlockType]: {
    type: K
    props: z.infer<(typeof blockSchemas)[K]>
    body?: string
  }
}[BlockType]
