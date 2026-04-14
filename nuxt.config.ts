// https://nuxt.com/docs/api/configuration/nuxt-config

import type { CustomConfig } from './app/schemas/customConfigPlain'
import { customConfigSchema } from './app/schemas/customConfigPlain'
import { getColorModeSetting, resolveColorModePolicy } from './app/utils/color-mode'
import { formatCustomConfigValidationErrors } from './app/utils/custom-config-validation'
import _customConfig from './content/0.custom-config.json'

const parseResult = customConfigSchema.safeParse(_customConfig)
if (!parseResult.success) {
  // We only warn here and do not throw an error to allow the app to start even if the config is invalid.
  // This is intentional to prevent the app from crashing if non-technical users make a mistake in the CMS.
  const details = formatCustomConfigValidationErrors(parseResult.error)
  console.warn(`⚠️ Invalid custom config (content/0.custom-config.json):\n${details}`)
}

const customConfig = (parseResult.success ? parseResult.data : _customConfig) as CustomConfig

const configuredColorMode = customConfig?.general?.colorMode as string | undefined
const resolvedColorModePolicy = resolveColorModePolicy(configuredColorMode)

const selectedColorModeSetting = getColorModeSetting(resolvedColorModePolicy)

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

  colorMode: { // for `@nuxt/color-mode` (included in `@nuxt/ui`)
    preference: selectedColorModeSetting.preference,
    fallback: selectedColorModeSetting.fallback,

    // Keep mode-specific storage keys so old persisted preferences do not override a new forced mode policy.
    storageKey: `quick-conf-color-mode-${resolvedColorModePolicy}`,
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
    collections: [ // Needed for resolving `i-collection-icon` names used across app/content.
      'lucide',
      'mdi',
      'simple-icons',
    ],
    clientBundle: {
      sizeLimitKb: 64,
      icons: [ // Explicitly list icons used by NuxtUI to ensure they are included in the client bundle.
        'lucide:arrow-down',
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:arrow-up',
        'lucide:arrow-up-right',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:chevron-left',
        'lucide:chevron-right',
        'lucide:chevrons-left',
        'lucide:chevrons-right',
        'lucide:chevron-up',
        'lucide:circle-alert',
        'lucide:circle-check',
        'lucide:circle-x',
        'lucide:copy',
        'lucide:copy-check',
        'lucide:ellipsis',
        'lucide:eye',
        'lucide:eye-off',
        'lucide:file',
        'lucide:folder',
        'lucide:folder-open',
        'lucide:grip-vertical',
        'lucide:hash',
        'lucide:info',
        'lucide:lightbulb',
        'lucide:loader-circle',
        'lucide:menu',
        'lucide:minus',
        'lucide:monitor',
        'lucide:moon',
        'lucide:panel-left-close',
        'lucide:panel-left-open',
        'lucide:plus',
        'lucide:rotate-ccw',
        'lucide:search',
        'lucide:square',
        'lucide:sun',
        'lucide:terminal',
        'lucide:triangle-alert',
        'lucide:upload',
        'lucide:x',
      ],
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
    build: {
      markdown: {
        // Syntax highlighting in runtime content pages with Shiki produces large wasm/highlighter chunks in build.
        highlight: customConfig?.nuxtContent?.syntaxHighlighting ? {} : false,
      },
    },
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
