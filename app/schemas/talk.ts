import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const talkSchema = z.object({
  slug: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The UNIQUE slug of the talk. This is used to identify and '
      + 'link the talk to other collections. Never change this!',
  }),
  type: property(z.enum(['talk', 'lightning-talk', 'panel', 'keynote', 'workshop'])).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The type of the talk.',
  }),
  title: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The title of the talk.',
  }),
  // this is the body of the markdown file itself:
  // abstract: property(z.string()).editor({
  //   // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
  //   description: 'The abstract of the talk.',
  // }),
  speakers: property(z.array(z.string()).default([])).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'An array of speaker slugs.',
  }),
  dateTime: property(z.coerce.date()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The date and time of the talk when it takes place.',
  }),
  stage: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The slug of the stage where the talk takes place.',
  }),
  resources: z.array(z.object({
    url: property(z.url()).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'Put in the full URL to the resource.',
    }),
    description: property(z.string().optional()).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'An optional description for the link.',
    }),
    icon: property(z.string().optional()).editor({
      input: 'icon',
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'Optionally override the icon. '
        + 'By default it is detected automatically. Try sticking to `Simple Icons` for consistency.',
    }),
  })).default([]),
})
