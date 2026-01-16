import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const speakerSchema = z.object({
  slug: z.string().describe('The UNIQUE slug of the speaker. This is used to identify and link '
    + 'the speaker to other collections. Use `firstname-lastname` as convention. Never change this!'),
  featured: z.boolean().default(false).describe('Whether the speaker is featured on the main page.'),
  name: z.string().describe('The name of the speaker.'),
  description: z.string().describe('A short description of the speaker - one line, best only a few words!'),
  // this is the body of the markdown file itself:
  // biography: z.string().describe('A biography of the speaker. This is shown on the speaker page.'),
  // TODO or call it `avatar` instead of `image`?
  image: property(z.string().min(1)).editor({ input: 'media' }).describe('The image of the speaker.'),
  company: z.string().optional().describe('The name of the company the speaker works for.'),
  socialMedia: z.array(z.object({
    url: z.url().describe('Put in the full URL to the account/channel/etc.'),
    description: z.string().optional().describe('An optional description for the link.'),
    icon: property(z.string().optional()).editor({ input: 'icon' }).describe('Optionally override the icon. '
      + 'By default it is detected automatically. Try sticking to `Simple Icons` for consistency.'),
  })).default([]),
})
