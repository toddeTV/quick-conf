import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { createSimpleLinkSchema } from './common'

export const customConfigSchema = z.object({
  general: z.object({
    conferenceName: z.string().min(1).describe('The name of the conference.'),
    conferenceFoundingYear: z.number().default(new Date().getFullYear())
      .describe('The year that the conference was founded (took place first or was invented).'),
    timeZone: z.string().default('UTC')
      .describe('The time zone where the conference takes place, e.g. `Europe/Berlin`. '
        + 'This is used to display the schedule in the correct local time.'),
    githubProjectLink: z.string().min(1)
      .describe('The link to the GitHub project of this conference website. Leave empty to hide.'),
    logo: z.object({
      light: property(z.string().min(1)).editor({ input: 'media' }).describe('The Logo used in light mode.'),
      dark: property(z.string().min(1)).editor({ input: 'media' }).describe('The Logo used in dark mode.'),
    }),
    favicon: z.object({
      light: property(z.string().min(1)).editor({ input: 'media' }).describe('The Favicon used in light mode.'),
      dark: property(z.string().min(1)).editor({ input: 'media' }).describe('The Favicon used in dark mode.'),
    }),
  }).describe('General Customization.'),
  socials: z.array(createSimpleLinkSchema()).default([]).describe('Socials Customization.'),
  customFooterColumn: z.object({
    // TODO would be better `.min(1)` instead of `.optional()`, but NuxtStudio does not delete it in the UI
    title: z.string().optional().describe('The title of the custom footer column.'),
    // TODO would be better `.nonempty()` instead of `.default([])`, but NuxtStudio does not delete it in the UI
    links: z.array(createSimpleLinkSchema()).default([])
      .describe('The links to show in the custom footer column.'),
  }).optional()
    .describe('Customize the custom footer column. This is the third column in the footer, before the socials.'
      + ' Leave fields empty to hide the column (at least the \'title\').'),
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
      ]).default('red').describe('Primary color of your UI.'),
      neutral: z.enum(['gray', 'neutral', 'slate', 'stone', 'zinc']).default('slate')
        .describe('Neutral color of your UI.'),
    }).describe('Manage main colors of your application. If you have a custom color palette'
      + ' (e.g. corporate design for branding), you can add the color palette in `/public/custom-styles.css`'
      + ' by overriding/setting all `--color-brand-*` CSS variables and then use the word `brand` in the'
      + ' fields below.'
      + ' Also keep in mind that you can set even more custom styles in the file `/public/custom-styles.css`, '
      + ' because you can use default CSS syntax here and the file is imported automatically.'),
    icons: z.object({
      search: property(z.string().default('i-lucide-search')).editor({ input: 'icon' })
        .describe('Icon to display in the search bar.'),
      dark: property(z.string().default('i-lucide-moon')).editor({ input: 'icon' })
        .describe('Icon of color mode button for dark mode.'),
      light: property(z.string().default('i-lucide-sun')).editor({ input: 'icon' })
        .describe('Icon of color mode button for light mode.'),
      external: property(z.string().default('i-lucide-external-link')).editor({ input: 'icon' })
        .describe('Icon for external link.'),
      chevron: property(z.string().default('i-lucide-chevron-down')).editor({ input: 'icon' })
        .describe('Icon for chevron.'),
      hash: property(z.string().default('i-lucide-hash')).editor({ input: 'icon' })
        .describe('Icon for hash anchors.'),
    }).default({
      search: 'i-lucide-search',
      dark: 'i-lucide-moon',
      light: 'i-lucide-sun',
      external: 'i-lucide-external-link',
      chevron: 'i-lucide-chevron-down',
      hash: 'i-lucide-hash',
    }),
  }).describe('NuxtUI Customization.'),
})
