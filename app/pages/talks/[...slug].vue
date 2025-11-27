<script setup lang="ts">
import { DateTime } from 'luxon'

const route = useRoute()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

let slug_talk: string
try {
  slug_talk = normalizeSlug(route.params.slug)
}
catch (error) {
  throw createError({
    statusCode: 404,
    statusMessage: error instanceof Error ? error.message : 'No Talk Provided',
    fatal: true,
  })
}

const { data: talk } = await useAsyncData(route.path, () =>
  queryCollection('talks').where('slug', '=', slug_talk).first())

if (!talk.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Talk "${slug_talk}" not Found`,
    fatal: true,
  })
}

const slug_stage = talk.value.stage
const slug_speakers = talk.value.speakers

const [
  { data: stage },
  { data: speakers },
] = await Promise.all([
  useAsyncData(`${route.path}-stage`, () => queryCollection('stages').where('slug', '=', slug_stage).first()),
  useAsyncData(`${route.path}-speakers`, () => queryCollection('speakers').where('slug', 'IN', slug_speakers).all()),
])

const seoMetadata = extractSeoMetadata(talk.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})

function formatDateTime(dateTimeStr: string): string {
  const date = DateTime.fromISO(dateTimeStr)

  const day = date.toISODate()
  const time = date.toLocaleString(DateTime.TIME_24_SIMPLE)
  const timeZone = date.zoneName

  return `${day} at ${time} (${timeZone})`
}
</script>

<template>
  <template v-if="talk">
    <UContainer class="pt-3">
      <UPageBody>
        <UPageHeader
          headline="Talk Details"
          :title="talk.title"
          :ui="{
            root: 'border-b-0!',
          }"
        />

        <div class="flex flex-col gap-2 max-w-sm -mt-5">
          <div class="flex items-center text-muted">
            <UIcon class="mr-2 size-5" name="i-lucide-tag" />
            <span>{{ talk.type }}</span>
          </div>

          <ULink class="flex items-center" to="/schedule">
            <UIcon class="mr-2 size-5" name="i-lucide-calendar" />
            <span>{{ formatDateTime(talk.dateTime) }}</span>
          </ULink>

          <ULink v-if="stage" class="flex items-center" to="/faq/location">
            <UIcon class="mr-2 size-5" name="i-lucide-map-pin" />
            <span>{{ stage.name }}</span>
          </ULink>
        </div>

        <!-- talk details -->
        <div class="prose dark:prose-invert">
          <ContentRenderer v-if="talk.body" :value="talk" />
        </div>

        <!-- speakers -->
        <div>
          <ProseH2>
            Speakers
          </ProseH2>
          <template v-if="speakers && speakers.length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              <AppSpeakerCard
                v-for="speaker in speakers"
                :key="speaker.slug"
                :speaker="speaker"
              />
            </div>
          </template>
          <template v-else>
            <UAlert
              color="neutral"
              description="There are no speakers listed for this talk."
              icon="i-lucide-info"
              variant="subtle"
            />
          </template>
        </div>
      </UPageBody>
    </UContainer>
  </template>
</template>
