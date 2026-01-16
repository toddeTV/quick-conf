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
})
