import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
export const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
export const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
export const orientationEnum = z.enum(['vertical', 'horizontal'])
export const targetEnum = z.enum(['_self', '_blank', '_parent', '_top'])

export function createBaseSchema() {
  return z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    headline: z.string().optional(),
  })
}

export function createBaseWithSeoSchema() {
  return createBaseSchema().extend({
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      // image: property(z.string().optional()).editor({ input: 'media' }),
    }).optional(),
  })
}

export function createFeatureItemSchema() {
  return createBaseSchema().extend({
    icon: property(z.string().min(1)).editor({ input: 'icon' }),
  })
}

export function createLinkSchema() {
  return z.object({
    label: z.string().min(1),
    to: z.string().min(1),
    icon: property(z.string().optional()).editor({ input: 'icon' }),
    size: sizeEnum.optional(),
    trailing: z.boolean().optional(),
    target: targetEnum.optional(),
    color: colorEnum.optional(),
    variant: variantEnum.optional(),
  })
}

export function createImageSchema() {
  return z.object({
    src: property(z.string().min(1)).editor({ input: 'media' }),
    alt: z.string().optional(),
    loading: z.enum(['lazy', 'eager']).optional(),
    srcset: z.string().optional(),
  })
}

export function createLandingBlockBaseSchema() {
  return z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    headline: z.string().optional(),
    class: z.string().optional().describe('Tailwind classes for custom styling (e.g. "md:-mt-20").'),
  })
}

export function createSimpleLinkSchema() {
  return z.object({
    name: z.string().optional().describe('Name or label for this link.'),
    // we use `string()` and not `url()` as internal links like e.g. `/something` are also valid
    url: z.string().min(1).describe('Destination URL for this link (internal paths like `/something` are valid).'),
    icon: property(z.string().optional())
      .editor({ input: 'icon' })
      .describe('Optionally override the icon. By default it is detected automatically. '
        + 'Try sticking to `Simple Icons` for consistency.'),
  })
}
