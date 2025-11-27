/**
 * @file Icon related utility functions.
 */

import { endsWith } from 'lodash-es'

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
    const normalizedHostname = hostname.replace(/^www\./, '')

    // Social & Professional Networks
    if (endsWith(normalizedHostname, 'github.com'))
      return 'i-simple-icons-github'
    if (endsWith(normalizedHostname, 'twitter.com') || endsWith(normalizedHostname, 'x.com'))
      return 'i-simple-icons-x'
    if (endsWith(normalizedHostname, 'bsky.app'))
      return 'i-simple-icons-bluesky'
    if (endsWith(normalizedHostname, 'linkedin.com'))
      return 'i-simple-icons-linkedin'
    if (endsWith(normalizedHostname, 'youtube.com'))
      return 'i-simple-icons-youtube'
    if (endsWith(normalizedHostname, 'facebook.com'))
      return 'i-simple-icons-facebook'
    if (endsWith(normalizedHostname, 'instagram.com'))
      return 'i-simple-icons-instagram'
    if (endsWith(normalizedHostname, 'mastodon.social'))
      return 'i-simple-icons-mastodon'
    if (endsWith(normalizedHostname, 'medium.com'))
      return 'i-simple-icons-medium'
    if (endsWith(normalizedHostname, 'dev.to'))
      return 'i-simple-icons-devdotto'
    if (endsWith(normalizedHostname, 'behance.net'))
      return 'i-simple-icons-behance'
    if (endsWith(normalizedHostname, 'dribbble.com'))
      return 'i-simple-icons-dribbble'
    if (endsWith(normalizedHostname, 'codepen.io'))
      return 'i-simple-icons-codepen'
    if (endsWith(normalizedHostname, 'stackoverflow.com'))
      return 'i-simple-icons-stackoverflow'
    if (endsWith(normalizedHostname, 'thingiverse.com'))
      return 'i-simple-icons-thingiverse'
    if (endsWith(normalizedHostname, 'printables.com'))
      return 'i-simple-icons-printables'
    if (endsWith(normalizedHostname, 'artstation.com'))
      return 'i-simple-icons-artstation'
    if (endsWith(normalizedHostname, 'tiktok.com'))
      return 'i-simple-icons-tiktok'
    if (endsWith(normalizedHostname, 'twitch.tv'))
      return 'i-simple-icons-twitch'
    if (endsWith(normalizedHostname, 'discord.gg') || endsWith(normalizedHostname, 'discord.com'))
      return 'i-simple-icons-discord'
    if (endsWith(normalizedHostname, 'reddit.com'))
      return 'i-simple-icons-reddit'
    if (endsWith(normalizedHostname, 'pinterest.com'))
      return 'i-simple-icons-pinterest'
    if (endsWith(normalizedHostname, 'gitlab.com'))
      return 'i-simple-icons-gitlab'
  }
  catch {
    // Invalid URL, fall back to the default icon
    return 'i-lucide-globe'
  }

  // Fallback for any other URL
  return 'i-lucide-globe'
}
