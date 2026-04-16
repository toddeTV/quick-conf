import type { DisplayQrCodeStyle } from '~/types/display'

export interface QrCodeGenerateOptions {
  darkColor?: string
  lightColor?: string
  margin?: number
  width?: number
}

export interface QrCodeColorPair {
  darkColor: string
  lightColor: string
}

/**
 * Resolves the foreground and background color pair for a display QR code style.
 *
 * @param {DisplayQrCodeStyle} qrCodeStyle - The configured QR visual style.
 * @returns {QrCodeColorPair} The matching dark and light color values.
 *
 * @example
 * ```ts
 * const colors = getDisplayQrCodeColors('black-on-transparent')
 * // => { darkColor: '#000000', lightColor: '#0000' }
 * ```
 */
export function getDisplayQrCodeColors(qrCodeStyle: DisplayQrCodeStyle): QrCodeColorPair {
  if (qrCodeStyle === 'white-on-black') {
    return {
      darkColor: '#FFFFFF',
      lightColor: '#000000',
    }
  }

  if (qrCodeStyle === 'black-on-transparent') {
    return {
      darkColor: '#000000',
      lightColor: '#0000',
    }
  }

  if (qrCodeStyle === 'white-on-transparent') {
    return {
      darkColor: '#FFFFFF',
      lightColor: '#0000',
    }
  }

  return {
    darkColor: '#000000',
    lightColor: '#FFFFFF',
  }
}

/**
 * Creates a QR code data URL for a given value.
 *
 * @param {string} value - The raw text or URL encoded into the QR code.
 * @param {QrCodeGenerateOptions} options - Optional QR generation overrides.
 * @returns {Promise<string>} A data URL string, or an empty string when no value is provided.
 *
 * @example
 * ```ts
 * const dataUrl = await generateQrCodeDataUrl('https://example.com/schedule', {
 *   darkColor: '#000000',
 *   lightColor: '#FFFFFF',
 *   width: 220,
 * })
 * ```
 */
export async function generateQrCodeDataUrl(value: string, options: QrCodeGenerateOptions = {}): Promise<string> {
  if (!value) {
    return ''
  }

  const { default: QRCode } = await import('qrcode')

  const baseOptions = {
    margin: options.margin ?? 1,
    width: options.width ?? 220,
  }

  if (!options.darkColor || !options.lightColor) {
    return QRCode.toDataURL(value, baseOptions)
  }

  try {
    return await QRCode.toDataURL(value, {
      ...baseOptions,
      color: {
        dark: options.darkColor,
        light: options.lightColor,
      },
    })
  }
  catch {
    // Fall back to default QR colors when a custom color pair fails validation.
    return QRCode.toDataURL(value, baseOptions)
  }
}
