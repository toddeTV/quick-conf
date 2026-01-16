import _customConfig from '~~/content/0.custom-config.json'
import { customConfigSchema } from '~/schemas/customConfigPlain'

const customConfig = customConfigSchema.parse(_customConfig)

// Explicitly type loose properties to prevent TS union inference issues with optional keys (like "icon")
const socials = customConfig.socials as Array<{ name: string, url: string, icon?: string }>
const customFooterColumn = customConfig.customFooterColumn
  ? {
      title: customConfig.customFooterColumn.title,
      links: customConfig.customFooterColumn.links as Array<{ name: string, url: string, icon?: string }>,
    }
  : undefined

/**
 * Application configuration file.
 * Configuration is managed in `content/0.custom-config.json`.
 */
export default defineAppConfig({
  general: customConfig.general,
  socials,
  customFooterColumn,
  ui: {
    ...customConfig.nuxtUI,
    pageHeader: {
      slots: {
        root: 'border-b-0!', // remove bottom border
      },
    },
  },
})
