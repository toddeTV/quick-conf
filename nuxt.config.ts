// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  css: [
    '~/assets/css/main.css',
  ],

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
  ],

  ui: { // for `@nuxt/ui` & `@nuxt/ui-pro`
    fonts: true, // use `@nuxt/fonts`
  },

  image: { // for `@nuxt/image`
  },

  content: { // for `@nuxt/content`
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'quick-conf',
        owner: 'toddeTV',
        url: 'https://github.com/toddeTV/quick-conf',
      },
    },
  },
})
