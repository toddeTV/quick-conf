/**
 * Application configuration file.
 * Schema is defined in `nuxt.schema.ts`.
 */
export default defineAppConfig({
  general: {
    conferenceName: 'CONF',
    // conferenceFoundingYear: 2025,
    logo: {
      light: '/logo/light.svg',
      dark: '/logo/dark.svg',
    },
    favicon: {
      light: '/favicon/favicon.svg',
      dark: '/favicon/favicon.svg',
    },
  },

  socials: {
    social1: {
      name: 'toddeTV',
      url: 'https://x.com/toddeTV',
    },
    social2: {
      name: 'toddeTV',
      url: 'https://bsky.app/profile/todde.tv',
    },
    social3: {
      name: 'toddeTV',
      url: 'https://www.linkedin.com/in/toddetv/',
    },
    social4: {
      name: 'toddeTV',
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
