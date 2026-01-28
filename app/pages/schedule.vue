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
} = await useSchedule()

// --- SEO ---
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const seoMetadata = extractSeoMetadata({
  title: 'Schedule',
  description: `Conference schedule for ${activeDayISO.value}`,
})

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
    <AppScheduleDaySelector
      v-model="activeDayISO"
      :available-days="availableDays"
    />

    <div v-if="stages && timeSlots.length">
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

    <div v-else class="py-12 text-center text-gray-500">
      No schedule data available.
    </div>
  </UContainer>
</template>
