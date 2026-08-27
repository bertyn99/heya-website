import * as z from 'zod'

const linkSchema = z.object({
  label: z.string().trim().min(1),
  to: z.string().trim().min(1),
  target: z.enum(['_blank', '_self']).optional()
})

export const heroBlockSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
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
  description: z.string().trim().optional()
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
