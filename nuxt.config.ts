// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxtjs/better-auth',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@comark/nuxt',
    '@nuxt/image',
    'evlog/nuxt'
  ],

  evlog: {
    env: { service: 'heya-cms' },
    include: ['/api/**'],
    routes: {
      '/api/admin/**': { service: 'heya-cms-admin' }
    },
    redact: true
  },

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true,
    dir: '.data',
    remote: false
  },

  auth: {
    redirects: {
      login: '/admin/login',
      guest: '/admin'
    },
    preserveRedirect: true
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  site: {
    url: 'https://heyaconvivialite.fr',
    name: 'Heya',
    description: 'Heya connecte les résidents en habitat partagé : totem convivial, lampes relay, dashboard pour les équipes.',
    defaultLocale: 'fr',
    indexable: true
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    storage: null
  },

  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] }
    ],
    defaults: {
      weights: [400, 500, 600, 700]
    }
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    }
  },

  routeRules: {
    '/admin/**': { auth: { only: 'user', redirectTo: '/admin/login' }, ssr: true },
    '/admin/login': { auth: { only: 'guest', redirectTo: '/admin' }, ssr: true },
    '/': { prerender: true },
    '/concept': { prerender: true },
    '/a-propos': { prerender: true },
    '/contact': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/mentions-legales': { prerender: true },
    '/politique-de-confidentialite': { prerender: true },
    '/solutions/**': { prerender: true }
  },

  image: {
    provider: 'jsquash',
    quality: 80,
    format: ['webp'],
    providers: {
      jsquash: {
        provider: '~/providers/jsquash',
        options: {
          baseURL: '/api/media/'
        }
      }
    }
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

  nitro: {
    preset: 'cloudflare_pages',
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
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
