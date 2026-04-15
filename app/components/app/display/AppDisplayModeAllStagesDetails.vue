<script setup lang="ts">
import type { StageDisplayGroup } from '~/types/display'
import { DateTime } from 'luxon'
import { formatRelativeLabel } from '~/utils/display-time'

const props = defineProps<{
  gridColumns: number
  nextTalksLayout: 'row' | 'column'
  nowISO: string
  orientation: 'horizontal' | 'vertical'
  stageGroups: StageDisplayGroup[]
}>()

const now = computed(() => DateTime.fromISO(props.nowISO))

const defaultStageColumns = computed(() => {
  if (props.orientation === 'vertical') {
    return 1
  }

  return 2
})

/**
 * Resolves the stage column count for the all-stage details layout.
 *
 * @param {number} itemCount - Number of stage groups to render.
 * @param {number} fallback - Default column count when no forced grid is set.
 * @returns {number} Final bounded column count.
 */
function resolveColumnCount(itemCount: number, fallback: number): number {
  const boundedItems = Math.max(1, itemCount)

  if (props.gridColumns > 0) {
    return Math.min(Math.trunc(props.gridColumns), boundedItems)
  }

  return Math.min(fallback, boundedItems)
}

const rootStyle = computed(() => {
  const columns = resolveColumnCount(props.stageGroups.length, defaultStageColumns.value)

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
})

/**
 * Creates grid style for upcoming talk cards.
 *
 * @param {number} itemCount - Number of upcoming talks in the stage group.
 * @returns {Record<string, string>} Grid style object for template binding.
 */
function upcomingGridStyle(itemCount: number): Record<string, string> {
  // Row mode expands horizontally to keep each upcoming card visible at once.
  const columns = props.nextTalksLayout === 'column'
    ? 1
    : Math.max(1, itemCount)

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
}

/**
 * Builds a relative time label from ISO start/end strings.
 *
 * @param {string} startISO - Talk start timestamp in ISO format.
 * @param {string} endISO - Talk end timestamp in ISO format.
 * @returns {string} Relative status label, or empty string on invalid input.
 */
function relativeLabel(startISO: string, endISO: string): string {
  const start = DateTime.fromISO(startISO)
  const end = DateTime.fromISO(endISO)

  if (!start.isValid || !end.isValid || !now.value.isValid) {
    return ''
  }

  return formatRelativeLabel(start, end, now.value)
}
</script>

<template>
  <div class="grid gap-4" :style="rootStyle">
    <UCard v-for="group in stageGroups" :key="group.stageSlug" :ui="{ body: 'space-y-3' }">
      <template #header>
        <div class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {{ group.stageName }}
        </div>
      </template>

      <div
        v-if="group.primaryTalk"
        class="space-y-2 rounded-lg border border-primary-200 bg-primary-50/80 p-4
          dark:border-primary-800 dark:bg-primary-900/40"
      >
        <div class="text-sm font-semibold text-primary-700 dark:text-primary-200">
          {{ group.primaryTalk.startClock }}-{{ group.primaryTalk.endClock }}
          ·
          {{ relativeLabel(group.primaryTalk.startISO, group.primaryTalk.endISO) }}
        </div>

        <div class="text-xs font-semibold uppercase tracking-wide text-primary-700/80 dark:text-primary-200/80">
          {{ group.primaryTalk.talkType }}
        </div>

        <div class="text-xl font-bold text-neutral-900 dark:text-white">
          {{ group.primaryTalk.title }}
        </div>

        <p class="line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
          {{ group.primaryTalk.description }}
        </p>

        <AppDisplayTalkSpeakers :speakers="group.primaryTalk.speakers" />
      </div>

      <div
        v-else
        class="rounded-lg border border-dashed border-neutral-300 p-4 text-sm text-neutral-500
          dark:border-neutral-700 dark:text-neutral-300"
      >
        No upcoming talks for this stage.
      </div>

      <div class="grid gap-2" :style="upcomingGridStyle(group.upcomingTalks.length)">
        <UCard
          v-for="talk in group.upcomingTalks"
          :key="talk.slug"
          class="border border-neutral-200 dark:border-neutral-700"
          variant="subtle"
        >
          <div class="space-y-2">
            <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {{ talk.startClock }}-{{ talk.endClock }} ·
              {{ relativeLabel(talk.startISO, talk.endISO) }}
            </div>

            <div class="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {{ talk.talkType }}
            </div>

            <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {{ talk.title }}
            </div>

            <AppDisplayTalkSpeakers :speakers="talk.speakers" />
          </div>
        </UCard>
      </div>
    </UCard>
  </div>
</template>
