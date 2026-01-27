import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const stageSchema = z.object({
  slug: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The UNIQUE slug of the stage. This is used to identify and '
      + 'link the stage to other collections. Never change this!',
  }),
  name: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The name of the stage.',
  }),
  place: property(z.string().optional()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'An optional string indicating the location (building/room/address/etc.).',
  }),
})
