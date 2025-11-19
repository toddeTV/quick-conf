import { startsWith } from 'lodash-es'

/**
 * Check if a link is external.
 * @param url The URL to check.
 * @returns True if the URL is external, false otherwise.
 */
export function isExternalLink(url: string) {
  // TODO better check by comparing with current domain
  return (startsWith(url, 'https://') || startsWith(url, 'http://'))
}
