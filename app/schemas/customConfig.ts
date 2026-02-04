import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { createFooterColumnSchema, createSimpleLinkSchema } from './common'

export const customConfigSchema = z.object({
  _warning: property(z.object({}).readonly()).editor({
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
    siteUrl: property(z.url().min(1)).editor({
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

  footer: property(z.object({
    footerColumns: property(z.object({
      column1: property(
        createFooterColumnSchema(),
      ).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Column 1 [optional, leave empty to hide]: For your free use as you wish.',
      }),
      column2: property(
        createFooterColumnSchema(),
      ).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Column 2 [optional, leave empty to hide]: For your free use as you wish.',
      }),
      column3: property(z.object({
      }).readonly().optional()).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Column 3 [required]: Legal information. Always "Contact", "Privacy Policy" and "Legal Notice".',
      }),
      column4: property(z.object({
        socials: property(z.array(createSimpleLinkSchema()).default([])).editor({
          // @ts-expect-error `description` is custom and patched in `nuxt-studio`
          description: 'Social media links to display in this column.',
        }),
      }).optional()).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Column 4 [optional, leave empty to hide]: Socials (external links to social media profiles).',
      }),
    }).optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'First row of the footer: Up to 4 columns, each with one headline and multiple links.',
    }),
    bottomIcons: property(z.object({
      showRepositoryLink: property(z.boolean().default(true)).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Display an icon as link to the GIT repository of your website.',
      }),
      showAdminLink: property(z.boolean().default(true)).editor({
        // @ts-expect-error `description` is custom and patched in `nuxt-studio`
        description: 'Display an icon as link to the admin area of your website. This is a link for quick access to '
          + 'the NuxtStudio CMS. It is a shortcut to `/_admin` that you can click instead of typing the URL manually.',
      }),
    }).optional()).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Second row of the footer: Some icons on the right that you can configure here.',
    }),
  }).optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Customize the footer of the website.',
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

  ogImage: property(z.object({
    bgLight: property(
      z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Use a valid hex color').default('#ffffff'),
    ).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Background Color for Light Mode (e.g. `#ffffff` for `white`)',
    }),
    bgDark: property(
      z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Use a valid hex color').default('#0f172a'),
    ).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Background Color for Dark Mode (e.g. `#0f172a` for `slate-900`)',
    }),
    textLight: property(
      z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Use a valid hex color').default('#64748b'),
    ).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Body Text Color for Light Mode (e.g. `#64748b` for `slate-500`)',
    }),
    textDark: property(
      z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Use a valid hex color').default('#94a3b8'),
    ).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Body Text Color for Dark Mode (e.g. `#94a3b8` for `slate-400`)',
    }),
    primary: property(
      z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i, 'Use a valid hex color').default('#22c55e'),
    ).editor({
      // @ts-expect-error `description` is custom and patched in `nuxt-studio`
      description: 'Primary Color (e.g. `#22c55e` for `green-500` or custom hex code for brand hex)',
    }),
  }).optional()).editor({
    // @ts-expect-error `description` is custom and patched in `nuxt-studio`
    description: 'Open Graph Image Customization (Social Media Previews).',
  }),
})
