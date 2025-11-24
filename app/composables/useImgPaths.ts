/**
 * A composable for handling theme-aware image resolving. It provides functions
 * to select appropriate images or fallbacks based on the current color mode.
 *
 * @returns An object with image utility functions.
 */
export function useImgPaths() {
  const { currentColorMode } = useSimplifiedColorMode()

  // Defines the default placeholder images for both dark and light themes.
  const placeholderImages = {
    dark: '/image-placeholder/dark.svg',
    light: '/image-placeholder/light.svg',
  }

  /**
   * Resolves a pair of dark and light image paths, falling back to default placeholders if either is not provided.
   *
   * @param data - An object containing optional 'dark' and 'light' image paths.
   * @param data.dark - The path to the image for dark mode.
   * @param data.light - The path to the image for light mode.
   * @returns An object with resolved 'dark' and 'light' image paths, guaranteed to be strings.
   */
  function resolveImagePath(data?: { dark?: string, light?: string }): { dark: string, light: string } {
    return {
      dark: data?.dark ?? placeholderImages.dark,
      light: data?.light ?? placeholderImages.light,
    }
  }

  /**
   * Selects an image from a given pair of light and dark theme images based on the
   * current color mode. It uses `resolveImagePath` to handle fallbacks.
   *
   * ATTENTION: For rendering images in templates, prefer `UColorModeImage` which uses CSS classes
   * to switch between images - but it always loads dark and light and hides one of them. This avoids
   * re-fetching the image file on color mode changes, but has a higher network traffic.
   * Use `autoSwitchOnColorMode` only for cases where CSS switching isn't possible, such as
   * favicons or other non-template image references.
   *
   * @param data - An object containing optional 'dark' and 'light' image paths.
   * @param data.dark - The path to the image for dark mode.
   * @param data.light - The path to the image for light mode.
   * @returns The image path that corresponds to the current color mode.
   */
  function autoSwitchOnColorMode(data?: { dark?: string, light?: string }): string {
    const images = resolveImagePath(data)
    return images[currentColorMode.value]
  }

  return {
    resolveImagePath,
    autoSwitchOnColorMode,
  }
}
