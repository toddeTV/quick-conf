import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const sponsorSchema = z.object({
  slug: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The UNIQUE slug of the sponsor. This is used to identify and link the sponsor to other '
      + 'collections. Never change this!',
  }),
  image: property(z.string().min(1)).editor({
    input: 'media',
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The image of the sponsor.',
  }),
  url: property(z.url().optional()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The URL of the sponsors webpage.',
  }),
})
