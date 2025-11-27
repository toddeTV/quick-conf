/**
 * @file Icon related utility functions.
 */

/**
 * Returns a Simple Icons icon name for a given URL.
 *
 * This function checks the hostname of the provided URL and returns a corresponding
 * icon name from the Simple Icons set. If no specific icon is found, it falls back
 * to a generic globe icon.
 *
 * @param url The URL to get the icon for.
 * @returns The name of the icon to use.
 */
export function getIconForUrl(url: string): string {
  try {
    const { hostname } = new URL(url)
    const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase()

    // Social & Professional Networks
    if (normalizedHostname === 'github.com')
      return 'i-simple-icons-github'
    if (normalizedHostname === 'twitter.com' || normalizedHostname === 'x.com')
      return 'i-simple-icons-x'
    if (normalizedHostname === 'bsky.app')
      return 'i-simple-icons-bluesky'
    if (normalizedHostname === 'linkedin.com')
      return 'i-simple-icons-linkedin'
    if (normalizedHostname === 'youtube.com')
      return 'i-simple-icons-youtube'
    if (normalizedHostname === 'facebook.com')
      return 'i-simple-icons-facebook'
    if (normalizedHostname === 'instagram.com')
      return 'i-simple-icons-instagram'
    if (normalizedHostname === 'mastodon.social')
      return 'i-simple-icons-mastodon'
    if (normalizedHostname === 'medium.com')
      return 'i-simple-icons-medium'
    if (normalizedHostname === 'dev.to')
      return 'i-simple-icons-devdotto'
    if (normalizedHostname === 'behance.net')
      return 'i-simple-icons-behance'
    if (normalizedHostname === 'dribbble.com')
      return 'i-simple-icons-dribbble'
    if (normalizedHostname === 'codepen.io')
      return 'i-simple-icons-codepen'
    if (normalizedHostname === 'stackoverflow.com')
      return 'i-simple-icons-stackoverflow'
    if (normalizedHostname === 'thingiverse.com')
      return 'i-simple-icons-thingiverse'
    if (normalizedHostname === 'printables.com')
      return 'i-simple-icons-printables'
    if (normalizedHostname === 'artstation.com')
      return 'i-simple-icons-artstation'
    if (normalizedHostname === 'tiktok.com')
      return 'i-simple-icons-tiktok'
    if (normalizedHostname === 'twitch.tv')
      return 'i-simple-icons-twitch'
    if (normalizedHostname === 'discord.gg' || normalizedHostname === 'discord.com')
      return 'i-simple-icons-discord'
    if (normalizedHostname === 'reddit.com')
      return 'i-simple-icons-reddit'
    if (normalizedHostname === 'pinterest.com')
      return 'i-simple-icons-pinterest'
    if (normalizedHostname === 'gitlab.com')
      return 'i-simple-icons-gitlab'
  }
  catch {
    // Invalid URL, fall back to the default icon
    return 'i-lucide-globe'
  }

  // Fallback for any other URL
  return 'i-lucide-globe'
}
