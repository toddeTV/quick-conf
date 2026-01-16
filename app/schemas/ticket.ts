import { z } from 'zod/v4'
import { targetEnum } from './common'

export const ticketSchema = z.object({
  slug: z.string().describe('The UNIQUE slug of the ticket. This is used to identify and '
    + 'link the ticket to other collections. Never change this!'),
  title: z.string().describe('The title of the ticket.'),
  description: z.string().describe('The description of the ticket.'),
  price: z.string().describe('The price of the ticket. Can be a string like `free` or a number with currency.'),
  discount: z.string().optional().describe('An optional discount price to show a striked-through price.'),
  features: z.array(z.string()).describe('A list of features for the ticket.'),
  scale: z.boolean().optional().describe('Whether the ticket should be scaled up to attract more attention.'),
  button: z.object({
    label: z.string().describe('The label of the button.'),
    to: z.url().describe('The URL to link to.'),
    target: targetEnum.default('_blank').describe('The target of the link.'),
  }),
})
