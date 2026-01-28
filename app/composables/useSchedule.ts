import type { ProcessedTalkType } from '~/types/schedule'
import { DateTime } from 'luxon'

export const HEADER_HEIGHT = 48
export const HOUR_HEIGHT = 160

export async function useSchedule() {
  const route = useRoute()
  const router = useRouter()
  const appConfig = useAppConfig()
  const timeZone = appConfig.general.timeZone || 'UTC'

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

  // --- Processed Data ---
  const processedTalks = computed<ProcessedTalkType[]>(() => {
    if (!talks.value || !stages.value || !speakers.value) {
      return []
    }

    return talks.value.map((talk) => {
      const speakers_hit = speakers.value?.filter(speaker => talk.speakers?.includes(speaker.slug)) ?? []
      const stage_hit = stages.value?.find(stage => stage.slug === talk.stage)

      // Parse as UTC ISO content, then converting to configured timezone
      const start = DateTime.fromISO(talk.dateTime, { zone: 'utc' }).setZone(timeZone)
      const end = start.plus({ minutes: talk.duration })

      return {
        ...talk,
        speakers: speakers_hit,
        stage: stage_hit,
        start,
        end,
      } as ProcessedTalkType
    })
  })

  // --- Helper Computeds ---
  const availableDays = computed(() => {
    const days = new Set<string>()
    processedTalks.value.forEach((t) => {
      const day = t.start.toISODate()
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

  // --- State Management ---
  const activeDayISO = computed<string>({
    get: () => {
      const q = route.query.day as string
      if (availableDays.value.includes(q)) {
        return q
      }
      return (availableDays.value[0] || DateTime.now().setZone(timeZone).toISODate()) as string
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
    return processedTalks.value.filter(t => t.start.toISODate() === activeDayISO.value)
  })

  const timeRange = computed(() => {
    if (activeTalks.value.length === 0) {
      return { start: 9, end: 17 }
    }

    let minH = 24
    let maxH = 0

    activeTalks.value.forEach((t) => {
      const s = t.start.hour
      // For end, if minutes > 0, round up next hour
      let e = t.end.hour
      // Handle midnight crossing
      if (!t.end.hasSame(t.start, 'day')) {
        e += 24
      }
      if (t.end.minute > 0)
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

  // --- Live Time Line ---
  const now = ref(DateTime.now().setZone(timeZone))
  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    timer = setInterval(() => {
      now.value = DateTime.now().setZone(timeZone)
    }, 60000) // Update every minute
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  const currentTimeLineStyle = computed(() => {
    const currentISO = now.value.toISODate()
    if (currentISO !== activeDayISO.value) {
      return { display: 'none' }
    }

    const currentHour = now.value.hour
    const currentMin = now.value.minute

    // Calculate total minutes from start of the schedule view
    const minutesFromStart = (currentHour - timeRange.value.start) * 60 + currentMin
    const totalViewMinutes = (timeRange.value.end - timeRange.value.start) * 60

    // Check if current time is within view range
    if (minutesFromStart < 0 || minutesFromStart > totalViewMinutes) {
      return { display: 'none' }
    }

    const top = HEADER_HEIGHT + (minutesFromStart / 60) * HOUR_HEIGHT
    return {
      top: `${top}px`,
    }
  })

  // --- Helper Functions ---
  function getTalkStyle(talk: ProcessedTalkType) {
    const startHour = talk.start.hour
    const startMin = talk.start.minute

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

  return {
    stages,
    speakers,
    talks,
    processedTalks,
    availableDays,
    availableTalkTypes,
    activeDayISO,
    activeTalks,
    timeRange,
    timeSlots,
    currentTimeLineStyle,
    getTalkStyle,
    getTalksForStage,
  }
}
