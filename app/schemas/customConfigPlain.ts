/**
 * This file is a redundant duplicate of `app/schemas/customConfig.ts` but without
 * any imports from `@nuxt/content`, as that imports are not allowed in `app.config.ts`.
 * Keep both files in sync when making changes!
 * //TODO remove this file and find another solution!
 */

import { z } from 'zod/v4'

export function createSimpleLinkSchema() {
  return z.object({
    name: z.string().optional(),
    // we use `string()` and not `url()` as internal links like e.g. `/something` are also valid
    url: z.string().min(1),
    icon: z.string().optional(),
  })
}

export function createFooterColumnSchema() {
  return z.object({
    // TODO would be better `.min(1)` instead of `.optional()`, but NuxtStudio does not delete it in the UI
    title: z.string().optional(),
    // TODO would be better `.nonempty()` instead of `.default([])`, but NuxtStudio does not delete it in the UI
    links: z.array(createSimpleLinkSchema()).default([]),
  }).optional()
}

export const customConfigSchema = z.object({
  general: z.object({
    conferenceName: z.string().min(1),
    conferenceFoundingYear: z.number().default(new Date().getFullYear()),
    timeZone: z.string().default('UTC'),
    siteUrl: z.url().min(1),
    logo: z.object({
      light: z.string().min(1),
      dark: z.string().min(1),
    }),
    favicon: z.object({
      light: z.string().min(1),
      dark: z.string().min(1),
    }),
  }),
  footer: z.object({
    footerColumns: z.object({
      column1: createFooterColumnSchema(),
      column2: createFooterColumnSchema(),
      column3: z.object({}).readonly().optional(),
      column4: z.object({
        socials: z.array(createSimpleLinkSchema()).default([]),
      }).optional(),
    }).optional(),
    bottomIcons: z.object({
      showRepositoryLink: z.boolean().default(true),
      showAdminLink: z.boolean().default(true),
    }).optional(),
  }).optional(),
  nuxtUI: z.object({
    colors: z.object({
      primary: z.enum([
        'amber',
        'brand', // custom color palette, only if defined in CSS, see description above
        'blue',
        'cyan',
        'emerald',
        'fuchsia',
        'green',
        'indigo',
        'lime',
        'orange',
        'pink',
        'purple',
        'red',
        'rose',
        'sky',
        'teal',
        'violet',
        'yellow',
      ]).default('green'),
      neutral: z.enum(['gray', 'neutral', 'slate', 'stone', 'zinc']).default('slate'),
    }),
    icons: z.object({
      search: z.string().default('i-lucide-search'),
      dark: z.string().default('i-lucide-moon'),
      light: z.string().default('i-lucide-sun'),
      external: z.string().default('i-lucide-external-link'),
      chevron: z.string().default('i-lucide-chevron-down'),
      hash: z.string().default('i-lucide-hash'),
    }).default({
      search: 'i-lucide-search',
      dark: 'i-lucide-moon',
      light: 'i-lucide-sun',
      external: 'i-lucide-external-link',
      chevron: 'i-lucide-chevron-down',
      hash: 'i-lucide-hash',
    }),
  }),
  nuxtStudio: z.object({
    repository: z.object({
      provider: z.enum(['github', 'gitlab']).default('github'),
      owner: z.string().min(1),
      repo: z.string().min(1),
      branch: z.string().default('main'),
      private: z.boolean().default(false),
    }),
    i18n: z.object({
      defaultLocale: z.string().default('en'),
    }),
  }),
})

export type CustomConfig = z.infer<typeof customConfigSchema>
export type RepositoryConfig = CustomConfig['nuxtStudio']['repository']
