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
  const fallbackIcon = 'i-lucide-globe'

  try {
    const { hostname } = new URL(url)
    const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase()

    const domainMap = new Map<string, string>([
      ['github.com', 'i-simple-icons-github'],
      ['twitter.com', 'i-simple-icons-x'],
      ['x.com', 'i-simple-icons-x'],
      ['bsky.app', 'i-simple-icons-bluesky'],
      ['linkedin.com', 'i-simple-icons-linkedin'],
      ['youtube.com', 'i-simple-icons-youtube'],
      ['facebook.com', 'i-simple-icons-facebook'],
      ['instagram.com', 'i-simple-icons-instagram'],
      ['mastodon.social', 'i-simple-icons-mastodon'],
      ['medium.com', 'i-simple-icons-medium'],
      ['dev.to', 'i-simple-icons-devdotto'],
      ['behance.net', 'i-simple-icons-behance'],
      ['dribbble.com', 'i-simple-icons-dribbble'],
      ['codepen.io', 'i-simple-icons-codepen'],
      ['stackoverflow.com', 'i-simple-icons-stackoverflow'],
      ['thingiverse.com', 'i-simple-icons-thingiverse'],
      ['printables.com', 'i-simple-icons-printables'],
      ['artstation.com', 'i-simple-icons-artstation'],
      ['tiktok.com', 'i-simple-icons-tiktok'],
      ['twitch.tv', 'i-simple-icons-twitch'],
      ['discord.gg', 'i-simple-icons-discord'],
      ['discord.com', 'i-simple-icons-discord'],
      ['reddit.com', 'i-simple-icons-reddit'],
      ['pinterest.com', 'i-simple-icons-pinterest'],
      ['gitlab.com', 'i-simple-icons-gitlab'],
    ])

    if (domainMap.has(normalizedHostname)) {
      return domainMap.get(normalizedHostname)!
    }
  }
  catch {
    // Invalid URL, fall back to the default icon
    return fallbackIcon
  }

  // Fallback for any other URL
  return fallbackIcon
}
