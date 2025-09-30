// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
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

  ui: { // for `@nuxt/ui` & `@nuxt/ui-pro`
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
})
