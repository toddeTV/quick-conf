<script setup lang="ts">
const route = useRoute()

const slugParam = route.params.slug

if (Array.isArray(slugParam)) {
  throw createError({
    statusCode: 404,
    statusMessage: `No Talk Provided`,
    fatal: true,
  })
}

const slug_talk = String(slugParam)

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
</script>

<template>
  <template v-if="talk">
    <UContainer>
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
    </UContainer>
  </template>
</template>
