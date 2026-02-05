<script setup lang="ts">
import type { StagesCollectionItem } from '@nuxt/content'
import type { ProcessedTalkType } from '~/types/schedule'
import { HEADER_HEIGHT, HOUR_HEIGHT } from '~/composables/useSchedule'
import { formatHour } from '~/utils/date'

defineProps<{
  stages: StagesCollectionItem[]
  timeSlots: number[]
  currentTimeLineStyle: Record<string, string | undefined>
  getTalkStyle: (talk: ProcessedTalkType) => { top: string, height: string }
  getTalksForStage: (stageSlug: string) => ProcessedTalkType[]
}>()

const { public: { demoMode } } = useRuntimeConfig()
</script>

<template>
  <div
    class="relative flex rounded-xl border border-gray-200
      bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
    :class="stages.length === 1 ? 'max-w-3xl mx-auto' : ''"
  >
    <!-- Time Axis (Sticky Left) -->
    <div
      class="sticky left-0 z-30 min-w-15 flex-none border-r border-gray-200 bg-gray-50
      dark:border-gray-800 dark:bg-gray-800/95 backdrop-blur rounded-l-xl"
    >
      <!-- Header Spacer -->
      <div
        class="sticky top-0 z-40 border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800
          rounded-tl-xl"
        :style="{ height: `${HEADER_HEIGHT}px` }"
      />

      <!-- Current Time Label (red "now" line) -->
      <div
        v-if="currentTimeLineStyle.display !== 'none'"
        class="pointer-events-none absolute right-0 z-50 -mt-3 pr-0 text-right"
        :style="currentTimeLineStyle"
      >
        <span class="rounded bg-red-500 px-1.5 py-0.5 text-xs font-bold leading-none text-white">
          now
        </span>
      </div>

      <!-- Time Labels -->
      <div
        v-for="h in timeSlots"
        :key="h"
        class="relative border-b border-gray-200 dark:border-gray-800 last:rounded-bl-xl first:rounded-tl-xl"
        :style="{ height: `${HOUR_HEIGHT}px` }"
      >
        <span class="absolute right-2 -top-3 text-xs font-mono text-gray-500 dark:text-gray-400">
          {{ formatHour(h) }}
        </span>
      </div>
    </div>

    <!-- Stages Container (Scrollable Horizontally) -->
    <div class="relative flex flex-1 min-w-0 overflow-x-auto">
      <!-- Current Time Line -->
      <div
        v-if="currentTimeLineStyle.display !== 'none'"
        class="pointer-events-none absolute inset-x-0 z-50 border-t-2 border-red-500 shadow-sm"
        :style="currentTimeLineStyle"
      >
        <div
          v-if="demoMode"
          class="absolute right-3 top-0 z-10 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap
            rounded-full border border-red-200 bg-red-50/90 px-3 py-1 text-xs font-semibold
            text-red-600 shadow-sm backdrop-blur dark:border-red-900/50 dark:bg-red-950/80 dark:text-red-400"
        >
          <UIcon class="size-3.5" name="i-lucide-flask-conical" />
          <span>Demo Time</span>
        </div>
      </div>

      <div
        v-for="stage in stages"
        :key="stage.slug"
        class="relative shrink-0 border-r border-gray-200 last:border-r-0 dark:border-gray-800 max-w-2xl"
        :class="stages.length > 1
          ? 'w-[60vw] flex-none md:w-auto md:flex-1 md:min-w-60'
          : 'w-full flex-none md:w-auto md:flex-1'"
      >
        <!-- Stage Header (Sticky Top) -->
        <div
          class="sticky top-0 z-20 flex items-center justify-center border-b border-gray-200 bg-white/95 px-2
            text-center font-bold text-gray-900 backdrop-blur dark:border-gray-800
            dark:bg-gray-900/95 dark:text-white"
          :style="{ height: `${HEADER_HEIGHT}px` }"
        >
          {{ stage.name }}
        </div>

        <!-- Talks Container -->
        <div class="relative w-full">
          <!-- Grid Lines -->
          <div
            v-for="h in timeSlots"
            :key="`grid-${h}`"
            class="w-full border-b border-gray-100 dark:border-gray-800/50"
            :style="{ height: `${HOUR_HEIGHT}px` }"
          />

          <!-- Talk Cards -->
          <AppScheduleTalkCard
            v-for="talk in getTalksForStage(stage.slug)"
            :key="talk.slug"
            :style="getTalkStyle(talk)"
            :talk="talk"
          />
        </div>
      </div>
    </div>
  </div>
</template>
