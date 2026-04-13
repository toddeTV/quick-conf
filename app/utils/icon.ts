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
  const fallbackIcon = 'lucide:globe'

  try {
    const { hostname } = new URL(url)
    const normalizedHostname = hostname.replace(/^www\./, '').toLowerCase()

    const domainMap = new Map<string, string>([
      ['github.com', 'simple-icons:github'],
      ['twitter.com', 'simple-icons:x'],
      ['x.com', 'simple-icons:x'],
      ['bsky.app', 'simple-icons:bluesky'],
      ['linkedin.com', 'simple-icons:linkedin'],
      ['youtube.com', 'simple-icons:youtube'],
      ['youtu.be', 'simple-icons:youtube'],
      ['facebook.com', 'simple-icons:facebook'],
      ['instagram.com', 'simple-icons:instagram'],
      ['mastodon.social', 'simple-icons:mastodon'],
      ['medium.com', 'simple-icons:medium'],
      ['dev.to', 'simple-icons:devdotto'],
      ['behance.net', 'simple-icons:behance'],
      ['dribbble.com', 'simple-icons:dribbble'],
      ['codepen.io', 'simple-icons:codepen'],
      ['stackoverflow.com', 'simple-icons:stackoverflow'],
      ['thingiverse.com', 'simple-icons:thingiverse'],
      ['printables.com', 'simple-icons:printables'],
      ['artstation.com', 'simple-icons:artstation'],
      ['tiktok.com', 'simple-icons:tiktok'],
      ['twitch.tv', 'simple-icons:twitch'],
      ['discord.gg', 'simple-icons:discord'],
      ['discord.com', 'simple-icons:discord'],
      ['reddit.com', 'simple-icons:reddit'],
      ['pinterest.com', 'simple-icons:pinterest'],
      ['gitlab.com', 'simple-icons:gitlab'],
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
