import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const speakerSchema = z.object({
  slug: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The UNIQUE slug of the speaker. This is used to identify and link '
      + 'the speaker to other collections. Use `firstname-lastname` as convention. Never change this!',
  }),
  featured: property(z.boolean().default(false)).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'Whether the speaker is featured on the main page.',
  }),
  name: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The name of the speaker.',
  }),
  description: property(z.string()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'A short description of the speaker - one line, best only a few words!',
  }),
  // this is the body of the markdown file itself:
  // biography: z.string().describe('A biography of the speaker. This is shown on the speaker page.'),
  // TODO or call it `avatar` instead of `image`?
  image: property(z.string().min(1)).editor({
    input: 'media',
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The image of the speaker.',
  }),
  company: property(z.string().optional()).editor({
    // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
    description: 'The name of the company the speaker works for.',
  }),
  socialMedia: z.array(z.object({
    url: property(z.url()).editor({
      // @ts-expect-error `description` does not exist in original project, but in our `nuxt-studio` patch it is used
      description: 'Put in the full URL to the account/channel/etc.',
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
