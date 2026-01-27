import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { targetEnum } from './common'

export const ticketSchema = z.object({
  slug: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The UNIQUE slug of the ticket. This is used to identify and '
      + 'link the ticket to other collections. Never change this!',
  }),
  title: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The title of the ticket.',
  }),
  description: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The description of the ticket.',
  }),
  price: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The price of the ticket. Can be a string like `free` or a number with currency.',
  }),
  discount: property(z.string().optional()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'An optional discount price to show a striked-through price.',
  }),
  features: property(z.array(z.string())).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'A list of features for the ticket.',
  }),
  scale: property(z.boolean().optional()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'Whether the ticket should be scaled up to attract more attention.',
  }),
  button: z.object({
    label: property(z.string()).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'The label of the button.',
    }),
    to: property(z.url()).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'The URL to link to.',
    }),
    target: property(targetEnum.default('_blank')).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'The target of the link.',
    }),
  }),
})
