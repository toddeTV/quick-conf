<script setup lang="ts">
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: speakers } = await useAsyncData(route.path, () => queryCollection('speakers').all())

const seoMetadata = extractSeoMetadata({
  title: 'Speakers List',
  description: 'List of speakers for the event',
})
const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <template v-if="speakers">
    <UContainer>
      <UPageHeader :description="description" :title="title" />

      <div v-for="speaker in speakers" :key="speaker.slug">
        <ULink
          :aria-label="`View details for Speaker '${speaker.name}'`"
          :to="`/speakers/${speaker.slug}`"
        >
          {{ speaker.name }}
        </ULink>
      </div>
    </UContainer>
  </template>
</template>
