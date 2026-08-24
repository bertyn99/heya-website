export default defineAppConfig({
  ui: {
    colors: {
      primary: 'heya',
      secondary: 'heya-violet',
      neutral: 'heya-neutral',
      success: 'green',
      info: 'blue',
      warning: 'amber',
      error: 'red'
    },
    button: {
      defaultVariants: {
        color: 'primary'
      }
    },
    badge: {
      defaultVariants: {
        color: 'primary',
        variant: 'soft'
      }
    },
    header: {
      slots: {
        root: 'bg-default/95 backdrop-blur-md border-default'
      }
    },
    footer: {
      slots: {
        root: 'bg-heya-dark-footer text-[#aaa293]'
      }
    },
    pricingPlan: {
      slots: {
        root: 'rounded-[10px] border border-default bg-elevated p-8',
        title: 'text-2xl font-normal text-highlighted',
        description: 'text-base text-muted',
        price: 'text-3xl font-normal text-highlighted',
        featureIcon: 'text-primary',
        featureTitle: 'text-sm text-muted',
        footer: 'w-full items-stretch',
        button: 'w-full'
      },
      variants: {
        highlight: {
          true: {
            root: 'border-primary bg-primary ring-0',
            title: 'text-white',
            description: 'text-white',
            price: 'text-white',
            featureIcon: 'text-white',
            featureTitle: 'text-white'
          }
        }
      }
    },
    accordion: {
      slots: {
        item: 'border-b border-default bg-elevated',
        leadingIcon: 'text-primary'
      }
    },
    pageHero: {
      slots: {
        title: 'text-4xl sm:text-5xl text-pretty tracking-tight font-bold text-highlighted',
        description: 'text-base sm:text-lg text-muted'
      }
    },
    pageSection: {
      slots: {
        headline: 'uppercase tracking-widest text-xs'
      }
    },
    pageCard: {
      slots: {
        root: 'rounded-3xl'
      }
    }
  }
})
