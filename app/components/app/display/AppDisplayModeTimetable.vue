<script setup lang="ts">
import type { StagesCollectionItem } from '@nuxt/content'
import type { ProcessedTalkType } from '~/types/schedule'

const props = defineProps<{
  currentTimeLineStyle: Record<string, string | undefined>
  getTalkStyle: (talk: ProcessedTalkType) => { height: string, top: string }
  getTalksForStage: (stageSlug: string) => ProcessedTalkType[]
  gridColumns: number
  orientation: 'horizontal' | 'vertical'
  stages: StagesCollectionItem[]
  timeSlots: number[]
}>()

const scrollViewportRef = ref<HTMLDivElement | null>(null)

const nowLineTopPx = computed<number | null>(() => {
  const top = props.currentTimeLineStyle.top

  if (typeof top !== 'string') {
    return null
  }

  const parsedTop = Number.parseFloat(top)
  return Number.isFinite(parsedTop) ? parsedTop : null
})

/**
 * Scrolls the timetable viewport so the current time line sits near the center.
 *
 * @returns {void}
 */
function centerNowLine() {
  const viewport = scrollViewportRef.value
  const nowTop = nowLineTopPx.value

  if (!viewport || nowTop === null) {
    return
  }

  const maxScrollTop = viewport.scrollHeight - viewport.clientHeight
  if (maxScrollTop <= 0) {
    return
  }

  // Centering the now line improves readability for continuously running displays.
  const target = nowTop - viewport.clientHeight / 2
  viewport.scrollTop = Math.min(maxScrollTop, Math.max(0, target))
}

watch([
  nowLineTopPx,
  () => props.orientation,
  () => props.gridColumns,
  () => props.stages.length,
  () => props.timeSlots.length,
], () => {
  nextTick(() => {
    centerNowLine()
  })
}, {
  immediate: true,
})

/**
 * Handles resize events by recalculating viewport scroll position.
 *
 * @returns {void}
 */
function onWindowResize() {
  centerNowLine()
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <div ref="scrollViewportRef" class="h-full min-h-0 overflow-auto">
    <AppScheduleGrid
      :current-time-line-style="currentTimeLineStyle"
      :get-talk-style="getTalkStyle"
      :get-talks-for-stage="getTalksForStage"
      :grid-columns="gridColumns"
      :stages="stages"
      :time-slots="timeSlots"
    />
  </div>
</template>
