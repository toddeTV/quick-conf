// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-studio',
  ],

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  // ssr: false,
  // nitro: {
  //   // Needed for Nuxt Studio in SSR=false mode
  //   prerender: {
  //     routes: ['/'], // Pre-render the homepage
  //     crawlLinks: true, // Then crawl all the links on the page
  //   },
  // },

  css: [
    '~/assets/css/main.css',
  ],

  devtools: {
    enabled: true,
  },

  typescript: { // for TypeScript, see https://nuxt.com/docs/guide/concepts/typescript
    // Customize app/server TypeScript config
    tsConfig: {
      compilerOptions: {
        strict: true,
      },
    },

    // Customize build-time TypeScript config
    nodeTsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
  },

  ui: { // for `@nuxt/ui`
    fonts: true, // use `@nuxt/fonts`
  },

  image: { // for `@nuxt/image`
  },

  content: { // for `@nuxt/content`
  },

  studio: {
    repository: {
      provider: (process.env.NUXT_STUDIO_PROVIDER ?? 'github') as 'github' | 'gitlab',
      owner: process.env.NUXT_STUDIO_OWNER ?? '',
      repo: process.env.NUXT_STUDIO_REPO ?? '',
      branch: process.env.NUXT_STUDIO_BRANCH ?? 'main',
      private: process.env.NUXT_STUDIO_PRIVATE === 'true',
    },
    i18n: {
      defaultLocale: process.env.NUXT_STUDIO_LOCALE ?? 'en',
    },
  },
})
