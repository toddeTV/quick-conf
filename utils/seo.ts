import type { UseSeoMetaInput } from '@unhead/vue'

/**
 * Generates the website title with the conference branding.
 * Defaults to 'Quick Conf' if no title provided or if placeholder '%s' is used.
 *
 * @param title - The page-specific title
 * @returns Formatted title with conference branding
 */
export function getWebsiteTitle(title?: string): string {
  if (!title || title.length === 0 || title === '%s') {
    return 'Quick Conf'
  }
  return `${title} | Quick Conf`
}

/**
 * Creates SEO meta configuration for conference pages.
 * Generates consistent meta tags for title, description, and Open Graph properties.
 *
 * @param title - The page title (will be formatted with conference branding)
 * @param description - The page description for meta tags
 * @returns SEO meta configuration object compatible with useSeoMeta
 */
export function getSeoMetaBase(title?: string, description?: string): UseSeoMetaInput {
  return {
    title: getWebsiteTitle(title),
    ogTitle: getWebsiteTitle(title),

    description,
    ogDescription: description,

    // twitterCard: 'summary_large_image',
    // twitterSite: '@quick_conf',
    // twitterCreator: '@quick_conf',
  }
}
