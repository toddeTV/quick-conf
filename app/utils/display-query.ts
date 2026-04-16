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
  refreshSeconds: 300,
  scaleFactor: 1,
  screenOrientation: 'horizontal',
  sponsorColumns: 0,
  sponsorMode: 'all',
  themeMode: 'site',
}

/**
 * Returns the first string value from a query entry.
 *
 * @param {LocationQueryValue | LocationQueryValue[] | undefined} input - Query value from Vue Router.
 * @returns {string | undefined} The first usable string value.
 */
function firstQueryValue(input?: LocationQueryValue | LocationQueryValue[]): string | undefined {
  if (Array.isArray(input)) {
    return input.find((value): value is string => typeof value === 'string')
  }

  if (typeof input === 'string') {
    return input
  }

  return undefined
}

/**
 * Checks if a value matches the display day ISO format.
 *
 * @param {string | undefined} value - Candidate day string.
 * @returns {boolean} True when value matches YYYY-MM-DD.
 */
function isValidDayISO(value?: string): boolean {
  const isoDayMatch = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!isoDayMatch) {
    return false
  }

  const [, yearText = '', monthText = '', dayText = ''] = isoDayMatch
  const year = Number.parseInt(yearText, 10)
  const month = Number.parseInt(monthText, 10)
  const day = Number.parseInt(dayText, 10)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
  )
}

/**
 * Parses a query value into a validated enum member.
 *
 * @template T
 * @param {string | undefined} value - Raw query value.
 * @param {readonly T[]} validValues - Allowed values for the enum.
 * @param {T} fallback - Value used when parsing fails.
 * @returns {T} The validated enum value.
 */
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

/**
 * Parses and clamps the display scale factor.
 *
 * @param {string | undefined} value - Raw scale query value.
 * @returns {number} A value clamped to the supported display scale range.
 */
function parseScaleFactor(value: string | undefined): number {
  const parsed = Number.parseFloat(value ?? '')

  if (Number.isNaN(parsed)) {
    return DISPLAY_DEFAULTS.scaleFactor
  }

  return Math.min(1.8, Math.max(0.75, Number(parsed.toFixed(2))))
}

/**
 * Parses refresh interval seconds from query input.
 *
 * @param {string | undefined} value - Raw refresh interval query value.
 * @returns {DisplaySettings['refreshSeconds']} A supported refresh interval.
 */
function parseRefreshSeconds(value: string | undefined): DisplaySettings['refreshSeconds'] {
  if (value === '60' || value === '120' || value === '300') {
    return Number.parseInt(value, 10) as DisplaySettings['refreshSeconds']
  }

  return DISPLAY_DEFAULTS.refreshSeconds
}

/**
 * Parses and clamps the forced timetable column count.
 *
 * @param {string | undefined} value - Raw column query value.
 * @returns {number} A non-negative column count capped to project bounds.
 */
function parseLayoutColumns(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    return DISPLAY_DEFAULTS.layoutColumns
  }

  return Math.min(999, parsed)
}

/**
 * Parses and clamps sponsor grid column count.
 *
 * @param {string | undefined} value - Raw sponsor column query value.
 * @returns {number} A non-negative sponsor column count capped to project bounds.
 */
function parseSponsorColumns(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    return DISPLAY_DEFAULTS.sponsorColumns
  }

  return Math.min(6, parsed)
}

/**
 * Parses and clamps the number of next talks to display.
 *
 * @param {string | undefined} value - Raw next talks count query value.
 * @returns {number} A next-talk count constrained to supported bounds.
 */
function parseNextTalksCount(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10)

  if (Number.isNaN(parsed)) {
    return DISPLAY_DEFAULTS.nextTalksCount
  }

  return Math.min(12, Math.max(1, parsed))
}

/**
 * Parses display settings from a route query object.
 *
 * @param {LocationQuery} query - The current route query.
 * @returns {DisplaySettings} Parsed display settings with defaults applied.
 *
 * @example
 * ```ts
 * const settings = parseDisplaySettingsFromQuery(route.query)
 * ```
 */
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

/**
 * Finds query keys that are not part of the supported display settings list.
 *
 * @param {LocationQuery} query - The current route query.
 * @returns {string[]} Unsupported query key names.
 *
 * @example
 * ```ts
 * const unsupported = getUnsupportedDisplayQueryKeys(route.query)
 * ```
 */
export function getUnsupportedDisplayQueryKeys(query: LocationQuery): string[] {
  const supportedKeys = new Set<string>(SUPPORTED_DISPLAY_QUERY_KEYS)

  return Object.keys(query).filter(key => !supportedKeys.has(key))
}

/**
 * Serializes display settings into route query parameters.
 *
 * @param {DisplaySettings} settings - The display settings model.
 * @returns {LocationQueryRaw} Query object ready for router updates.
 *
 * @example
 * ```ts
 * const query = serializeDisplaySettingsToQuery(settings)
 * ```
 */
export function serializeDisplaySettingsToQuery(settings: DisplaySettings): LocationQueryRaw {
  // Keep fixed decimal precision so URLs stay stable across repeated updates.
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

/**
 * Compares two display settings objects for semantic equality.
 *
 * @param {DisplaySettings} a - First settings object.
 * @param {DisplaySettings} b - Second settings object.
 * @returns {boolean} True when all supported settings match.
 *
 * @example
 * ```ts
 * const same = areDisplaySettingsEqual(currentSettings, nextSettings)
 * ```
 */
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
