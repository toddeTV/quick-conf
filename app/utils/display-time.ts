import { DateTime } from 'luxon'

/**
 * Formats a DateTime into a 24-hour clock label.
 *
 * @param {DateTime} value - The DateTime value to format.
 * @returns {string} The formatted clock string in HH:mm format.
 *
 * @example
 * ```ts
 * const label = formatClockLabel(DateTime.fromISO('2026-04-15T09:30:00Z'))
 * // => '09:30'
 * ```
 */
export function formatClockLabel(value: DateTime): string {
  return value.toFormat('HH:mm')
}

/**
 * Converts a minute amount into a readable hour-minute label.
 *
 * @param {number} totalMinutes - Total minutes to format.
 * @returns {string} A label in {hours}h {minutes}m format.
 */
function formatHourMinuteLabel(totalMinutes: number): string {
  const safeMinutes = Math.max(0, totalMinutes)
  const hours = Math.floor(safeMinutes / 60)
  const minutes = safeMinutes % 60

  return `${hours}h ${minutes}m`
}

/**
 * Creates a relative status label between now, start, and end timestamps.
 *
 * @param {DateTime} start - Start timestamp of the talk.
 * @param {DateTime} end - End timestamp of the talk.
 * @param {DateTime} now - Current timestamp used for the comparison.
 * @returns {string} A label for upcoming, active, or finished state.
 *
 * @example
 * ```ts
 * const label = formatRelativeLabel(start, end, now)
 * // => 'starts in 1h 10m'
 * ```
 */
export function formatRelativeLabel(start: DateTime, end: DateTime, now: DateTime): string {
  if (now < start) {
    const minutesUntil = Math.max(0, Math.ceil(start.diff(now, 'minutes').minutes ?? 0))
    return `starts in ${formatHourMinuteLabel(minutesUntil)}`
  }

  if (now >= start && now < end) {
    const minutesLeft = Math.max(0, Math.ceil(end.diff(now, 'minutes').minutes ?? 0))
    return `ends in ${formatHourMinuteLabel(minutesLeft)}`
  }

  return 'finished'
}

/**
 * Parses ISO timestamps and returns a relative status label.
 *
 * @param {string} startISO - Talk start timestamp in ISO format.
 * @param {string} endISO - Talk end timestamp in ISO format.
 * @param {DateTime} now - Current timestamp used for the comparison.
 * @returns {string} A label for upcoming, active, or finished state.
 */
export function computeRelativeLabel(startISO: string, endISO: string, now: DateTime): string {
  const start = DateTime.fromISO(startISO)
  const end = DateTime.fromISO(endISO)

  if (!start.isValid || !end.isValid || !now.isValid) {
    return ''
  }

  return formatRelativeLabel(start, end, now)
}

/**
 * Formats a clock range from start to end.
 *
 * @param {DateTime} start - Range start timestamp.
 * @param {DateTime} end - Range end timestamp.
 * @returns {string} A range string in HH:mm-HH:mm format.
 *
 * @example
 * ```ts
 * const range = formatClockRange(start, end)
 * // => '09:30-10:15'
 * ```
 */
export function formatClockRange(start: DateTime, end: DateTime): string {
  return `${formatClockLabel(start)}-${formatClockLabel(end)}`
}
