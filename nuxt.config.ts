// https://nuxt.com/docs/api/configuration/nuxt-config

import { z } from 'zod/v4'
import { customConfigSchema } from './app/schemas/customConfigPlain'
import _customConfig from './content/0.custom-config.json'

const parseResult = customConfigSchema.safeParse(_customConfig)
if (!parseResult.success) {
  // We only warn here and do not throw an error to allow the app to start even if the config is invalid.
  // This is intentional to prevent the app from crashing if non-technical users make a mistake in the CMS.
  console.warn('⚠️ Invalid custom config:', z.treeifyError(parseResult.error))
}

const customConfig = (parseResult.success ? parseResult.data : _customConfig) as z.infer<typeof customConfigSchema>

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
      provider: customConfig.nuxtStudio.repository.provider,
      owner: customConfig.nuxtStudio.repository.owner,
      repo: customConfig.nuxtStudio.repository.repo,
      branch: customConfig.nuxtStudio.repository.branch,
      private: customConfig.nuxtStudio.repository.private,
    },
    i18n: {
      defaultLocale: customConfig.nuxtStudio.i18n.defaultLocale,
    },
  },
})
