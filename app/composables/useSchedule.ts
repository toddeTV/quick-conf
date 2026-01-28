import type { ProcessedTalkType } from '~/types/schedule'

export const HEADER_HEIGHT = 48
export const HOUR_HEIGHT = 160

export async function useSchedule() {
  const route = useRoute()
  const router = useRouter()

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
      const start = new Date(talk.dateTime)
      const end = new Date(start.getTime() + talk.duration * 60 * 1000)

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

  // --- State Management ---
  const activeDayISO = computed<string>({
    get: () => {
      const q = route.query.day as string
      if (availableDays.value.includes(q)) {
        return q
      }
      return (availableDays.value[0] || new Date().toISOString().split('T')[0]) as string
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

  // --- Live Time Line ---
  const now = ref(new Date())
  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date()
    }, 60000) // Update every minute
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  const currentTimeLineStyle = computed(() => {
    const currentISO = now.value.toISOString().split('T')[0]
    if (currentISO !== activeDayISO.value) {
      return { display: 'none' }
    }

    const currentHour = now.value.getHours()
    const currentMin = now.value.getMinutes()

    // Calculate total minutes from start of the schedule view
    const minutesFromStart = (currentHour - timeRange.value.start) * 60 + currentMin

    // Check if current time is within view range
    if (minutesFromStart < 0) {
      return { display: 'none' }
    }

    const top = HEADER_HEIGHT + (minutesFromStart / 60) * HOUR_HEIGHT
    return {
      top: `${top}px`,
    }
  })

  // --- Helper Functions ---
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

export function formatDateReadable(iso: string) {
  if (!iso) {
    return ''
  }
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatHour(h: number) {
  return `${h.toString().padStart(2, '0')}:00`
}
