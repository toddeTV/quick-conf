import { z } from 'zod/v4'
import { createBaseWithSeoSchema } from './common'

export const faqSchema = createBaseWithSeoSchema().extend({
  order: z.number().default(999),
})
