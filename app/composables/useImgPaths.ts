import { isEmpty } from 'lodash-es'

/**
 * A composable for handling theme-aware image resolving. It provides functions
 * to select appropriate images or fallbacks based on the current color mode.
 *
 * @returns An object with image utility functions.
 */
export function useImgPaths() {
  const colorMode = useSimplifiedColorMode()
  const { currentColorMode } = toRefs(colorMode)

  // Defines the default placeholder images for both dark and light themes.
  const placeholderImages = {
    dark: '/image-placeholder/dark.svg',
    light: '/image-placeholder/light.svg',
  }

  /**
   * Resolves an image path. If the path is empty, it returns a theme-appropriate
   * placeholder image.
   *
   * @param imagePath - The optional path to the image.
   * @param theme - Determines which placeholder to use if the imagePath is missing.
   *              'auto' uses the current color mode, while 'light' or 'dark' forces a specific theme.
   * @returns The provided image path or a fallback placeholder path.
   */
  function resolveImagePath(imagePath?: string, theme: 'auto' | 'light' | 'dark' = 'auto'): string {
    if (isEmpty(imagePath)) {
      if (theme === 'auto') {
        return placeholderImages[currentColorMode.value]
      }
      return placeholderImages[theme]
    }

    // Non-null assertion is safe here because isEmpty checks for null/undefined.
    return imagePath!
  }

  /**
   * Selects an image from a given pair of light and dark theme images based on the
   * current color mode. It uses `resolveImagePath` to handle fallbacks.
   *
   * ATTENTION: Better use `UColorModeImage` for now. It will use `class="dark:hidden"` under the hood. Not ideal,
   * as it will load always both images, but good enough for most use cases and much smoother than this current
   * implementation.
   *
   * @param data - An object containing optional 'dark' and 'light' image paths.
   * @param data.dark - The path to the image for dark mode.
   * @param data.light - The path to the image for light mode.
   * @returns The image path that corresponds to the current color mode.
   */
  function autoSwitchOnColorMode(data: { dark?: string, light?: string }): string {
    const images = {
      dark: resolveImagePath(data.dark, 'dark'),
      light: resolveImagePath(data.light, 'light'),
    }
    return images[currentColorMode.value]
  }

  return {
    resolveImagePath,
    autoSwitchOnColorMode,
  }
}
