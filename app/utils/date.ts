import { DateTime } from 'luxon'

export function formatDateReadable(iso: string) {
  if (!iso) {
    return ''
  }
  const dt = DateTime.fromISO(iso)
  if (!dt.isValid) {
    return ''
  }
  return dt.toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatHour(h: number) {
  const dayOffset = Math.floor(h / 24)
  const hourOfDay = h % 24
  const formattedHour = `${hourOfDay.toString().padStart(2, '0')}:00`
  return dayOffset > 0 ? `${formattedHour} (+${dayOffset}d)` : formattedHour
}
