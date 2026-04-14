import type { CustomConfig } from './schemas/customConfigPlain'
import _customConfig from '../content/0.custom-config.json'
import { customConfigSchema } from './schemas/customConfigPlain'
import { formatCustomConfigValidationErrors } from './utils/custom-config-validation'

const parseResult = customConfigSchema.safeParse(_customConfig)
if (!parseResult.success) {
  // We only warn here and do not throw an error to allow the app to start even if the config is invalid.
  // This is intentional to prevent the app from crashing if non-technical users make a mistake in the CMS.
  const details = formatCustomConfigValidationErrors(parseResult.error)
  console.warn(`⚠️ Invalid custom config (content/0.custom-config.json):\n${details}`)
}

const customConfig = (parseResult.success ? parseResult.data : _customConfig) as CustomConfig

/**
 * Application configuration file.
 * Configuration is managed in `content/0.custom-config.json`.
 */
export default defineAppConfig({
  general: customConfig.general,
  footer: customConfig.footer,
  studio: customConfig.nuxtStudio,
  ui: {
    ...customConfig.nuxtUI,
    pageHeader: {
      slots: {
        root: 'border-b-0!', // remove bottom border
      },
    },
  },
  ogImage: customConfig.ogImage,
})
