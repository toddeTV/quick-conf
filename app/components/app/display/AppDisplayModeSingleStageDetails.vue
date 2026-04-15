<script setup lang="ts">
import type { StageDisplayGroup } from '~/types/display'
import { DateTime } from 'luxon'
import { computeRelativeLabel } from '~/utils/display-time'
import { getTalkTypeStyle } from '~/utils/talk'

const props = defineProps<{
  nextTalksLayout: 'row' | 'column'
  nowISO: string
  stageGroup?: StageDisplayGroup
}>()

const now = computed(() => DateTime.fromISO(props.nowISO))

const upcomingGridStyle = computed(() => {
  const itemCount = props.stageGroup?.upcomingTalks.length ?? 1
  const columns = props.nextTalksLayout === 'column'
    ? 1
    : Math.max(1, itemCount)

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
})

/**
 * Builds a relative time label from ISO start/end strings.
 *
 * @param {string} startISO - Talk start timestamp in ISO format.
 * @param {string} endISO - Talk end timestamp in ISO format.
 * @returns {string} Relative status label, or empty string on invalid input.
 */
function relativeLabel(startISO: string, endISO: string): string {
  return computeRelativeLabel(startISO, endISO, now.value)
}

/**
 * Resolves display label for a talk type slug.
 *
 * @param {string} type - Raw talk type value.
 * @returns {string} Human-readable talk type label.
 */
function talkTypeLabel(type: string): string {
  return getTalkTypeStyle(type).label
}
</script>

<template>
  <div v-if="stageGroup" class="flex h-full min-h-0 flex-col gap-4">
    <UCard class="flex-none" :ui="{ body: 'space-y-3' }">
      <template #header>
        <div class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {{ stageGroup.stageName }}
        </div>
      </template>

      <div
        v-if="stageGroup.primaryTalk"
        class="space-y-3 rounded-lg border border-primary-200 bg-primary-50/80 p-4
          dark:border-primary-800 dark:bg-primary-900/40"
      >
        <div class="text-sm font-semibold text-primary-700 dark:text-primary-200">
          {{ stageGroup.primaryTalk.startClock }}-{{ stageGroup.primaryTalk.endClock }}
          ·
          {{ relativeLabel(stageGroup.primaryTalk.startISO, stageGroup.primaryTalk.endISO) }}
        </div>

        <div
          class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-1
            dark:border-neutral-700 dark:bg-neutral-800"
        >
          <span class="text-xs font-medium text-neutral-800 dark:text-neutral-100">
            {{ talkTypeLabel(stageGroup.primaryTalk.talkType) }}
          </span>
        </div>

        <div class="text-3xl font-bold text-neutral-900 dark:text-white">
          {{ stageGroup.primaryTalk.title }}
        </div>

        <p class="line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
          {{ stageGroup.primaryTalk.description }}
        </p>

        <AppDisplayTalkSpeakers :speakers="stageGroup.primaryTalk.speakers" />
      </div>

      <div v-else class="text-sm text-neutral-500 dark:text-neutral-300">
        This stage is empty for the selected day.
      </div>
    </UCard>

    <div class="grid gap-3" :style="upcomingGridStyle">
      <UCard
        v-for="talk in stageGroup.upcomingTalks"
        :key="talk.slug"
        class="border border-neutral-200 dark:border-neutral-700"
        variant="subtle"
      >
        <div class="space-y-2">
          <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {{ talk.startClock }}-{{ talk.endClock }} ·
            {{ relativeLabel(talk.startISO, talk.endISO) }}
          </div>

          <div
            class="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-1
              dark:border-neutral-700 dark:bg-neutral-800"
          >
            <span class="text-xs font-medium text-neutral-800 dark:text-neutral-100">
              {{ talkTypeLabel(talk.talkType) }}
            </span>
          </div>

          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {{ talk.title }}
          </div>

          <AppDisplayTalkSpeakers :speakers="talk.speakers" />
        </div>
      </UCard>
    </div>
  </div>

  <div
    v-else
    class="rounded-lg border border-dashed border-neutral-300 p-4 text-sm text-neutral-500
      dark:border-neutral-700 dark:text-neutral-300"
  >
    No stage selected.
  </div>
</template>
