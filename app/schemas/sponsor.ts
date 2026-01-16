import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const sponsorSchema = z.object({
  slug: z.string().describe('The UNIQUE slug of the sponsor. This is used to identify and '
    + 'link the sponsor to other collections. Never change this!'),
  image: property(z.string().min(1)).editor({ input: 'media' }).describe('The image of the sponsor.'),
  url: z.url().optional().describe('The URL of the sponsors webpage.'),
})
