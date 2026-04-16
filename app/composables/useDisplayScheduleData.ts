import type { SponsorsCollectionItem, StagesCollectionItem } from '@nuxt/content'
import type { DisplaySettings, DisplayTalkView, StageDisplayGroup } from '~/types/display'
import type { ProcessedTalkType } from '~/types/schedule'
import { DateTime } from 'luxon'
import { HEADER_HEIGHT, HOUR_HEIGHT } from '~/composables/useSchedule'
import { formatClockLabel } from '~/utils/display-time'

interface UseDisplayScheduleDataResult {
  activeDayISO: ComputedRef<string>
  allStageGroups: ComputedRef<StageDisplayGroup[]>
  availableDays: ComputedRef<string[]>
  currentTimeLineStyle: ComputedRef<Record<string, string | undefined>>
  getTalkStyle: (talk: ProcessedTalkType) => { height: string, top: string }
  getTalksForStage: (stageSlug: string) => ProcessedTalkType[]
  now: Ref<DateTime>
  refreshData: () => Promise<void>
  selectedStageGroup: ComputedRef<StageDisplayGroup | undefined>
  selectedStageSlug: ComputedRef<string | undefined>
  sponsors: Ref<SponsorsCollectionItem[] | undefined>
  stages: Ref<StagesCollectionItem[] | undefined>
  timeSlots: ComputedRef<number[]>
}

/**
 * Maps a processed talk into the display card view model.
 *
 * @param {ProcessedTalkType} talk - Source talk from schedule processing.
 * @param {DateTime} now - Current timestamp for active state detection.
 * @returns {DisplayTalkView} Display-friendly talk object.
 */
function toDisplayTalkView(talk: ProcessedTalkType, now: DateTime): DisplayTalkView {
  const description = typeof talk.description === 'string' && talk.description.trim().length > 0
    ? talk.description.trim()
    : 'No description available.'

  return {
    description,
    endClock: formatClockLabel(talk.end),
    endISO: talk.end.toISO() || '',
    isCurrent: now >= talk.start && now < talk.end,
    slug: talk.slug,
    speakers: talk.speakers.map(speaker => ({
      image: speaker.image,
      name: speaker.name,
      slug: speaker.slug,
    })),
    stageName: talk.stage?.name,
    startClock: formatClockLabel(talk.start),
    startISO: talk.start.toISO() || '',
    talkType: talk.type,
    title: talk.title,
  }
}

/**
 * Loads and derives all data required for the display page.
 *
 * @param {Ref<DisplaySettings>} settings - Reactive display settings state.
 * @param {(patch: Partial<DisplaySettings>) => void} setSettings - Settings patch helper.
 * @returns {Promise<UseDisplayScheduleDataResult>} Derived schedule state and helper functions.
 *
 * @example
 * ```ts
 * const { allStageGroups, timeSlots } = await useDisplayScheduleData(settings, setSettings)
 * ```
 */
export async function useDisplayScheduleData(
  settings: Ref<DisplaySettings>,
  setSettings: (patch: Partial<DisplaySettings>) => void,
): Promise<UseDisplayScheduleDataResult> {
  const route = useRoute()
  const appConfig = useAppConfig()
  const toast = useToast()
  const timeZone = appConfig.general.timeZone || 'UTC'

  const stagesRequest = useAsyncData(`${route.path}-display-stages`, () => queryCollection('stages').all())
  const speakersRequest = useAsyncData(`${route.path}-display-speakers`, () => queryCollection('speakers').all())
  const talksRequest = useAsyncData(`${route.path}-display-talks`, () =>
    queryCollection('talks').order('dateTime', 'ASC').all())
  const sponsorsRequest = useAsyncData(`${route.path}-display-sponsors`, () => queryCollection('sponsors').all())

  const stages = stagesRequest.data
  const sponsors = sponsorsRequest.data

  const processedTalks = computed<ProcessedTalkType[]>(() => {
    if (!talksRequest.data.value || !stages.value || !speakersRequest.data.value) {
      return []
    }

    return talksRequest.data.value.map((talk) => {
      const speakerHits = speakersRequest.data.value?.filter(
        speaker => talk.speakers?.includes(speaker.slug),
      ) ?? []
      const stageHit = stages.value?.find(stage => stage.slug === talk.stage)
      const rawDateTime = talk.dateTime as string | Date
      const source = rawDateTime instanceof Date
        ? DateTime.fromJSDate(rawDateTime, { zone: 'utc' })
        : DateTime.fromISO(rawDateTime, { zone: 'utc' })
      const start = source.setZone(timeZone)

      return {
        ...talk,
        end: start.plus({ minutes: talk.duration }),
        speakers: speakerHits,
        stage: stageHit,
        start,
      } as ProcessedTalkType
    })
  })

  const availableDays = computed(() => {
    return Array.from(new Set(processedTalks.value
      .map(talk => talk.start.toISODate())
      .filter((day): day is string => Boolean(day))))
      .sort()
  })

  const nowState = useState<string>(`${route.path}-display-now`, () => {
    return DateTime.now().setZone(timeZone).startOf('minute').toISO() || ''
  })

  const hydratedNow = DateTime.fromISO(nowState.value, { setZone: true }).setZone(timeZone).startOf('minute')
  const now = ref(hydratedNow.isValid ? hydratedNow : DateTime.now().setZone(timeZone).startOf('minute'))
  let clockTimer: ReturnType<typeof setInterval> | undefined
  let refreshTimer: ReturnType<typeof setInterval> | undefined

  const activeDayISO = computed(() => {
    if (
      settings.value.dayMode === 'manual'
      && settings.value.dayISO
      && availableDays.value.includes(settings.value.dayISO)
    ) {
      return settings.value.dayISO
    }

    const today = now.value.toISODate()
    if (today && availableDays.value.includes(today)) {
      return today
    }

    return availableDays.value[0] || today || ''
  })

  const talksForActiveDay = computed(() => {
    return processedTalks.value
      .filter(talk => talk.start.toISODate() === activeDayISO.value)
      .sort((a, b) => a.start.toMillis() - b.start.toMillis())
  })

  const timeRange = computed(() => {
    if (talksForActiveDay.value.length === 0) {
      return { end: 17, start: 9 }
    }

    const minHour = Math.max(0, talksForActiveDay.value[0]!.start.hour - 1)
    const maxHour = talksForActiveDay.value.reduce((carry, talk) => {
      const endHour = talk.end.minute > 0 ? talk.end.hour + 1 : talk.end.hour
      return Math.max(carry, endHour)
    }, 0)

    return {
      end: Math.min(26, maxHour + 1),
      start: minHour,
    }
  })

  const timeSlots = computed(() => {
    const slots: number[] = []
    for (let hour = timeRange.value.start; hour < timeRange.value.end; hour += 1) {
      slots.push(hour)
    }
    return slots
  })

  const currentTimeLineStyle = computed(() => {
    if (now.value.toISODate() !== activeDayISO.value) {
      return { display: 'none' }
    }

    const minutesFromStart = (now.value.hour - timeRange.value.start) * 60 + now.value.minute
    const totalMinutes = (timeRange.value.end - timeRange.value.start) * 60

    if (minutesFromStart < 0 || minutesFromStart > totalMinutes) {
      return { display: 'none' }
    }

    return {
      display: 'block',
      top: `${(HEADER_HEIGHT + (minutesFromStart / 60) * HOUR_HEIGHT).toFixed(2)}px`,
    }
  })

  /**
   * Computes grid placement style for a single talk in timetable mode.
   *
   * @param {ProcessedTalkType} talk - Talk used for height and vertical offset.
   * @returns {{ height: string, top: string }} Inline style values for talk placement.
   */
  function getTalkStyle(talk: ProcessedTalkType): { height: string, top: string } {
    const startOffsetMinutes = (talk.start.hour - timeRange.value.start) * 60 + talk.start.minute
    return {
      height: `${(talk.duration / 60) * HOUR_HEIGHT}px`,
      top: `${(startOffsetMinutes / 60) * HOUR_HEIGHT}px`,
    }
  }

  /**
   * Returns all talks for a stage on the selected display day.
   *
   * @param {string} stageSlug - Stage identifier.
   * @returns {ProcessedTalkType[]} Talks assigned to the given stage.
   */
  function getTalksForStage(stageSlug: string): ProcessedTalkType[] {
    return talksForActiveDay.value.filter(talk => talk.stage?.slug === stageSlug)
  }

  const nextTalksCount = computed(() => {
    return Math.min(12, Math.max(1, Math.trunc(settings.value.nextTalksCount || 3)))
  })

  /**
   * Builds a stage group with primary and upcoming talks for details views.
   *
   * @param {string} stageSlug - Stage identifier.
   * @param {number} upcomingCount - Maximum number of upcoming talks to include.
   * @returns {StageDisplayGroup} Display group for one stage.
   */
  function buildStageGroup(stageSlug: string, upcomingCount: number): StageDisplayGroup {
    const stage = stages.value?.find(item => item.slug === stageSlug)
    const stageTalks = getTalksForStage(stageSlug)
    const currentTalk = stageTalks.find(talk => now.value >= talk.start && now.value < talk.end)
    const upcomingTalks = stageTalks.filter(talk => talk.start > now.value)

    // When no active talk exists, the first upcoming talk becomes the primary card.
    const primaryTalk = currentTalk || upcomingTalks[0]
    const nextTalks = currentTalk
      ? upcomingTalks.slice(0, upcomingCount)
      : upcomingTalks.slice(1, upcomingCount + 1)

    return {
      primaryTalk: primaryTalk ? toDisplayTalkView(primaryTalk, now.value) : undefined,
      stageName: stage?.name || stageSlug,
      stageSlug,
      upcomingTalks: nextTalks.map(talk => toDisplayTalkView(talk, now.value)),
    }
  }

  const selectedStageSlug = computed(() => settings.value.selectedStageSlug || stages.value?.[0]?.slug)

  const allStageGroups = computed(() => {
    return (stages.value ?? []).map(stage => buildStageGroup(stage.slug, nextTalksCount.value))
  })

  const selectedStageGroup = computed(() => {
    if (!selectedStageSlug.value) {
      return undefined
    }

    return buildStageGroup(selectedStageSlug.value, nextTalksCount.value)
  })

  /**
   * Refreshes all content collections used by display mode.
   *
   * @returns {Promise<void>} Promise resolved when all refresh calls complete.
   */
  async function refreshData() {
    await Promise.all([
      stagesRequest.refresh(),
      speakersRequest.refresh(),
      talksRequest.refresh(),
      sponsorsRequest.refresh(),
    ])
  }

  /**
   * Restarts the periodic refresh timer with the current interval setting.
   *
   * @returns {void}
   */
  function restartRefreshTimer() {
    if (refreshTimer) {
      clearInterval(refreshTimer)
    }

    refreshTimer = setInterval(() => {
      void refreshData()
    }, settings.value.refreshSeconds * 1000)
  }

  watch(() => settings.value.refreshSeconds, () => {
    restartRefreshTimer()
  })

  watch([availableDays, stages], ([days, stageList]) => {
    if (settings.value.dayMode === 'manual' && (!settings.value.dayISO || !days.includes(settings.value.dayISO))) {
      setSettings({ dayISO: days[0] })
    }

    const hasValidSelectedStage = Boolean(
      settings.value.selectedStageSlug
      && stageList?.some(stage => stage.slug === settings.value.selectedStageSlug),
    )

    if (!hasValidSelectedStage && stageList && stageList.length > 0) {
      if (import.meta.client && settings.value.selectedStageSlug) {
        const toastDescriptionParts = [
          `selectedStageSlug=${settings.value.selectedStageSlug}`,
          `availableStages=${stageList.map(stage => stage.slug).join(',')}`,
          `dayMode=${settings.value.dayMode}`,
          `dayISO=${settings.value.dayISO ?? 'unset'}`,
        ]

        toast.add({
          color: 'error',
          description: toastDescriptionParts.join('; '),
          icon: 'lucide:triangle-alert',
          title: 'Invalid stage in display settings',
        })
      }

      setSettings({ selectedStageSlug: stageList[0]!.slug })
    }
  }, {
    immediate: true,
  })

  onMounted(() => {
    now.value = DateTime.now().setZone(timeZone).startOf('minute')

    clockTimer = setInterval(() => {
      now.value = DateTime.now().setZone(timeZone).startOf('minute')
    }, 30000)

    restartRefreshTimer()
  })

  onUnmounted(() => {
    if (clockTimer) {
      clearInterval(clockTimer)
    }

    if (refreshTimer) {
      clearInterval(refreshTimer)
    }
  })

  await Promise.all([stagesRequest, speakersRequest, talksRequest, sponsorsRequest])

  return {
    activeDayISO,
    allStageGroups,
    availableDays,
    currentTimeLineStyle,
    getTalkStyle,
    getTalksForStage,
    now,
    refreshData,
    selectedStageGroup,
    selectedStageSlug,
    sponsors,
    stages,
    timeSlots,
  }
}
