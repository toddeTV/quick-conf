<script setup lang="ts">
import type { ProcessedTalkType } from '~/types/schedule'

const props = defineProps<{
  talk: ProcessedTalkType
}>()

const timeInfo = computed(() => {
  return `${props.talk.start.toFormat('HH:mm')} • ${props.talk.duration} min`
})

const typeFormatted = computed(() => {
  return props.talk.type.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

const typeConfig = computed(() => getTalkTypeStyle(props.talk.type))
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
