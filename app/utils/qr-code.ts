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
    return QRCode.toDataURL(value, baseOptions)
  }
}
