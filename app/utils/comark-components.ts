import type { Component } from 'vue'
import ContentBlockBusinessProof from '~/components/content/blocks/BusinessProof.vue'
import ContentBlockContactCta from '~/components/content/blocks/ContactCta.vue'
import ContentBlockHero from '~/components/content/blocks/Hero.vue'
import ContentBlockHowItWorks from '~/components/content/blocks/HowItWorks.vue'
import ContentBlockOffers from '~/components/content/blocks/Offers.vue'
import ContentBlockProblem from '~/components/content/blocks/Problem.vue'
import ContentBlockRichtext from '~/components/content/blocks/Richtext.vue'
import ContentBlockSolution from '~/components/content/blocks/Solution.vue'
import ContentBlockTestimonials from '~/components/content/blocks/Testimonials.vue'
import ContentBlockUseCases from '~/components/content/blocks/UseCases.vue'
import ContentBlockValues from '~/components/content/blocks/Values.vue'

export const heyaComarkComponents = {
  hero: ContentBlockHero,
  'business-proof': ContentBlockBusinessProof,
  problem: ContentBlockProblem,
  'how-it-works': ContentBlockHowItWorks,
  values: ContentBlockValues,
  'use-cases': ContentBlockUseCases,
  testimonials: ContentBlockTestimonials,
  offers: ContentBlockOffers,
  'contact-cta': ContentBlockContactCta,
  solution: ContentBlockSolution,
  richtext: ContentBlockRichtext
} satisfies Record<string, Component>

export const heyaComarkBlockNames = Object.keys(heyaComarkComponents) as (keyof typeof heyaComarkComponents)[]
