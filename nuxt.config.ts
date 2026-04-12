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

  app: {
    head: {
      meta: [
        { name: 'generator', content: 'quick-conf' },
        { name: 'application-name', content: 'quick-conf-template' },

        // Although not a standard OG tag, some tools check for it.
        // Standard OG images are handled by `nuxt-og-image` module.
        // Standard Schema.org logos are handled by `nuxt-schema-org` module.
        { property: 'og:logo', content: customConfig.general.logo.light },
      ],
      htmlAttrs: {
        'data-theme-source': 'quick-conf',
      },
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-studio',
    '@nuxtjs/seo',
    '@nuxt/scripts',
  ],

  runtimeConfig: {
    public: {
      demoMode: false,
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

  fonts: {
    // Keep font resolution local-only to avoid external provider requests.
    provider: 'local',
    providers: {
      google: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      adobe: false,
      googleicons: false,
    },
  },

  icon: {
    // Client-bundle-only icons: scan source and content files at build time,
    // then ship only discovered icons (no server icon bundle, no external API fallback).
    provider: 'none',
    fallbackToApi: false,
    serverBundle: false,
    clientBundle: {
      sizeLimitKb: 64,
      scan: {
        globInclude: [
          'app/**/*.{vue,ts,js,mjs,md,mdc,mdx,yml,yaml,json}',
          'shared/**/*.{ts,js,mjs,md,mdc,mdx,yml,yaml,json}',
          'content/**/*.{md,mdc,mdx,yml,yaml,json}',
        ],
      },
    },
  },

  image: { // for `@nuxt/image`
  },

  content: { // for `@nuxt/content`
    experimental: {
      // Connector selection order in @nuxt/content v3.11.2 (findBestSqliteAdapter):
      // 1) bun runtime -> bun-sqlite
      // 2) sqliteConnector: 'native' + node:sqlite available -> node-sqlite
      // 3) sqliteConnector: 'sqlite3' -> sqlite3
      // 4) sqliteConnector: 'better-sqlite3' -> better-sqlite3
      // 5) webcontainer -> sqlite3
      // 6) fallback -> better-sqlite3
      // -> Native sqlite is available from Node.js >= 22.5.0, so that is what we use now.
      sqliteConnector: 'native',
    },
  },

  studio: { // for `nuxt-studio`
    route: '/_admin', // default: `/_studio`
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

  site: { // for `@nuxtjs/seo`
    url: customConfig.general.siteUrl,
    name: customConfig.general.conferenceName,
  },

  sitemap: {
    zeroRuntime: true,
  },

  robots: { // for `robots` (included in `@nuxtjs/seo`)
    groups: [
      {
        userAgent: [
          'GPTBot',
          'CCBot',
          'Google-Extended',
          'AnthropicAI',
          'Claude-Web',
          'Omgilibot',
          'FacebookBot',
        ],
        disallow: ['/'],
      },
      {
        userAgent: '*',
        allow: '/',
        contentUsage: {
          'bots': 'y',
          'train-ai': 'n',
        },
        contentSignal: {
          'ai-train': 'no',
          'search': 'yes',
        },
      },
    ],
  },

  ogImage: { // for `nuxt-og-image` (included in `@nuxtjs/seo`)
    componentDirs: [
      // 'OgImage',
      'OgImageTemplate',
    ],
  },

  schemaOrg: { // for `nuxt-schema-org` (included in `@nuxtjs/seo`)
    identity: {
      type: 'Organization',
      name: customConfig.general.conferenceName,
      url: customConfig.general.siteUrl,
      logo: customConfig.general.logo.light,
    },
  },
})
