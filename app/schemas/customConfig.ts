import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { createSimpleLinkSchema } from './common'

export const customConfigSchema = z.object({
  _warning: property(z.string().default('').readonly()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: '⚠️ NOTE: This configuration file is not hot-reloaded. '
      + 'You must restart the development server or rebuild the application to see your changes.',
  }),
  general: property(z.object({
    conferenceName: property(z.string().min(1)).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The name of the conference.',
    }),
    conferenceFoundingYear: property(z.number().default(new Date().getFullYear())).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The year that the conference was founded (took place first or was invented).',
    }),
    timeZone: property(z.string().default('UTC')).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The time zone where the conference takes place, e.g. `Europe/Berlin`. '
        + 'This is used to display the schedule in the correct local time.',
    }),
    siteUrl: property(z.url()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The public URL of the website (e.g. `https://my-conference.com`).',
    }),
    logo: property(z.object({
      light: property(z.string().min(1)).editor({
        input: 'media',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The Logo used in light mode.',
      }),
      dark: property(z.string().min(1)).editor({
        input: 'media',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The Logo used in dark mode.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The Logo configuration.',
    }),
    favicon: property(z.object({
      light: property(z.string().min(1)).editor({
        input: 'media',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The Favicon used in light mode.',
      }),
      dark: property(z.string().min(1)).editor({
        input: 'media',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The Favicon used in dark mode.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The Favicon configuration.',
    }),
  })).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'General Customization.',
  }),
  socials: property(z.array(createSimpleLinkSchema()).default([])).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Socials Customization.',
  }),
  customFooterColumn: property(z.object({
    // TODO would be better `.min(1)` instead of `.optional()`, but NuxtStudio does not delete it in the UI
    title: property(z.string().optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The title of the custom footer column.',
    }),
    // TODO would be better `.nonempty()` instead of `.default([])`, but NuxtStudio does not delete it in the UI
    links: property(z.array(createSimpleLinkSchema()).default([])).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'The links to show in the custom footer column.',
    }),
  }).optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Customize the custom footer column. This is the third column in the footer, before the socials.'
      + ' Leave fields empty to hide the column (at least the \'title\').',
  }),
  nuxtUI: property(z.object({
    colors: property(z.object({
      primary: property(z.enum([
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
      ]).default('green')).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Primary color of your UI.',
      }),
      neutral: property(z.enum(['gray', 'neutral', 'slate', 'stone', 'zinc']).default('slate')).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Neutral color of your UI.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Manage main colors of your application. If you have a custom color palette'
        + ' (e.g. corporate design for branding), you can add the color palette in `/public/custom-styles.css`'
        + ' by overriding/setting all `--color-brand-*` CSS variables and then use the word `brand` in the'
        + ' fields below.'
        + ' Also keep in mind that you can set even more custom styles in the file `/public/custom-styles.css`, '
        + ' because you can use default CSS syntax here and the file is imported automatically.',
    }),
    icons: property(z.object({
      search: property(z.string().default('i-lucide-search')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon to display in the search bar.',
      }),
      dark: property(z.string().default('i-lucide-moon')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon of color mode button for dark mode.',
      }),
      light: property(z.string().default('i-lucide-sun')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon of color mode button for light mode.',
      }),
      external: property(z.string().default('i-lucide-external-link')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon for external link.',
      }),
      chevron: property(z.string().default('i-lucide-chevron-down')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon for chevron.',
      }),
      hash: property(z.string().default('i-lucide-hash')).editor({
        input: 'icon',
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Icon for hash anchors.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Icons used across the UI.',
    }),
  })).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'NuxtUI Customization.',
  }),
  nuxtStudio: property(z.object({
    repository: property(z.object({
      provider: property(z.enum(['github', 'gitlab']).default('github')).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The git provider.',
      }),
      owner: property(z.string().min(1)).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The owner of the repository.',
      }),
      repo: property(z.string().min(1)).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The name of the repository.',
      }),
      branch: property(z.string().default('main')).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The branch to use.',
      }),
      private: property(z.boolean().default(false)).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Whether the repository is private.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Repository configuration.',
    }),
    i18n: property(z.object({
      defaultLocale: property(z.string().default('en')).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'The default locale of the content.',
      }),
    })).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Internationalization configuration.',
    }),
  })).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Nuxt Studio configuration.',
  }),
})
