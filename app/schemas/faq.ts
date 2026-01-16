import { z } from 'zod/v4'
import { createBaseWithSeoSchema } from './common.ts'

export const faqSchema = createBaseWithSeoSchema().extend({
  order: z.number().int().default(999),
})
