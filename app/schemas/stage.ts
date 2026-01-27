import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const stageSchema = z.object({
  slug: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The UNIQUE slug of the stage. This is used to identify and '
      + 'link the stage to other collections. Never change this!',
  }),
  name: property(z.string().min(1)).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'The name of the stage.',
  }),
  place: property(z.string().optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'An optional string indicating the location (building/room/address/etc.).',
  }),
})
