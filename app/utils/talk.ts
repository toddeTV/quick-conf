export interface TalkTypeStyle {
  label: string
  card: string
  text: string
  legend: string
}

export const talkTypeStyles: Record<string, TalkTypeStyle> = {
  'keynote': {
    label: 'Keynote',
    card: 'border-rose-200 bg-rose-100/90 dark:border-rose-800 dark:bg-rose-900/90 '
      + 'hover:border-rose-500 dark:hover:border-rose-400',
    text: 'text-rose-700 dark:text-rose-300',
    legend: 'bg-rose-100 dark:bg-rose-900 ring-rose-200 dark:ring-rose-800',
  },
  'workshop': {
    label: 'Workshop',
    card: 'border-teal-200 bg-teal-100/90 dark:border-teal-800 dark:bg-teal-900/90 '
      + 'hover:border-teal-500 dark:hover:border-teal-400',
    text: 'text-teal-700 dark:text-teal-300',
    legend: 'bg-teal-100 dark:bg-teal-900 ring-teal-200 dark:ring-teal-800',
  },
  'lightning-talk': {
    label: 'Lightning Talk',
    card: 'border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-900/40 '
      + 'hover:border-amber-500 dark:hover:border-amber-400',
    text: 'text-amber-700 dark:text-amber-300',
    legend: 'bg-amber-100 dark:bg-amber-900 ring-amber-200 dark:ring-amber-800',
  },
  'panel': {
    label: 'Panel',
    card: 'border-fuchsia-200 bg-fuchsia-100/90 dark:border-fuchsia-800 dark:bg-fuchsia-900/90 '
      + 'hover:border-fuchsia-500 dark:hover:border-fuchsia-400',
    text: 'text-fuchsia-700 dark:text-fuchsia-300',
    legend: 'bg-fuchsia-100 dark:bg-fuchsia-900 ring-fuchsia-200 dark:ring-fuchsia-800',
  },
  'other': {
    label: 'Other',
    card: 'border-gray-200 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/90 '
      + 'hover:border-gray-400 dark:hover:border-gray-500',
    text: 'text-gray-700 dark:text-gray-300',
    legend: 'bg-gray-100 dark:bg-gray-800 ring-gray-200 dark:ring-gray-700',
  },
  'talk': {
    label: 'Talk',
    card: 'border-primary-200 bg-primary-100/90 dark:border-primary-800 dark:bg-primary-900/90 '
      + 'hover:border-primary-500 dark:hover:border-primary-400',
    text: 'text-primary-700 dark:text-primary-300',
    legend: 'bg-primary-100 dark:bg-primary-900 ring-primary-200 dark:ring-primary-800',
  },
}

export function getTalkTypeStyle(type: string): TalkTypeStyle {
  return talkTypeStyles[type] ?? talkTypeStyles.talk!
}
