export type ColorModePolicy = 'both' | 'light-only' | 'dark-only'

interface ColorModeSetting {
  preference: 'system' | 'light' | 'dark'
  fallback: 'light' | 'dark'
}

const defaultColorModePolicy: ColorModePolicy = 'both'

const colorModeSettings: Record<ColorModePolicy, ColorModeSetting> = {
  'both': {
    preference: 'system',
    fallback: 'dark',
  },
  'light-only': {
    preference: 'light',
    fallback: 'light',
  },
  'dark-only': {
    preference: 'dark',
    fallback: 'dark',
  },
}

export function resolveColorModePolicy(policy: unknown): ColorModePolicy {
  if (policy === 'both' || policy === 'light-only' || policy === 'dark-only') {
    return policy
  }

  return defaultColorModePolicy
}

export function getColorModeSetting(policy: unknown): ColorModeSetting {
  return colorModeSettings[resolveColorModePolicy(policy)]
}

export function isColorSwitchable(policy: unknown): boolean {
  return resolveColorModePolicy(policy) === 'both'
}
