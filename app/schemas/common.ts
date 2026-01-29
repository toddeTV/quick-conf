import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
export const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
export const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
export const orientationEnum = z.enum(['vertical', 'horizontal'])
export const targetEnum = z.enum(['_self', '_blank', '_parent', '_top'])

export function createBaseSchema() {
  return z.object({
    title: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The title.',
    }),
    description: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The description.',
    }),
    headline: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'An optional small headline above the title.',
    }),
  })
}

export function createBaseWithSeoSchema() {
  return createBaseSchema().extend({
    seo: property(z.object({
      title: property(z.string().optional()).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Override the default title.',
      }),
      description: property(z.string().optional()).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Override the default description.',
      }),
      // image: property(z.string().optional()).editor({ input: 'media' }),
    }).optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'SEO settings for this page. If empty, the default values are used.',
    }),
  })
}

export function createFeatureItemSchema() {
  return createBaseSchema().extend({
    icon: property(z.string().min(1)).editor({
      input: 'icon',
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The icon of the feature.',
    }),
  })
}

export function createLinkSchema() {
  return z.object({
    label: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The label of the link.',
    }),
    to: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The URL to link to. Start with `https://` for external links. For internal links, start with '
        + '`/` and do not paste the domain of your website in it.',
    }),
    icon: property(z.string().optional()).editor({
      input: 'icon',
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'An optional icon for the link. If no icon is set, the website will autodetect and select one '
        + 'depending on the destination.',
    }),
    size: sizeEnum.optional(),
    trailing: z.boolean().optional(),
    target: targetEnum.optional(),
    color: colorEnum.optional(),
    variant: variantEnum.optional(),
  })
}

export function createImageSchema() {
  return z.object({
    src: property(z.string().min(1)).editor({
      input: 'media',
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The source of the image.',
    }),
    alt: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Alternative text for accessibility. Set this for screen readers.',
    }),
    loading: property(z.enum(['lazy', 'eager']).optional().default('lazy')).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Image loading strategy. "lazy" loads the image when it enters the viewport (default), "eager" '
        + 'loads it immediately (useful for above-the-fold images).',
    }),
    sizes: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Image sizes for responsive serving (e.g., "100vw sm:50vw md:400px").',
    }),
  })
}

export function createLandingBlockBaseSchema() {
  return z.object({
    title: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The title of the block.',
    }),
    description: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The description of the block.',
    }),
    headline: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'An optional small headline above the title.',
    }),
    class: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Tailwind classes for custom styling (e.g. "md:-mt-20").',
    }),
  })
}

export function createSimpleLinkSchema() {
  return z.object({
    name: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Name or label for this link.',
    }),
    // we use `string()` and not `url()` as internal links like e.g. `/something` are also valid
    url: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Destination URL for this link (internal paths like `/something` are valid).',
    }),
    icon: property(z.string().optional())
      .editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Optionally override the icon. By default it is detected automatically. '
          + 'Try sticking to `Simple Icons` for consistency.',
      }),
  })
}

export function createFooterColumnSchema() {
  return z.object({
    // TODO would be better `.min(1)` instead of `.optional()`, but NuxtStudio does not delete it in the UI
    title: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The title of the column.',
    }),
    // TODO would be better `.nonempty()` instead of `.default([])`, but NuxtStudio does not delete it in the UI
    links: property(z.array(createSimpleLinkSchema()).default([])).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The links to show in the column.',
    }),
  }).optional()
}
