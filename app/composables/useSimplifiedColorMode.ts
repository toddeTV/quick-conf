/**
 * Provides a simplified, reactive color mode that resolves the 'system' preference
 * to either 'light' or 'dark'. This avoids the need to handle three states ('light', 'dark', 'system')
 * throughout the application.
 *
 * @returns An object containing the resolved current color mode.
 */
export function useSimplifiedColorMode() {
  const colorMode = useColorMode()

  /**
   * A computed property that simplifies the color mode to either 'light' or 'dark'.
   * It reactively returns the resolved value from `@nuxtjs/color-mode`, which correctly
   * handles the 'system' preference by detecting the OS theme. This avoids FOUC
   * by always providing a deterministic theme.
   */
  const currentColorMode = computed<'light' | 'dark'>(() => {
    // If `colorMode.value` is already resolved to 'light' or 'dark', return it.
    if (colorMode.value === 'light' || colorMode.value === 'dark') {
      return colorMode.value
    }

    // From here, `colorMode.value` is 'system'.
    // On the server, we cannot know the OS preference, so we default to 'light'
    // to ensure consistent SSR output and prevent hydration mismatch.
    if (import.meta.server) {
      return 'light'
    }

    // On the client, we can determine the actual system preference.
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }
    catch {
      // just to be really sure
      return 'light'
    }
  })

  return {
    currentColorMode,
  }
}
