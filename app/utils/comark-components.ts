import type { Component } from 'vue'
import type { BlockType } from '#shared/schemas/blocks'
import ContentBlockActivities from '~/components/content/blocks/Activities.vue'
import ContentBlockAwards from '~/components/content/blocks/Awards.vue'
import ContentBlockBusinessProof from '~/components/content/blocks/BusinessProof.vue'
import ContentBlockContactCta from '~/components/content/blocks/ContactCta.vue'
import ContentBlockContactForm from '~/components/content/blocks/ContactFormBlock.vue'
import ContentBlockFaq from '~/components/content/blocks/Faq.vue'
import ContentBlockFounder from '~/components/content/blocks/Founder.vue'
import ContentBlockHero from '~/components/content/blocks/Hero.vue'
import ContentBlockHowItWorks from '~/components/content/blocks/HowItWorks.vue'
import ContentBlockInstall from '~/components/content/blocks/Install.vue'
import ContentBlockMedia from '~/components/content/blocks/Media.vue'
import ContentBlockMissions from '~/components/content/blocks/Missions.vue'
import ContentBlockOffers from '~/components/content/blocks/Offers.vue'
import ContentBlockProblem from '~/components/content/blocks/Problem.vue'
import ContentBlockProducts from '~/components/content/blocks/Products.vue'
import ContentBlockRichtext from '~/components/content/blocks/Richtext.vue'
import ContentBlockSolution from '~/components/content/blocks/Solution.vue'
import ContentBlockStats from '~/components/content/blocks/Stats.vue'
import ContentBlockTestimonials from '~/components/content/blocks/Testimonials.vue'
import ContentBlockTimeline from '~/components/content/blocks/Timeline.vue'
import ContentBlockUseCases from '~/components/content/blocks/UseCases.vue'
import ContentBlockValues from '~/components/content/blocks/Values.vue'

export const heyaComarkComponents = {
  'hero': ContentBlockHero,
  'business-proof': ContentBlockBusinessProof,
  'problem': ContentBlockProblem,
  'how-it-works': ContentBlockHowItWorks,
  'values': ContentBlockValues,
  'use-cases': ContentBlockUseCases,
  'testimonials': ContentBlockTestimonials,
  'offers': ContentBlockOffers,
  'contact-cta': ContentBlockContactCta,
  'solution': ContentBlockSolution,
  'richtext': ContentBlockRichtext,
  'products': ContentBlockProducts,
  'media': ContentBlockMedia,
  'stats': ContentBlockStats,
  'activities': ContentBlockActivities,
  'install': ContentBlockInstall,
  'timeline': ContentBlockTimeline,
  'missions': ContentBlockMissions,
  'founder': ContentBlockFounder,
  'awards': ContentBlockAwards,
  'faq': ContentBlockFaq,
  'contact-form': ContentBlockContactForm
} satisfies Record<BlockType, Component>

export const heyaComarkBlockNames = Object.keys(heyaComarkComponents) as BlockType[]
