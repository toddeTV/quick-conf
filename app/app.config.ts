/**
 * Application configuration file.
 * Schema is defined in `nuxt.schema.ts`.
 */
export default defineAppConfig({
  socials: {
    social1: {
      name: 'toddeTV',
      icon: 'i-simple-icons-x',
      url: 'https://x.com/toddeTV',
    },
    social2: {
      name: 'toddeTV',
      icon: 'i-simple-icons-bluesky',
      url: 'https://bsky.app/profile/todde.tv',
    },
    social3: {
      name: 'toddeTV',
      icon: 'i-simple-icons-linkedin',
      url: 'https://www.linkedin.com/in/toddetv/',
    },
    social4: {
      name: 'toddeTV',
      icon: 'i-simple-icons-github',
      url: 'https://github.com/toddeTV/',
    },
  },

  customFooterColumn: {
    title: 'About This Conference',
    links: {
      link1: {
        name: 'some link without icon',
        // icon: 'i-lucide-house',
        url: '/',
      },
      link2: {
        name: 'some link with icon',
        icon: 'i-lucide-house',
        url: '/',
      },
      link3: {
        name: 'external links also work',
        icon: 'i-simple-icons-x',
        url: 'https://x.com/toddeTV',
      },
    },
  },

  ui: { // for `@nuxt/ui`
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
})
