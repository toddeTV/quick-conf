import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const talkSchema = z.object({
  slug: z.string().describe('The UNIQUE slug of the talk. This is used to identify and '
    + 'link the talk to other collections. Never change this!'),
  type: z.enum(['talk', 'lightning-talk', 'panel', 'keynote', 'workshop']).describe('The type of the talk.'),
  title: z.string().describe('The title of the talk.'),
  // abstract: z.string().describe('The abstract of the talk.'), // this is the body of the markdown file itself
  speakers: z.array(z.string()).default([]).describe('An array of speaker slugs.'),
  dateTime: z.date().describe('The date and time of the talk when it takes place.'),
  stage: z.string().describe('The slug of the stage where the talk takes place.'),
  resources: z.array(z.object({
    url: z.url().describe('Put in the full URL to the resource.'),
    description: z.string().optional().describe('An optional description for the link.'),
    icon: property(z.string().optional()).editor({ input: 'icon' }).describe('Optionally override the icon. '
      + 'By default it is detected automatically. Try sticking to `Simple Icons` for consistency.',
    ),
  })).default([]),
})
