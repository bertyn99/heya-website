// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxtjs/better-auth',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@comark/nuxt',
    'evlog/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://heyaconvivialite.fr',
    name: 'Heya',
    description: 'Heya connecte les résidents en habitat partagé : totem convivial, lampes relay, dashboard pour les équipes.',
    defaultLocale: 'fr',
    indexable: true
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    storage: null
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  routeRules: {
    '/admin/**': {
      auth: { only: 'user', redirectTo: '/admin/login' },
      ssr: true,
      robots: 'noindex, nofollow',
      sitemap: false
    },
    '/admin/login': { auth: { only: 'guest', redirectTo: '/admin' }, ssr: true }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_module',
    experimental: {
      tasks: true,
      wasm: true
    },
    wasm: {
      esmImport: true
    },
    externals: {
      inline: ['@jsquash/jpeg', '@jsquash/png', '@jsquash/webp', '@jsquash/resize']
    },
    scheduledTasks: {
      '*/5 * * * *': ['publish-scheduled']
    },
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: false
    }
  },

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true,
    dir: '.data',
    remote: false
  },

  vite: {
    optimizeDeps: {
      exclude: [
        '@jsquash/jpeg',
        '@jsquash/png',
        '@jsquash/resize',
        '@jsquash/webp'
      ]
    }
  },

  auth: {
    redirects: {
      login: '/admin/login',
      guest: '/admin'
    },
    preserveRedirect: true
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  evlog: {
    env: { service: 'heya-cms' },
    include: ['/api/**'],
    routes: {
      '/api/admin/**': { service: 'heya-cms-admin' }
    },
    redact: true
  },

  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] }
    ],
    defaults: {
      weights: [400, 500, 600, 700]
    }
  },

  robots: {
    groups: [
      { userAgent: '*', disallow: ['/admin'] }
    ]
  },

  sitemap: {
    exclude: ['/admin/**', '/accueil'],
    sources: ['/api/__sitemap__/urls']
  }
})
