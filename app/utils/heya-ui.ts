/** Shared visual language for page heroes / section labels. */
export const heyaEyebrow
  = 'inline-flex w-fit rounded-full border border-primary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary'

export const heyaHeroCentered = {
  root: 'bg-default pt-14 pb-16 sm:pt-16 sm:pb-20',
  container: 'items-center text-center',
  headline: heyaEyebrow,
  title: 'text-4xl sm:text-5xl font-bold tracking-tight text-highlighted max-w-3xl mx-auto',
  description: 'text-base sm:text-lg text-muted max-w-[40rem] mx-auto leading-relaxed',
  links: 'justify-center gap-3'
} as const

export const heyaHeroSplit = {
  root: 'bg-default pt-14 pb-16 sm:pt-16 sm:pb-20',
  container: 'items-center gap-10 lg:gap-16',
  headline: heyaEyebrow,
  title: 'text-4xl sm:text-5xl font-bold tracking-tight text-highlighted',
  description: 'text-base sm:text-lg text-muted max-w-[40rem] leading-relaxed',
  links: 'gap-3'
} as const

export const heyaSectionHeadline
  = 'text-[11px] font-semibold uppercase tracking-widest text-primary'

export const heyaCard = 'rounded-[1.25rem]'
