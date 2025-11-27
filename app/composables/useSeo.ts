import type { UseSeoMetaInput } from '@unhead/vue'
import { isNil } from 'lodash-es'

/**
 * A composable for handling SEO metadata extraction, generation, formatting and setting.
 *
 * @returns An object with SEO utility functions.
 */
export function useSeo() {
  const appConfig = useAppConfig()

  /**
   * Extracts SEO metadata from a page/content object with fallback logic.
   * Prioritizes SEO-specific fields over general fields.
   *
   * @param page - The page/content object from Nuxt Content
   * @param page.title - The main content title (required)
   * @param page.description - The main content description (required)
   * @param page.seo - Optional SEO-specific metadata overrides
   * @param page.seo.title - SEO-optimized title override (optional, takes precedence over page.title when present)
   * @param page.seo.description - SEO-optimized description override (optional, takes precedence when present)
   *
   * @returns Object containing the extracted metadata with properties:
   *   - title: The main content title
   *   - description: The main content description
   *   - seo: The computed SEO metadata with fallbacks
   *   - seo.title: Final SEO title (seo.title ?? title)
   *   - seo.description: Final SEO description (seo.description ?? description)
   */
  function extractSeoMetadata(page: {
    title: string
    description: string
    seo?: {
      title?: string
      description?: string
    }
  }): {
    title: string
    description: string
    seo: {
      title: string
      description: string
    }
  } {
    return {
      title: page.title,
      description: page.description,
      seo: {
        title: page.seo?.title ?? page.title,
        description: page.seo?.description ?? page.description,
      },
    }
  }

  /**
   * Generates the website title with the conference branding.
   * Defaults to the conference name if no title provided or if placeholder '%s' is used.
   *
   * @param title - The page-specific title
   * @returns Formatted title with conference branding
   */
  function getWebsiteTitle(title?: string): string {
    if (!title || title.length === 0 || title === '%s') {
      return appConfig.general.conferenceName ?? ''
    }
    if (isNil(appConfig.general.conferenceName)) {
      return title
    }
    return `${title} | ${appConfig.general.conferenceName}`
  }

  /**
   * Creates SEO meta configuration for conference pages.
   * Generates consistent meta tags for title, description, and Open Graph properties.
   *
   * @param page - The page metadata object containing title, description, and SEO data
   * @param page.title - The main page title (will be formatted with conference branding)
   * @param page.description - The main page description for meta tags
   * @param page.seo - The computed SEO metadata with fallbacks
   * @param page.seo.title - The final SEO-optimized title
   * @param page.seo.description - The final SEO-optimized description
   *
   * @returns SEO meta configuration object compatible with useSeoMeta containing:
   *   - title: Main title with conference branding
   *   - ogTitle: Open Graph title with SEO-optimized content
   *   - description: Main page description
   *   - ogDescription: Open Graph description with SEO-optimized content
   */
  function getSeoMetaBase(page: {
    title: string
    description: string
    seo: {
      title: string
      description: string
    }
  }): UseSeoMetaInput {
    return {
      title: getWebsiteTitle(page.title),
      // ogTitle: page.seo.title,
      ogTitle: getWebsiteTitle(page.seo.title),

      description: page.description,
      ogDescription: page.seo.description,

      // twitterCard: 'summary_large_image',
      // twitterSite: '@quick_conf',
      // twitterCreator: '@quick_conf',
    }
  }

  return {
    extractSeoMetadata,
    getWebsiteTitle,
    getSeoMetaBase,
  }
}
