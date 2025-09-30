import { z } from '@nuxt/content'

/**
 * Zod schema for validating route slugs.
 * Accepts either:
 * - A non-empty string
 * - An array with exactly one non-empty string element
 */
const slugSchema = z.union([
  z.string().min(1, 'Slug cannot be empty'),
  z.array(z.string().min(1)).length(1, 'Slug array must contain exactly one element'),
])

/**
 * Validates and normalizes a slug parameter from route params.
 *
 * @param slug - The slug parameter from route.params (can be string, string[], or undefined)
 * @returns A normalized non-empty string slug
 * @throws {Error} If the slug is invalid (empty, undefined, or array with wrong length)
 *
 * @example
 * // With a string slug
 * const slug = normalizeSlug('my-talk') // Returns: 'my-talk'
 *
 * @example
 * // With an array containing one element
 * const slug = normalizeSlug(['my-talk']) // Returns: 'my-talk'
 *
 * @example
 * // Invalid cases that throw errors
 * normalizeSlug('') // Throws: Slug cannot be empty
 * normalizeSlug([]) // Throws: Slug array must contain exactly one element
 * normalizeSlug(['a', 'b']) // Throws: Slug array must contain exactly one element
 */
export function normalizeSlug(slug: string | string[] | undefined): string {
  // Parse and validate the slug
  const result = slugSchema.safeParse(slug)

  if (!result.success) {
    // Extract the most relevant error message
    const errorMessage = result.error.errors[0]?.message || 'Invalid slug format'
    throw new Error(errorMessage)
  }

  // Normalize: convert array to string if needed
  const normalizedSlug = Array.isArray(result.data)
    ? result.data[0]
    : result.data

  return normalizedSlug
}

/**
 * Type guard to check if a slug is valid according to our schema.
 * Useful for conditional rendering or early returns.
 *
 * @param slug - The slug to validate
 * @returns true if the slug is valid, false otherwise
 */
export function isValidSlug(slug: unknown): slug is string | [string] {
  return slugSchema.safeParse(slug).success
}

/**
 * Export the schema itself for cases where direct validation is needed
 */
export { slugSchema }
