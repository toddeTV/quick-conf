/**
 * @file Defines the `@nuxt/content` configuration for the application.
 * Contains mainly the schema for content in the `/content/` folder.
 */

import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])

function createBaseSchema() {
  return z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      // image: z.string().optional().editor({ input: 'media' }),
    }).optional(),
  })
}

function createFeatureItemSchema() {
  return createBaseSchema().extend({
    icon: z.string().nonempty().editor({ input: 'icon' }),
  })
}

function createLinkSchema() {
  return z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    icon: z.string().optional().editor({ input: 'icon' }),
    size: sizeEnum.optional(),
    trailing: z.boolean().optional(),
    target: z.string().optional(),
    color: colorEnum.optional(),
    variant: variantEnum.optional(),
  })
}

function createImageSchema() {
  return z.object({
    src: z.string().nonempty().editor({ input: 'media' }),
    alt: z.string().optional(),
    loading: z.enum(['lazy', 'eager']).optional(),
    srcset: z.string().optional(),
  })
}

export default defineContentConfig({
  collections: {
    // -------- static pages

    index: defineCollection({
      type: 'page',
      source: '0.index.yml',
      schema: createBaseSchema().extend({
        hero: z.object(({
          links: z.array(createLinkSchema()),
        })),
        sections: z.array(
          createBaseSchema().extend({
            headline: z.string().optional(),
            orientation: orientationEnum.optional(),
            reverse: z.boolean().optional(),
            features: z.array(createFeatureItemSchema()),
            image: createImageSchema(),
          }),
        ).optional(),
        features: createBaseSchema().extend({
          headline: z.string().optional(),
          items: z.array(createFeatureItemSchema()),
        }).optional(),
        testimonials: createBaseSchema().extend({
          headline: z.string().optional(),
          items: z.array(
            z.object({
              quote: z.string().nonempty(),
              user: z.object({
                name: z.string().nonempty(),
                description: z.string().nonempty(),
                to: z.string().nonempty(),
                target: z.string().nonempty(),
                avatar: createImageSchema(),
              }),
            }),
          ),
        }).optional(),
        sponsors: createBaseSchema().extend({
          headline: z.string().optional(),
        }).optional(),
        cta: createBaseSchema().extend({
          links: z.array(createLinkSchema()),
        }).optional(),
      }),
    }),

    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: createBaseSchema(),
    }),

    // -------- standalone data

    sponsors: defineCollection({
      type: 'data',
      source: 'sponsors/**/*.yml',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the sponsor. This is used to identify and '
          + 'link the sponsor to other collections. Never change this!'),
        image: z.string().editor({ input: 'media' }).describe('The image of the speaker.'),
        url: z.string().url().optional().describe('The URL of the sponsors webpage.'),
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
        name: z.string().describe('The name of the speaker.'),
        description: z.string().describe('A short description of the speaker - one line, best only a few words!'),
        // this is the body of the markdown file itself:
        // biography: z.string().describe('A biography of the speaker. This is shown on the speaker page.'),
        image: z.string().editor({ input: 'media' }).describe('The image of the speaker.'),
        company: z.string().optional().describe('The name of the company the speaker works for.'),
        socialMedia: z.array(z.object({
          url: z.string().url().describe('Put in the full URL to the account/channel/etc.'),
          description: z.string().optional().describe('An optional description for the link.'),
          icon: z.string().optional().editor({ input: 'icon' }).describe('Optionally override the icon. '
            + 'Per default it is detected automatically. Please only use `Simple Icons`'),
        })).default([]),
      }),
    }),

    talks: defineCollection({
      type: 'page',
      source: 'talks/**/*.md',
      schema: z.object({
        slug: z.string().describe('The UNIQUE slug of the talk. This is used to identify and '
          + 'link the stage to other collections. Never change this!'),
        type: z.enum(['talk', 'panel', 'workshop']).describe('The type of the talk.'),
        title: z.string().describe('The title of the talk.'),
        // abstract: z.string().describe('The abstract of the talk.'), // this is the body of the markdown file itself
        speakers: z.array(z.string()).default([]).describe('An array of speaker slugs.'),
        dateTime: z.date().describe('The date and time of the talk when it takes place.'),
        stage: z.string().describe('The slug of the stage where the talk takes place.'),
        resources: z.array(z.object({
          url: z.string().url().describe('Put in the full URL to the resource.'),
          description: z.string().optional().describe('An optional description for the link.'),
          icon: z.string().optional().editor({ input: 'icon' }).describe('Optionally override the icon. '
            + 'Per default it is detected automatically. Please only use `Simple Icons`',
          ),
        })).default([]),
      }),
    }),
  },
})
