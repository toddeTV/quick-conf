import { z } from 'zod/v4'
import _customConfig from '../content/0.custom-config.json'
import { customConfigSchema } from './schemas/customConfigPlain'

const parseResult = customConfigSchema.safeParse(_customConfig)
if (!parseResult.success) {
  // We only warn here and do not throw an error to allow the app to start even if the config is invalid.
  // This is intentional to prevent the app from crashing if non-technical users make a mistake in the CMS.
  console.warn('⚠️ Invalid custom config:', z.treeifyError(parseResult.error))
}

const customConfig = (parseResult.success ? parseResult.data : _customConfig) as z.infer<typeof customConfigSchema>

/**
 * Application configuration file.
 * Configuration is managed in `content/0.custom-config.json`.
 */
export default defineAppConfig({
  general: customConfig.general,
  socials: customConfig.socials,
  customFooterColumn: customConfig.customFooterColumn,
  ui: {
    ...customConfig.nuxtUI,
    pageHeader: {
      slots: {
        root: 'border-b-0!', // remove bottom border
      },
    },
  },
  studio: customConfig.nuxtStudio,
})
