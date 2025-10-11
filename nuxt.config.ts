// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
  ],

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  devtools: {
    enabled: true,
  },

  ui: { // for `@nuxt/ui`
    fonts: true, // use `@nuxt/fonts`
  },

  image: { // for `@nuxt/image`
  },

  content: { // for `@nuxt/content`
    preview: {
      api: 'https://api.nuxt.studio',
      // Automatically detected, override only if needed:
      // gitInfo: {
      //   name: 'quick-conf',
      //   owner: 'toddeTV',
      //   url: 'https://github.com/toddeTV/quick-conf',
      // },
    },
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
})
