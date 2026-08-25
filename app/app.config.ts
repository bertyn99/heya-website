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
      slots: {
        base: 'rounded-lg font-semibold transition-transform duration-200 active:scale-[0.98]'
      },
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
    navigationMenu: {
      slots: {
        link: 'transition-colors duration-200',
        childLink: 'transition-colors duration-200'
      }
    },
    footer: {
      slots: {
        root: 'bg-heya-dark-footer text-[#aaa293]'
      }
    },
    pageSection: {
      slots: {
        headline: 'text-[11px] font-semibold uppercase tracking-widest text-primary'
      }
    },
    pageCard: {
      slots: {
        root: 'rounded-[1.25rem] transition-transform duration-200'
      }
    },
    pricingPlan: {
      slots: {
        root: 'rounded-[1.25rem] border border-default bg-elevated p-8',
        title: 'text-2xl font-semibold text-highlighted',
        description: 'text-base text-muted',
        price: 'text-3xl font-semibold text-highlighted tabular',
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
        title: 'text-4xl sm:text-5xl text-pretty tracking-tight font-bold text-highlighted leading-[1.1]',
        description: 'text-base sm:text-lg text-muted leading-relaxed max-w-[40rem]'
      }
    }
  }
})
