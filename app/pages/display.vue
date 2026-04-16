<script setup lang="ts">
import type { StagesCollectionItem } from '@nuxt/content'
import { formatClockLabel } from '~/utils/display-time'

definePageMeta({
  layout: 'display',
})

const appConfig = useAppConfig()
const colorMode = useColorMode()
const { setSettings, settings, finalUrl } = useDisplaySettings()

const {
  activeDayISO,
  allStageGroups,
  availableDays,
  currentTimeLineStyle,
  getTalkStyle,
  getTalksForStage,
  now,
  selectedStageGroup,
  sponsors,
  stages,
  timeSlots,
} = await useDisplayScheduleData(settings, setSettings)

const isSettingsOpen = ref(false)
const previousColorPreference = ref<string | null>(null)

const stageOptions = computed(() => (stages.value ?? []).map((stage: StagesCollectionItem) => ({
  name: stage.name,
  slug: stage.slug,
})))

const scheduleUrl = computed(() => {
  const baseUrl = appConfig.general.siteUrl.endsWith('/')
    ? appConfig.general.siteUrl.slice(0, -1)
    : appConfig.general.siteUrl

  return `${baseUrl}/schedule`
})

const nowISO = computed(() => now.value.toISO() || '')
const nowLabel = computed(() => formatClockLabel(now.value))

const isVerticalScreen = computed(() => settings.value.screenOrientation === 'vertical')

const pageGridClass = computed(() => {
  if (isVerticalScreen.value) {
    return 'grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3'
  }

  return 'grid h-full min-h-0 grid-cols-[minmax(0,1fr)_20rem] gap-3'
})

const sidePanelClass = computed(() => {
  if (isVerticalScreen.value) {
    return 'grid min-h-0 grid-cols-3 gap-3 overflow-hidden'
  }

  return 'grid min-h-0 grid-cols-1 gap-3 overflow-hidden'
})

const mainPanelClass = computed(() => {
  if (settings.value.mode === 'timetable') {
    return 'min-h-0 overflow-hidden'
  }

  return 'min-h-0 space-y-3 overflow-auto'
})

const scaledStyle = computed(() => {
  const scale = settings.value.scaleFactor

  return {
    height: `${(100 / scale).toFixed(3)}%`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: `${(100 / scale).toFixed(3)}%`,
  }
})

watch(() => settings.value.themeMode, (themeMode) => {
  if (themeMode === 'site') {
    if (previousColorPreference.value !== null) {
      colorMode.preference = previousColorPreference.value
      previousColorPreference.value = null
    }

    return
  }

  if (previousColorPreference.value === null) {
    previousColorPreference.value = colorMode.preference
  }

  colorMode.preference = themeMode
}, {
  immediate: true,
})

onUnmounted(() => {
  if (previousColorPreference.value !== null) {
    colorMode.preference = previousColorPreference.value
  }
})

const { extractSeoMetadata, getSeoMetaBase } = useSeo()
const seoMetadata = computed(() => extractSeoMetadata({
  title: 'Display Mode',
  description: 'Unified display page for timetable and stage-focused views.',
}))
const meta = computed(() => getSeoMetaBase(seoMetadata.value))

useSeoMeta({
  title: () => meta.value.title,
  ogTitle: () => meta.value.ogTitle,
  description: () => meta.value.description,
  ogDescription: () => meta.value.ogDescription,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden">
    <AppDisplayTopBar
      :active-day-i-s-o="activeDayISO"
      :now-label="nowLabel"
      @open-settings="isSettingsOpen = !isSettingsOpen"
    />

    <div class="min-h-0 flex-1 overflow-hidden p-3">
      <div class="flex h-full min-h-0 gap-3 overflow-hidden">
        <div class="h-full min-w-0 flex-1 overflow-hidden" :style="scaledStyle">
          <div :class="pageGridClass">
            <div :class="mainPanelClass">
              <AppDisplayModeTimetable
                v-if="settings.mode === 'timetable'"
                :current-time-line-style="currentTimeLineStyle"
                :get-talk-style="getTalkStyle"
                :get-talks-for-stage="getTalksForStage"
                :grid-columns="settings.layoutColumns"
                :orientation="settings.screenOrientation"
                :stages="stages || []"
                :time-slots="timeSlots"
              />

              <AppDisplayModeAllStagesDetails
                v-else-if="settings.mode === 'all-details'"
                :grid-columns="settings.layoutColumns"
                :next-talks-layout="settings.nextTalksLayout"
                :now-i-s-o="nowISO"
                :orientation="settings.screenOrientation"
                :stage-groups="allStageGroups"
              />

              <AppDisplayModeSingleStageDetails
                v-else
                :next-talks-layout="settings.nextTalksLayout"
                :now-i-s-o="nowISO"
                :stage-group="selectedStageGroup"
              />
            </div>

            <div :class="sidePanelClass">
              <AppDisplaySponsorStrip
                class="min-h-0"
                :mode="settings.sponsorMode"
                :orientation="settings.screenOrientation"
                :sponsor-columns="settings.sponsorColumns"
                :sponsors="sponsors || []"
              />

              <AppDisplayQrBlock
                class="min-h-0"
                :orientation="settings.screenOrientation"
                :qr-code-style="settings.qrCodeStyle"
                :schedule-url="scheduleUrl"
              />

              <AppDisplayFooterInfoBlock class="min-h-0" />
            </div>
          </div>
        </div>

        <AppDisplaySettingsModal
          :available-days="availableDays"
          :available-stages="stageOptions"
          :final-url="finalUrl"
          :open="isSettingsOpen"
          :settings="settings"
          @patch-settings="setSettings"
          @update:open="isSettingsOpen = $event"
        />
      </div>
    </div>
  </div>
</template>
