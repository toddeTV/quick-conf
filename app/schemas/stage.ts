import { z } from 'zod/v4'

export const stageSchema = z.object({
  slug: z.string().describe('The UNIQUE slug of the stage. This is used to identify and '
    + 'link the stage to other collections. Never change this!'),
  name: z.string().describe('The name of the stage.'),
  place: z.string().optional()
    .describe('An optional string indicating the location (building/room/address/etc.).'),
})
