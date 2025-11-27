<script setup lang="ts">
import type { SpeakersCollectionItem } from '@nuxt/content'
import { isNil } from 'lodash-es'

const _props = withDefaults(defineProps<{
  speakers: SpeakersCollectionItem[]
  isAllSpeakers?: boolean
}>(), {
  isAllSpeakers: false,
})
</script>

<template>
  <UPageGrid>
    <AppSpeakerCard
      v-for="speaker in speakers"
      :key="speaker.slug"
      :speaker="speaker"
    />

    <template v-if="!isAllSpeakers">
      <UPageCard
        spotlight
        to="/speakers"
        class="flex items-center justify-center text-center"
      >
        <div class="flex flex-col items-center gap-y-2">
          <UIcon name="i-lucide-users" class="text-4xl" />
          <span class="text-lg font-medium text-gray-900 dark:text-white">
            View All Speakers
          </span>
        </div>
      </UPageCard>
    </template>
  </UPageGrid>
</template>
