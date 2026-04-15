import type { LocationQuery, LocationQueryRaw, LocationQueryValue } from 'vue-router'
import type { DisplaySettings } from '~/types/display'

const VALID_DAY_MODE = ['auto', 'manual'] as const
const VALID_DISPLAY_MODE = ['timetable', 'all-details', 'stage-details'] as const
const VALID_NEXT_TALKS_LAYOUT = ['row', 'column'] as const
const VALID_QR_CODE_STYLE = [
  'black-on-white',
  'white-on-black',
  'black-on-transparent',
  'white-on-transparent',
] as const
const VALID_SCREEN_ORIENTATION = ['horizontal', 'vertical'] as const
const VALID_SPONSOR_MODE = ['off', 'all', 'rotate'] as const
const VALID_THEME_MODE = ['site', 'light', 'dark'] as const
const SUPPORTED_DISPLAY_QUERY_KEYS = [
  'cols',
  'day',
  'dayMode',
  'mode',
  'next',
  'nextLayout',
  'orientation',
  'qr',
  'refresh',
  'scale',
  'sponsorCols',
  'sponsors',
  'stage',
  'theme',
] as const

export const DISPLAY_DEFAULTS: DisplaySettings = {
  dayMode: 'auto',
  layoutColumns: 0,
  mode: 'all-details',
  nextTalksLayout: 'row',
  qrCodeStyle: 'black-on-white',
  nextTalksCount: 3,
  refreshSeconds: 120,
  scaleFactor: 1,
  screenOrientation: 'horizontal',
  sponsorColumns: 0,
  sponsorMode: 'all',
  themeMode: 'site',
}

function firstQueryValue(input?: LocationQueryValue | LocationQueryValue[]): string | undefined {
  if (Array.isArray(input)) {
    return typeof input[0] === 'string' ? input[0] : undefined
  }

  if (typeof input === 'string') {
    return input
  }

  return undefined
}

function isValidDayISO(value?: string): boolean {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value))
}

function parseStringEnum<T extends string>(
  value: string | undefined,
  validValues: readonly T[],
  fallback: T,
): T {
  if (value && validValues.includes(value as T)) {
    return value as T
  }

  return fallback
}

function parseScaleFactor(value: string | undefined): number {
  const parsed = Number.parseFloat(value ?? '')

  if (Number.isNaN(parsed)) {
    return DISPLAY_DEFAULTS.scaleFactor
  }

  return Math.min(1.8, Math.max(0.75, Number.parseFloat(parsed.toFixed(2))))
}

function parseRefreshSeconds(value: string | undefined): DisplaySettings['refreshSeconds'] {
  if (value === '60' || value === '120' || value === '300') {
    return Number.parseInt(value, 10) as DisplaySettings['refreshSeconds']
  }

  return DISPLAY_DEFAULTS.refreshSeconds
}

function parseLayoutColumns(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    return DISPLAY_DEFAULTS.layoutColumns
  }

  return Math.min(999, parsed)
}

function parseSponsorColumns(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    return DISPLAY_DEFAULTS.sponsorColumns
  }

  return Math.min(6, parsed)
}

function parseNextTalksCount(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed)) {
    return DISPLAY_DEFAULTS.nextTalksCount
  }

  return Math.min(12, Math.max(1, parsed))
}

export function parseDisplaySettingsFromQuery(query: LocationQuery): DisplaySettings {
  const dayISO = firstQueryValue(query.day)
  const selectedStageSlug = firstQueryValue(query.stage)

  return {
    dayISO: isValidDayISO(dayISO) ? dayISO : undefined,
    dayMode: parseStringEnum(firstQueryValue(query.dayMode), VALID_DAY_MODE, DISPLAY_DEFAULTS.dayMode),
    layoutColumns: parseLayoutColumns(firstQueryValue(query.cols)),
    mode: parseStringEnum(firstQueryValue(query.mode), VALID_DISPLAY_MODE, DISPLAY_DEFAULTS.mode),
    nextTalksLayout: parseStringEnum(
      firstQueryValue(query.nextLayout),
      VALID_NEXT_TALKS_LAYOUT,
      DISPLAY_DEFAULTS.nextTalksLayout,
    ),
    qrCodeStyle: parseStringEnum(firstQueryValue(query.qr), VALID_QR_CODE_STYLE, DISPLAY_DEFAULTS.qrCodeStyle),
    nextTalksCount: parseNextTalksCount(firstQueryValue(query.next)),
    refreshSeconds: parseRefreshSeconds(firstQueryValue(query.refresh)),
    scaleFactor: parseScaleFactor(firstQueryValue(query.scale)),
    screenOrientation: parseStringEnum(
      firstQueryValue(query.orientation),
      VALID_SCREEN_ORIENTATION,
      DISPLAY_DEFAULTS.screenOrientation,
    ),
    selectedStageSlug: selectedStageSlug || undefined,
    sponsorColumns: parseSponsorColumns(firstQueryValue(query.sponsorCols)),
    sponsorMode: parseStringEnum(firstQueryValue(query.sponsors), VALID_SPONSOR_MODE, DISPLAY_DEFAULTS.sponsorMode),
    themeMode: parseStringEnum(firstQueryValue(query.theme), VALID_THEME_MODE, DISPLAY_DEFAULTS.themeMode),
  }
}

export function getUnsupportedDisplayQueryKeys(query: LocationQuery): string[] {
  const supportedKeys = new Set<string>(SUPPORTED_DISPLAY_QUERY_KEYS)

  return Object.keys(query).filter(key => !supportedKeys.has(key))
}

export function serializeDisplaySettingsToQuery(settings: DisplaySettings): LocationQueryRaw {
  return {
    cols: String(settings.layoutColumns),
    day: settings.dayISO || undefined,
    dayMode: settings.dayMode,
    mode: settings.mode,
    next: String(settings.nextTalksCount),
    nextLayout: settings.nextTalksLayout,
    qr: settings.qrCodeStyle,
    orientation: settings.screenOrientation,
    refresh: String(settings.refreshSeconds),
    scale: settings.scaleFactor.toFixed(2),
    sponsorCols: String(settings.sponsorColumns),
    sponsors: settings.sponsorMode,
    stage: settings.selectedStageSlug || undefined,
    theme: settings.themeMode,
  }
}

export function areDisplaySettingsEqual(a: DisplaySettings, b: DisplaySettings): boolean {
  return (
    a.dayISO === b.dayISO
    && a.dayMode === b.dayMode
    && a.layoutColumns === b.layoutColumns
    && a.mode === b.mode
    && a.nextTalksLayout === b.nextTalksLayout
    && a.qrCodeStyle === b.qrCodeStyle
    && a.nextTalksCount === b.nextTalksCount
    && a.refreshSeconds === b.refreshSeconds
    && a.scaleFactor === b.scaleFactor
    && a.screenOrientation === b.screenOrientation
    && a.selectedStageSlug === b.selectedStageSlug
    && a.sponsorColumns === b.sponsorColumns
    && a.sponsorMode === b.sponsorMode
    && a.themeMode === b.themeMode
  )
}
