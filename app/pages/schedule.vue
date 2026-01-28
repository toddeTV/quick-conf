<script setup lang="ts">
import type { SpeakersCollectionItem, StagesCollectionItem, TalksCollectionItem } from '@nuxt/content'

const route = useRoute()
const router = useRouter()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

// --- Data Fetching ---
const [
  { data: stages },
  { data: speakers },
  { data: talks },
] = await Promise.all([
  useAsyncData(`${route.path}-stages`, () => queryCollection('stages').all()),
  useAsyncData(`${route.path}-speakers`, () => queryCollection('speakers').all()),
  useAsyncData(`${route.path}-talks`, () => queryCollection('talks').order('dateTime', 'ASC').all()),
])

// --- Types ---
export type ProcessedTalkType = Omit<TalksCollectionItem, 'speakers' | 'stage'> & {
  speakers: SpeakersCollectionItem[]
  stage: StagesCollectionItem | undefined
  start: Date
  end: Date
}

// --- Data Processing ---
const processedTalks = computed<ProcessedTalkType[]>(() => {
  if (!talks.value || !stages.value || !speakers.value) {
    return []
  }

  return talks.value.map((talk) => {
    const speakers_hit = speakers.value?.filter(speaker => talk.speakers?.includes(speaker.slug)) ?? []
    const stage_hit = stages.value?.find(stage => stage.slug === talk.stage)
    const start = new Date(talk.dateTime)
    const end = new Date(start.getTime() + talk.duration * 60 * 1000)

    return {
      ...talk,
      speakers: speakers_hit,
      stage: stage_hit,
      start,
      end,
    }
  })
})

const availableDays = computed(() => {
  const days = new Set<string>()
  processedTalks.value.forEach((t) => {
    const day = t.start.toISOString().split('T')[0]
    if (day) {
      days.add(day)
    }
  })
  return Array.from(days).sort()
})

const availableTalkTypes = computed(() => {
  const presentTypes = Array.from(new Set<string>(processedTalks.value.map(t => t.type)))
  return presentTypes.map((type) => {
    const style = getTalkTypeStyle(type)
    return {
      value: type,
      label: style.label,
      color: style.legend,
    }
  })
})

// --- State ---
// Ensure query.day is valid
const activeDayISO = computed({
  get: () => {
    const q = route.query.day as string
    if (availableDays.value.includes(q)) {
      return q
    }
    return availableDays.value[0] || new Date().toISOString().split('T')[0]
  },
  set: (val) => {
    router.replace({ query: { ...route.query, day: val } })
  },
})

// Watch query mismatch to auto-correct URL
watch(() => route.query.day, (newVal) => {
  if (availableDays.value.length > 0 && (!newVal || !availableDays.value.includes(newVal as string))) {
    router.replace({ query: { ...route.query, day: availableDays.value[0] } })
  }
}, {
  immediate: true,
})

const activeTalks = computed(() => {
  return processedTalks.value.filter(t => t.start.toISOString().split('T')[0] === activeDayISO.value)
})

const timeRange = computed(() => {
  if (activeTalks.value.length === 0) {
    return { start: 9, end: 17 }
  }

  let minH = 24
  let maxH = 0

  activeTalks.value.forEach((t) => {
    const s = t.start.getHours()
    // For end, if minutes > 0, round up next hour
    let e = t.end.getHours()
    // Handle midnight crossing
    if (t.end.getDate() !== t.start.getDate()) {
      e += 24
    }
    if (t.end.getMinutes() > 0)
      e += 1

    if (s < minH)
      minH = s
    if (e > maxH)
      maxH = e
  })

  // Padding
  return {
    start: Math.max(0, minH - 1),
    // Allow up to 26 hours (2am next day) for late night events
    end: Math.min(26, maxH + 1),
  }
})

const timeSlots = computed(() => {
  const slots: number[] = []
  for (let i = timeRange.value.start; i < timeRange.value.end; i++) {
    slots.push(i)
  }
  return slots
})

// --- Helper Functions ---
const HOUR_HEIGHT = 160 // px per hour (generous space for content)
const HEADER_HEIGHT = 48 // px

function formatDateReadable(iso: string) {
  if (!iso) {
    return ''
  }
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function formatHour(h: number) {
  return `${h.toString().padStart(2, '0')}:00`
}

function getTalkStyle(talk: ProcessedTalkType) {
  const startHour = talk.start.getHours()
  const startMin = talk.start.getMinutes()

  // Calculate minutes from start of day view
  const startOffsetMinutes = (startHour - timeRange.value.start) * 60 + startMin

  // Position
  const top = (startOffsetMinutes / 60) * HOUR_HEIGHT
  const height = (talk.duration / 60) * HOUR_HEIGHT

  return {
    top: `${top}px`,
    height: `${height}px`,
  }
}

function getTalksForStage(stageSlug: string) {
  return activeTalks.value.filter(t => t.stage?.slug === stageSlug)
}

// --- SEO ---
const seoMetadata = extractSeoMetadata({
  title: 'Schedule',
  description: `Conference schedule for ${activeDayISO.value}`,
})
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <UContainer class="pt-3 pb-8">
    <UBreadcrumb
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Schedule' },
      ]"
    />

    <UPageHeader
      description="List of talks for the event with time, speaker and stage information."
      title="Schedule"
    />

    <!-- Day Selector -->
    <div v-if="availableDays.length > 0" class="mb-6 flex flex-wrap gap-2">
      <template v-if="availableDays.length > 1">
        <UButton
          v-for="day in availableDays"
          :key="day"
          color="neutral"
          :label="formatDateReadable(day)"
          size="lg"
          :variant="activeDayISO === day ? 'subtle' : 'ghost'"
          @click="activeDayISO = day"
        />
      </template>
      <div v-else class="text-lg font-medium text-gray-900 dark:text-white">
        {{ formatDateReadable(availableDays[0]!) }}
      </div>
    </div>

    <div v-if="stages && timeSlots.length">
      <!-- Schedule Grid -->
      <div
        class="relative flex overflow-x-auto overflow-y-hidden rounded-xl border border-gray-200
          bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        :class="stages.length === 1 ? 'max-w-3xl mx-auto' : ''"
      >
        <!-- Time Axis (Sticky Left) -->
        <div
          class="sticky left-0 z-30 min-w-15 flex-none border-r border-gray-200 bg-gray-50
          dark:border-gray-800 dark:bg-gray-800/95 backdrop-blur"
        >
          <!-- Header Spacer -->
          <div
            class="sticky top-0 z-40 border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800"
            :style="{ height: `${HEADER_HEIGHT}px` }"
          />

          <!-- Time Labels -->
          <div
            v-for="h in timeSlots"
            :key="h"
            class="relative border-b border-gray-200 dark:border-gray-800"
            :style="{ height: `${HOUR_HEIGHT}px` }"
          >
            <span class="absolute right-2 -top-3 text-xs font-mono text-gray-500 dark:text-gray-400">
              {{ formatHour(h) }}
            </span>
          </div>
        </div>

        <!-- Stages Container (Scrollable Horizontally) -->
        <div class="flex flex-1 min-w-0">
          <div
            v-for="stage in stages"
            :key="stage.slug"
            class="relative shrink-0 border-r border-gray-200 last:border-r-0 dark:border-gray-800 max-w-2xl"
            :class="stages.length > 1
              ? 'w-[80vw] flex-none md:w-auto md:flex-1 md:min-w-80'
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
                :speakers="talk.speakers"
                :style="getTalkStyle(talk)"
                :talk="talk"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Type Legend -->
      <div v-if="availableTalkTypes.length > 0" class="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <div v-for="type in availableTalkTypes" :key="type.value" class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full ring-1" :class="type.color" />
          <span class="font-medium text-gray-600 dark:text-gray-300">{{ type.label }}</span>
        </div>
      </div>
    </div>

    <div v-else class="py-12 text-center text-gray-500">
      No schedule data available.
    </div>
  </UContainer>
</template>
