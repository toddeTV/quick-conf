<script setup lang="ts">
import type { SpeakersCollectionItem, StagesCollectionItem, TalksCollectionItem } from '@nuxt/content'

const route = useRoute()

const [
  { data: stages },
  { data: speakers },
  { data: talks },
] = await Promise.all([
  useAsyncData(`${route.path}-stages`, () => queryCollection('stages').all()),
  useAsyncData(`${route.path}-speakers`, () => queryCollection('speakers').all()),
  useAsyncData(`${route.path}-talks`, () => queryCollection('talks').all()),
])

type ProcessedDataType = Omit<TalksCollectionItem, 'speakers' | 'stage'> & {
  speakers: SpeakersCollectionItem[]
  stage: StagesCollectionItem | null
}

const processedData = computed<ProcessedDataType[]>(() => {
  if (!talks.value || talks.value.length === 0) {
    return []
  }

  return talks.value.map((talk) => {
    const stage_hit = stages.value?.find(stage => stage.slug === talk.stage)
    const speakers_hit = speakers.value?.filter(speaker =>
      talk.speakers?.includes(speaker.slug),
    )

    return {
      ...talk,
      speakers: speakers_hit ?? [],
      stage: stage_hit ?? null,
    }
  })
})

const seoMetadata = extractSeoMetadata({
  title: 'Schedule',
  description: 'List of talks for the event with time and stage information',
})
const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <template v-if="talks">
    <UContainer>
      <UPageHeader :description="description" :title="title" />

      <div v-for="talk in processedData" :key="talk.slug">
        <NuxtLink
          aria-label="View details for {{ talk.title }} at {{ talk.dateTime }}"
          :to="`/talks/${talk.slug}`"
        >
          {{ talk.title }} at {{ talk.dateTime }}
        </NuxtLink>
      </div>
    </UContainer>
  </template>
</template>
