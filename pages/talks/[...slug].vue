<script setup lang="ts">
const route = useRoute()

const slug_talk = String(route.params.slug)
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

const title = talk.value.seo.title || talk.value.title
const description = talk.value.seo.description || talk.value.description

useSeoMeta({
  ...getSeoMetaBase(title, description),
})
</script>

<template>
  <template v-if="talk">
    <UPageHeader :description="talk.description" :title="talk.title" />

    <div>
      Stage: {{ stage?.name }}
    </div>

    <div>
      Speakers:<br>
      <div v-for="speaker in speakers" :key="speaker.slug">
        <NuxtLink :to="`/speakers/${speaker.slug}`">
          {{ speaker.name }}<br>
          {{ speaker.image }}
          <NuxtImg class="w-16 h-16 object-cover" :src="speaker.image" />
        </NuxtLink>
      </div>
    </div>

    <ContentRenderer v-if="talk.body" :value="talk" />
  </template>
</template>
