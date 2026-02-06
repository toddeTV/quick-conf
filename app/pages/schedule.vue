<script setup lang="ts">
const {
  activeDayISO,
  availableDays,
  availableTalkTypes,
  stages,
  timeSlots,
  currentTimeLineStyle,
  getTalkStyle,
  getTalksForStage,
  activeTalks,
} = await useSchedule()

// --- SEO ---
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const seoMetadata = computed(() => extractSeoMetadata({
  title: 'Schedule',
  description: `Conference schedule for ${activeDayISO.value}`,
}))

const meta = computed(() => getSeoMetaBase(seoMetadata.value))

useSeoMeta({
  title: () => meta.value.title,
  ogTitle: () => meta.value.ogTitle,
  description: () => meta.value.description,
  ogDescription: () => meta.value.ogDescription,
})

defineOgImageComponent('DefaultSatori', {
  headline: 'Schedule',
  title: 'Schedule',
  description: `Conference schedule for ${activeDayISO.value}`,
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
    <AppScheduleDaySelector
      v-model="activeDayISO"
      :available-days="availableDays"
    />

    <div v-if="stages && stages.length > 0 && activeTalks.length > 0">
      <!-- Schedule Grid -->
      <AppScheduleGrid
        :current-time-line-style="currentTimeLineStyle"
        :get-talk-style="getTalkStyle"
        :get-talks-for-stage="getTalksForStage"
        :stages="stages"
        :time-slots="timeSlots"
      />

      <!-- Type Legend -->
      <AppScheduleLegend :available-talk-types="availableTalkTypes" />
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <UIcon
        class="text-3xl text-neutral-300 dark:text-neutral-700"
        name="i-lucide-calendar-x-2"
      />
      <div class="text-lg font-medium text-neutral-900 dark:text-white">
        <span v-if="!stages || stages.length === 0">
          No stages configured yet.
        </span>
        <span v-else>
          No talks scheduled yet.
        </span>
      </div>
      <div class="text-neutral-500">
        Check back later for updates to the schedule.
      </div>
    </div>
  </UContainer>
</template>
