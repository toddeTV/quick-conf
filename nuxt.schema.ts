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
  },
})
