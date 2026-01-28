import { DateTime } from 'luxon'

export function formatDateReadable(iso: string) {
  if (!iso) {
    return ''
  }
  return DateTime.fromISO(iso).toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatHour(h: number) {
  return `${h.toString().padStart(2, '0')}:00`
}
