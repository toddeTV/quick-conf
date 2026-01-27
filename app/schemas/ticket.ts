import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { targetEnum } from './common'

export const ticketSchema = z.object({
  slug: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The UNIQUE slug of the ticket. This is used to identify and '
      + 'link the ticket to other collections. Never change this!',
  }),
  title: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The title of the ticket.',
  }),
  description: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The description of the ticket.',
  }),
  price: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The price of the ticket. Can be a string like `free` or a number with currency.',
  }),
  discount: property(z.string().optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'An optional discount price to show a striked-through price.',
  }),
  features: property(z.array(z.string().min(1))).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'A list of features for the ticket.',
  }),
  scale: property(z.boolean().optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Whether the ticket should be scaled up to attract more attention.',
  }),
  button: property(z.object({
    label: property(z.string()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The label of the button.',
    }),
    to: property(z.url()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The URL to link to.',
    }),
    target: property(targetEnum.default('_blank')).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The target of the link.',
    }),
  })).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The button configuration for the ticket.',
  }),
})
