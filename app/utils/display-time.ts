import type { DateTime } from 'luxon'

export function formatClockLabel(value: DateTime): string {
  return value.toFormat('HH:mm')
}

function formatHourMinuteLabel(totalMinutes: number): string {
  const safeMinutes = Math.max(0, totalMinutes)
  const hours = Math.floor(safeMinutes / 60)
  const minutes = safeMinutes % 60

  return `${hours}h ${minutes}m`
}

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

export function formatClockRange(start: DateTime, end: DateTime): string {
  return `${formatClockLabel(start)}-${formatClockLabel(end)}`
}
