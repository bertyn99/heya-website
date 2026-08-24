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
        root: 'bg-inverted text-dimmed'
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
