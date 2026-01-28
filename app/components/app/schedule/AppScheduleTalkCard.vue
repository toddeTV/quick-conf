<script setup lang="ts">
import type { ProcessedTalkType } from '~/pages/schedule.vue'

const props = defineProps<{
  talk: ProcessedTalkType
}>()

const timeInfo = computed(() => {
  const start = new Date(props.talk.dateTime)
  const h = start.getHours().toString().padStart(2, '0')
  const m = start.getMinutes().toString().padStart(2, '0')
  return `${h}:${m} • ${props.talk.duration} min`
})

const typeFormatted = computed(() => {
  return props.talk.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

const typeConfig = computed(() => {
  switch (props.talk.type) {
    case 'keynote':
      return {
        card: 'border-fuchsia-200 bg-fuchsia-100/90 dark:border-fuchsia-800 dark:bg-fuchsia-900/90 '
          + 'hover:border-fuchsia-500 dark:hover:border-fuchsia-400',
        text: 'text-fuchsia-700 dark:text-fuchsia-300',
      }
    case 'workshop':
      return {
        card: 'border-teal-200 bg-teal-100/90 dark:border-teal-800 dark:bg-teal-900/90 '
          + 'hover:border-teal-500 dark:hover:border-teal-400',
        text: 'text-teal-700 dark:text-teal-300',
      }
    case 'lightning-talk':
      return {
        card: 'border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-900/40 '
          + 'hover:border-amber-500 dark:hover:border-amber-400',
        text: 'text-amber-700 dark:text-amber-300',
      }
    case 'panel':
      return {
        card: 'border-indigo-200 bg-indigo-100/90 dark:border-indigo-800 dark:bg-indigo-900/90 '
          + 'hover:border-indigo-500 dark:hover:border-indigo-400',
        text: 'text-indigo-700 dark:text-indigo-300',
      }
    case 'other':
      return {
        card: 'border-gray-200 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/90 '
          + 'hover:border-gray-400 dark:hover:border-gray-500',
        text: 'text-gray-700 dark:text-gray-300',
      }
    case 'talk':
    default:
      return {
        card: 'border-primary-200 bg-primary-100/90 dark:border-primary-800 dark:bg-primary-900/90 '
          + 'hover:border-primary-500 dark:hover:border-primary-400',
        text: 'text-primary-700 dark:text-primary-300',
      }
  }
})
</script>

<template>
  <ULink
    class="group absolute inset-x-1 flex flex-col overflow-hidden rounded-md border
      p-2 text-xs transition-all hover:z-20 hover:shadow-md"
    :class="typeConfig.card"
    :to="`/talks/${talk.slug}`"
  >
    <div class="mb-0.5 font-medium leading-tight text-gray-900 dark:text-gray-100">
      {{ talk.title }}
    </div>

    <div class="mb-0.5 text-[10px] font-bold uppercase tracking-wider opacity-80" :class="typeConfig.text">
      {{ typeFormatted }}
    </div>

    <div class="mb-1 text-[10px] font-medium opacity-70" :class="typeConfig.text">
      {{ timeInfo }}
    </div>

    <div v-if="talk.speakers?.length" class="mt-1 flex flex-col gap-1">
      <div v-for="speaker in talk.speakers" :key="speaker.slug" class="flex items-center gap-1.5">
        <NuxtImg
          :alt="speaker.name"
          class="h-5 w-5 rounded-full object-cover ring-1 ring-white dark:ring-gray-900"
          height="20"
          :src="speaker.image"
          width="20"
        />
        <span class="truncate text-[11px] leading-tight text-gray-700 dark:text-gray-300">
          {{ speaker.name }}
        </span>
      </div>
    </div>
  </ULink>
</template>
