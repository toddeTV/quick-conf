import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import {
  createBaseWithSeoSchema,
  createFeatureItemSchema,
  createImageSchema,
  createLandingBlockBaseSchema,
  createLinkSchema,
  orientationEnum,
  targetEnum,
} from './common'

export const landingSchema = createBaseWithSeoSchema().extend({
  blocks: property(z.array(
    z.discriminatedUnion('component', [

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingCta'),
        links: z.array(createLinkSchema()).optional(),
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
        component: z.literal('AppLandingFeatures'),
        items: z.array(createFeatureItemSchema()).default([]),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingGallery'),
        images: z.array(createImageSchema()),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingHero'),
        links: z.array(createLinkSchema()).optional(),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingHeroSplit'),
        links: z.array(createLinkSchema()).optional(),
        image: createImageSchema().optional(),
        videoUrl: property(z.string().optional()).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'The YouTube Video URL. If provided, it overrides the image.',
        }),
        features: z.array(z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          icon: z.string().optional(),
        })).optional().default([]),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingHeroCountdown'),
        links: z.array(createLinkSchema()).optional(),
        targetDate: property(z.string().datetime()).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'The target date for the countdown (ISO format, e.g. `2026-10-15T10:00:00Z`).',
        }),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingHeroMedia'),
        links: z.array(createLinkSchema()).optional(),
        image: createImageSchema().optional(),
        video: z.object({
          src: property(z.string().min(1)).editor({
            input: 'media',
            // @ts-expect-error `description` is custom and patched in `nuxt-studio`
            description: 'The source of the video.',
          }),
          poster: property(z.string().optional()).editor({
            input: 'media',
            // @ts-expect-error `description` is custom and patched in `nuxt-studio`
            description: 'The poster image for the video.',
          }),
        }).optional(),
        overlayOpacity: property(z.number().min(0).max(1).default(0.5)).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'The opacity of the black overlay on top of the media (0-1).',
        }),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingMarquee'),
        images: z.array(createImageSchema()),
        direction: z.enum(['left', 'right']).default('left'),
        speed: z.number().default(20),
        gap: z.number().default(0),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingMetaInfo'),
        height: property(z.enum(['normal', 'small']).default('normal')).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'The vertical size of the section.',
        }),
        items: z.array(z.object({
          icon: property(z.string().min(1)).editor({
            input: 'icon',
            // @ts-expect-error `description` is custom and patched in `nuxt-studio`
            description: 'The icon of the item.',
          }),
          text: property(z.string().min(1)).editor({
            // @ts-expect-error `description` is custom and patched in `nuxt-studio`
            description: 'The text of the item.',
          }),
          label: property(z.string().optional()).editor({
            // @ts-expect-error `description` is custom and patched in `nuxt-studio`
            description: 'The label of the item.',
          }),
        })),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingSection'),
        orientation: orientationEnum.optional(),
        reverse: z.boolean().optional(),
        features: z.array(createFeatureItemSchema()).optional(),
        image: createImageSchema().optional(),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingSeparator'),
        label: z.string().optional(),
        icon: property(z.string().optional()).editor({
          input: 'icon',
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'An optional icon for the separator.',
        }),
        avatar: createImageSchema().optional(),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingSpeakers'),
      }),

      createLandingBlockBaseSchema().extend({
        component: z.literal('AppLandingSponsors'),
        showViewAll: property(z.boolean().default(false)).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'Show a "View all Sponsors" button. Links to the sponsors FAQ page, which must '
            + 'be created manually.',
        }),
        viewAllLink: property(z.string().min(1).default('/faq/sponsors')).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'The link for the "View all Sponsors" button.',
        }),
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

    ]),
  )).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: '⚠️ NOTE: Click the little dots at the top right of the sidebar and change to "Use code editor" '
      + 'to edit the landing page blocks properly as the visual editor does not support all features here!',
  }),
})
