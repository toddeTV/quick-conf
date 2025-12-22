/**
 * @file Defines the `@nuxt/content` configuration for the application.
 * Contains mainly the schema for content in the `/content/` folder.
 */

import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import { z } from 'zod/v4'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])
const targetEnum = z.enum(['_self', '_blank', '_parent', '_top'])

function createBaseSchema() {
  return z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    headline: z.string().optional(),
  })
}

function createBaseWithSeoSchema() {
  return createBaseSchema().extend({
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      // image: property(z.string().optional()).editor({ input: 'media' }),
    }).optional(),
  })
}

function createFeatureItemSchema() {
  return createBaseSchema().extend({
    icon: property(z.string().min(1)).editor({ input: 'icon' }),
  })
}

function createLinkSchema() {
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

function createImageSchema() {
  return z.object({
    src: property(z.string().min(1)).editor({ input: 'media' }),
    alt: z.string().optional(),
    loading: z.enum(['lazy', 'eager']).optional(),
    srcset: z.string().optional(),
  })
}

function createLandingBlockBaseSchema() {
  return z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    headline: z.string().optional(),
    class: z.string().optional().describe('Tailwind classes for custom styling (e.g. "md:-mt-20").'),
  })
}

export default defineContentConfig({
  collections: {
    // -------- static pages

    // Home/Landing page
    index: defineCollection({
      type: 'page',
      source: '0.index.yml',
      schema: createBaseWithSeoSchema().extend({
        blocks: z.array(
          z.discriminatedUnion('component', [
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingHero'),
              links: z.array(createLinkSchema()).optional(),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingSection'),
              orientation: orientationEnum.optional(),
              reverse: z.boolean().optional(),
              features: z.array(createFeatureItemSchema()).optional(),
              image: createImageSchema().optional(),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingFeatures'),
              items: z.array(createFeatureItemSchema()).default([]),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingSpeakers'),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingTestimonials'),
              items: z.array(
                z.object({
                  quote: z.string().min(1),
                  user: z.object({
                    name: z.string().min(1),
                    description: z.string().min(1),
                    to: z.string().min(1),
                    target: targetEnum.optional(),
                    avatar: createImageSchema(),
                  }),
                }),
              ).default([]),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingSponsors'),
              showViewAll: z.boolean().default(false).describe(
                'Show a "View all Sponsors" button. Links to the sponsors FAQ page, which must be created manually.',
              ),
              viewAllLink: z.string().min(1).default('/faq/sponsors').describe(
                'The link for the "View all Sponsors" button.',
              ),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingCta'),
              links: z.array(createLinkSchema()).optional(),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingHeroMedia'),
              links: z.array(createLinkSchema()).optional(),
              image: createImageSchema().optional(),
              video: z.object({
                src: property(z.string().min(1)).editor({ input: 'media' }),
                poster: property(z.string().optional()).editor({ input: 'media' }),
              }).optional(),
              overlayOpacity: z.number().min(0).max(1).default(0.5)
                .describe('The opacity of the black overlay on top of the media (0-1).'),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingHeroCountdown'),
              links: z.array(createLinkSchema()).optional(),
              targetDate: z.string().datetime(),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingMetaInfo'),
              items: z.array(z.object({
                icon: property(z.string().min(1)).editor({ input: 'icon' }),
                text: z.string().min(1),
                label: z.string().optional(),
              })),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingMarquee'),
              images: z.array(createImageSchema()),
              direction: z.enum(['left', 'right']).default('left'),
              speed: z.number().default(20),
              gap: z.number().default(0),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingGallery'),
              images: z.array(createImageSchema()),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingFaqPreview'),
              items: z.array(z.object({
                label: z.string().min(1),
                content: z.string().min(1),
              })),
              link: createLinkSchema().optional(),
            }),
            createLandingBlockBaseSchema().extend({
              component: z.literal('AppLandingSeparator'),
              label: z.string().optional(),
              icon: property(z.string().optional()).editor({ input: 'icon' }),
              avatar: createImageSchema().optional(),
            }),
          ]),
        ),
      }),
    }),

    // FAQ collection for frequently asked questions
    faq: defineCollection({
      type: 'page',
      source: 'faq/**/*.md',
      schema: createBaseWithSeoSchema().extend({
        order: z.number().default(999),
      }),
    }),

    // generic pages, e.g. Contact, Privacy Policy, Legal Notice, etc.
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: createBaseWithSeoSchema(),
    }),

    // -------- standalone data

    sponsors: defineCollection({
      type: 'data',
      source: 'sponsors/**/*.yml',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the sponsor. This is used to identify and '
          + 'link the sponsor to other collections. Never change this!'),
        image: property(z.string().min(1)).editor({ input: 'media' }).describe('The image of the sponsor.'),
        url: z.string().url().optional().describe('The URL of the sponsors webpage.'),
      }),
    }),

    tickets: defineCollection({
      type: 'data',
      source: 'tickets/**/*.yml',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the ticket. This is used to identify and '
          + 'link the ticket to other collections. Never change this!'),
        title: z.string().describe('The title of the ticket.'),
        description: z.string().describe('The description of the ticket.'),
        price: z.string().describe('The price of the ticket. Can be a string like `free` or a number with currency.'),
        discount: z.string().optional().describe('An optional discount price to show a striked-through price.'),
        features: z.array(z.string()).describe('A list of features for the ticket.'),
        scale: z.boolean().optional().describe('Whether the ticket should be scaled up to attract more attention.'),
        button: z.object({
          label: z.string().describe('The label of the button.'),
          to: z.string().url().describe('The URL to link to.'),
          target: targetEnum.default('_blank').describe('The target of the link.'),
        }),
      }),
    }),

    // -------- linked data

    stages: defineCollection({
      type: 'data',
      source: 'stages/**/*.yml',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the stage. This is used to identify and '
          + 'link the stage to other collections. Never change this!'),
        name: z.string().describe('The name of the stage.'),
        place: z.string().optional()
          .describe('An optional string indicating the location (building/room/address/etc.).'),
      }),
    }),

    speakers: defineCollection({
      type: 'page',
      source: 'speakers/**/*.md',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the speaker. This is used to identify and link '
          + 'the speaker to other collections. Use `firstname-lastname` as convention. Never change this!'),
        featured: z.boolean().default(false).describe('Whether the speaker is featured on the main page.'),
        name: z.string().describe('The name of the speaker.'),
        description: z.string().describe('A short description of the speaker - one line, best only a few words!'),
        // this is the body of the markdown file itself:
        // biography: z.string().describe('A biography of the speaker. This is shown on the speaker page.'),
        // TODO or call it `avatar` instead of `image`?
        image: property(z.string().min(1)).editor({ input: 'media' }).describe('The image of the speaker.'),
        company: z.string().optional().describe('The name of the company the speaker works for.'),
        socialMedia: z.array(z.object({
          url: z.string().url().describe('Put in the full URL to the account/channel/etc.'),
          description: z.string().optional().describe('An optional description for the link.'),
          icon: property(z.string().optional()).editor({ input: 'icon' }).describe('Optionally override the icon. '
            + 'By default it is detected automatically. Try sticking to `Simple Icons` for consistency.'),
        })).default([]),
      }),
    }),

    talks: defineCollection({
      type: 'page',
      source: 'talks/**/*.md',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the talk. This is used to identify and '
          + 'link the stage to other collections. Never change this!'),
        type: z.enum(['talk', 'lightning-talk', 'panel', 'keynote', 'workshop']).describe('The type of the talk.'),
        title: z.string().describe('The title of the talk.'),
        // abstract: z.string().describe('The abstract of the talk.'), // this is the body of the markdown file itself
        speakers: z.array(z.string()).default([]).describe('An array of speaker slugs.'),
        dateTime: z.date().describe('The date and time of the talk when it takes place.'),
        stage: z.string().describe('The slug of the stage where the talk takes place.'),
        resources: z.array(z.object({
          url: z.string().url().describe('Put in the full URL to the resource.'),
          description: z.string().optional().describe('An optional description for the link.'),
          icon: property(z.string().optional()).editor({ input: 'icon' }).describe('Optionally override the icon. '
            + 'By default it is detected automatically. Try sticking to `Simple Icons` for consistency.',
          ),
        })).default([]),
      }),
    }),
  },
})
