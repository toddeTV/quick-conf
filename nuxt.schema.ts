import { field, group } from '@nuxt/content/preview'

// Each `group` should have a icon, a `field` not.

/**
 * Helper function to create a social link group.
 * @param index The index of the social link.
 * @returns A group schema for the social link.
 */
function createSocialLinkGroup(index: number) {
  return group({
    title: `Social Link ${index}`,
    description: `Configure your social media link ${index}.`,
    icon: 'lucide:share-2',
    fields: {
      name: field({
        type: 'string',
        title: 'Name',
        description: 'Name or label for this social media link.',
        default: '',
      }),
      icon: field({
        type: 'icon',
        title: 'Icon',
        description: 'Choose an icon for this social media platform. Try sticking to `Simple Icons` for consistency.',
        default: 'lucide:link',
      }),
      url: field({
        type: 'string',
        title: 'URL',
        description: 'Destination URL for this social media link, including `https://` as prefix.',
        default: '',
      }),
    },
  })
}

/**
 * Nuxt schema definition.
 */
export default defineNuxtSchema({
  /**
   * Application configuration schema.
   * Defines the structure for `app.config.ts`, used in `@nuxt/content` and Nuxt Studio.
   */
  appConfig: {
    general: group({
      title: 'General',
      description: 'General Customization.',
      icon: 'lucide:clipboard-list',
      fields: {
        conferenceName: field({
          type: 'string',
          title: 'Conference Name',
          description: 'The name of the conference.',
          default: 'Example Conference',
        }),
        conferenceFoundingYear: field({
          type: 'number',
          title: 'Conference Founding Year',
          description: 'The year that the conference was founded (took place first or was invented).',
          default: new Date().getFullYear(),
        }),
        logo: group({
          title: 'Logo',
          description: 'The Logo for the application. Create onw that works in both color modes (light and dark)'
            + ' and set in both fields or create two separate logos for each color mode.',
          icon: 'lucide:share-2',
          fields: {
            dark: field({
              type: 'media',
              title: 'Logo for dark mode.',
              description: 'The Logo used in dark mode.',
              default: undefined,
            }),
            light: field({
              type: 'media',
              title: 'Logo for light mode.',
              description: 'The Logo used in light mode.',
              default: undefined,
            }),
          },
        }),
        favicon: group({
          title: 'Favicon',
          description: 'The Favicon for the application. Some people use a different color mode (light vs dark)'
            + ' for the browser than for the website, so because of that and for consistency I recommend to use only'
            + ' one favicon that is capable to be used in both color modes. Use two only if you know what you do.',
          icon: 'lucide:share-2',
          fields: {
            dark: field({
              type: 'media',
              title: 'Favicon for dark mode.',
              description: 'The Favicon used in dark mode.',
              default: undefined,
            }),
            light: field({
              type: 'media',
              title: 'Favicon for light mode.',
              description: 'The Favicon used in light mode.',
              default: undefined,
            }),
          },
        }),
      },
    }),

    socials: group({
      title: 'Socials',
      description: 'Socials Customization.',
      icon: 'lucide:share-2',
      fields: Object.fromEntries(
        // generates `social1: createSocialLinkGroup(1)`, ..., `social6: createSocialLinkGroup(6)`
        Array.from({ length: 6 }, (_, i) => i + 1).map(index => [
          `social${index}`,
          createSocialLinkGroup(index),
        ]),
      ),
    }),

    customFooterColumn: group({
      title: 'Custom Footer Column',
      description: 'Customize the custom footer column. This is the third column in the footer, before the socials.'
        + ' Leave fields empty to hide the column (at least the \'title\').',
      icon: 'lucide:share-2',
      fields: {
        title: field({
          type: 'string',
          title: 'Title',
          description: 'The title of the custom footer column.',
          default: '',
        }),
        links: Object.fromEntries(
          // generates `link1: createSocialLinkGroup(1)`, ..., `link4: createSocialLinkGroup(4)`
          Array.from({ length: 4 }, (_, i) => i + 1).map(index => [
            `link${index}`,
            createSocialLinkGroup(index),
          ]),
        ),
      },
    }),

    ui: group({
      title: 'UI',
      description: 'UI Customization.',
      icon: 'lucide:palette',
      fields: {
        colors: group({
          title: 'Colors',
          description: 'Manage main colors of your application. If you have a custom color pallet'
            + ' (e.g. corporate design for branding), you can add the color pallet in `/app/assets/css/main.css`'
            + ' by enabling and setting all `--color-brand-*` CSS variables and then use the word `brand` in the'
            + ' fields below. Without that, the `brand` option will not work here and might crash the application!',
          icon: 'lucide:paint-bucket',
          fields: {
            primary: field({
              type: 'string',
              title: 'Primary',
              description: 'Primary color of your UI.',
              default: 'green',
              required: [
                'amber',
                'brand', // custom color pallet, only if defined in CSS, see description above
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
              ],
            }),
            neutral: field({
              type: 'string',
              title: 'Neutral',
              description: 'Neutral color of your UI.',
              default: 'slate',
              required: [
                'gray',
                'neutral',
                'slate',
                'stone',
                'zinc',
              ],
            }),
          },
        }),

        icons: group({
          title: 'Icons',
          description: 'Manage icons used in NuxtUI.',
          icon: 'i-mdi-application-settings-outline',
          fields: {
            search: field({
              type: 'icon',
              title: 'Search Bar',
              description: 'Icon to display in the search bar.',
              icon: 'i-mdi-magnify',
              default: 'i-lucide-search',
            }),
            dark: field({
              type: 'icon',
              title: 'Dark mode',
              description: 'Icon of color mode button for dark mode.',
              icon: 'i-mdi-moon-waning-crescent',
              default: 'i-lucide-moon',
            }),
            light: field({
              type: 'icon',
              title: 'Light mode',
              description: 'Icon of color mode button for light mode.',
              icon: 'i-mdi-white-balance-sunny',
              default: 'i-lucide-sun',
            }),
            external: field({
              type: 'icon',
              title: 'External Link',
              description: 'Icon for external link.',
              icon: 'i-mdi-arrow-top-right',
              default: 'i-lucide-external-link',
            }),
            chevron: field({
              type: 'icon',
              title: 'Chevron',
              description: 'Icon for chevron.',
              icon: 'i-mdi-chevron-down',
              default: 'i-lucide-chevron-down',
            }),
            hash: field({
              type: 'icon',
              title: 'Hash',
              description: 'Icon for hash anchors.',
              icon: 'i-ph-hash',
              default: 'i-lucide-hash',
            }),
          },
        }),
      },
    }),
  },
})
