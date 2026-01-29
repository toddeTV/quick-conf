import { z } from 'zod/v4'
import _customConfig from '~~/content/0.custom-config.json'
import pkg from '~~/package.json'
import { customConfigSchema } from '~/schemas/customConfigPlain'

const parseResult = customConfigSchema.safeParse(_customConfig)
if (!parseResult.success) {
  // We only warn here and do not throw an error to allow the app to start even if the config is invalid.
  // This is intentional to prevent the app from crashing if non-technical users make a mistake in the CMS.
  console.warn('⚠️ Invalid custom config:', z.treeifyError(parseResult.error))
}

const customConfig = (parseResult.success ? parseResult.data : _customConfig) as z.infer<typeof customConfigSchema>

export default defineEventHandler((event) => {
  const conferenceName = customConfig?.general?.conferenceName ?? '(unknown)'
  const siteUrl = customConfig?.general?.siteUrl ?? '(unknown)'
  const repoConfig = customConfig?.nuxtStudio?.repository
  const repositoryUrl = repoConfig ? getRepositoryDetails(repoConfig).url : '(unknown)'

  // Clean up URL to ensure no trailing slash for appending paths
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl

  const content = [
    '# humanstxt.org/',
    '',
    '/* ENGINEERING & TEMPLATE */',
    `  Template:`,
    `    Name: ${pkg.name}`,
    `    Version: ${pkg.version}`,
    '    Repository: https://github.com/toddeTV/quick-conf',
    '  Template Author: Thorsten Seyschab',
    '    Website: https://todde.tv/',
    '    EMail: business [at] todde.tv',
    '  Tech Stack: Nuxt 4, Vue 3, Tailwind CSS, Nuxt Content',
    '  Disclaimer: The template author (Thorsten Seyschab) is NOT responsible for the content of this website.',
    '',
    '/* CONTENT & OPERATIONS */',
    `  Conference Name: ${conferenceName}`,
    `  Site URL: ${baseUrl}`,
    `  Repository: ${repositoryUrl}`,
    `  Legal Notice: ${baseUrl}/legal-notice`,
    `  Privacy Policy: ${baseUrl}/privacy-policy`,
    `  Contact: ${baseUrl}/contact`,
    '',
    '/* LEGAL DISCLAIMER */',
    '  The content of this website is managed by the operators listed in the legal notice.',
    '  The template author provides the technical framework but has no control over, and assumes no liability for,',
    '  the content published on this instance.',
  ].join('\n')

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return content
})
