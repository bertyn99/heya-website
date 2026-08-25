// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image'
  ],

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
    '/': { prerender: true },
    '/concept': { prerender: true },
    '/a-propos': { prerender: true },
    '/contact': { prerender: true },
    '/blog': { prerender: true },
    '/mentions-legales': { prerender: true },
    '/politique-de-confidentialite': { prerender: true },
    '/solutions/**': { prerender: true }
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
