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
   * The current color mode, simplified to 'light' or 'dark'.
   * It correctly resolves the 'system' preference by checking the actual
   * detected color mode (`colorMode.value`).
   */
  const currentColorMode = computed<'light' | 'dark'>(() => {
    // If the color mode is already 'light' or 'dark' (e.g., forced by the user), return it directly.
    if (colorMode.value === 'light' || colorMode.value === 'dark') {
      return colorMode.value
    }

    // If the preference is 'system', colorMode.value will hold the actual detected mode.
    // This part of the logic might seem redundant if colorMode.value is always correct,
    // but it serves as a fallback for the preference.
    if (colorMode.preference === 'light' || colorMode.preference === 'dark') {
      return colorMode.preference
    }

    // TODO what to return when `system`? Check it in examples!
    // As a final fallback, default to 'light' mode.
    return 'light'
  })

  return {
    currentColorMode,
  }
}
