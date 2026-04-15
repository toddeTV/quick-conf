/**
 * Copies a string into the system clipboard.
 *
 * //TODO refactor once the project has vueuse.
 *
 * @param {string} value - The text to place in the clipboard.
 * @returns {Promise<boolean>} True when copy succeeded, false on failure.
 *
 * @example
 * ```ts
 * const copied = await copyToClipboard('https://example.com/display')
 * // => true
 * ```
 */
export async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  }
  catch {
  }

  let textArea: HTMLTextAreaElement | null = null
  try {
    // Keep a legacy fallback for browsers without navigator.clipboard support.
    textArea = document.createElement('textarea')
    textArea.value = value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    const isCopied = document.execCommand('copy')

    return isCopied
  }
  catch {
    return false
  }
  finally {
    textArea?.remove()
  }
}
