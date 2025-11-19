<script setup lang="ts">
const route = useRoute()

let slug_speaker: string
try {
  slug_speaker = normalizeSlug(route.params.slug)
}
catch (error) {
  throw createError({
    statusCode: 404,
    statusMessage: error instanceof Error ? error.message : 'No Speaker Provided',
    fatal: true,
  })
}

const { data: speaker } = await useAsyncData(route.path, () =>
  queryCollection('speakers').where('slug', '=', slug_speaker).first())

if (!speaker.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Speaker "${slug_speaker}" not Found`,
    fatal: true,
  })
}

const { data: talks } = await useAsyncData(`${route.path}-talks`, () =>
  queryCollection('talks').where('speakers', 'LIKE', `%"${slug_speaker}"%`).all())

const seoMetadata = extractSeoMetadata(speaker.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <template v-if="speaker">
    <UContainer>
      <UPageHeader :description="speaker.description" :title="speaker.name" />

      <ContentRenderer v-if="speaker.body" :value="speaker" />

      <div>
        Given Talks/Workshops:<br>
        <div v-for="talk in talks" :key="talk.slug">
          <ULink
            :aria-label="`View details for Talk '${talk.title}'`"
            :to="`/talks/${talk.slug}`"
          >
            {{ talk.title }}
          </ULink>
        </div>
      </div>
    </UContainer>
  </template>
</template>
