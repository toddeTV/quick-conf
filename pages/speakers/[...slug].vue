<script setup lang="ts">
const route = useRoute()

const slugParam = route.params.slug

if (Array.isArray(slugParam) && slugParam.length > 1) {
  throw createError({
    statusCode: 404,
    statusMessage: `No Speaker Provided`,
    fatal: true,
  })
}

const slug_speaker = String(slugParam)

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
          <NuxtLink
            :aria-label="`View details for Talk '${talk.title}'`"
            :to="`/talks/${talk.slug}`"
          >
            {{ talk.title }}
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </template>
</template>
