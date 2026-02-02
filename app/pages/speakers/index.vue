<script setup lang="ts">
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: speakers } = await useAsyncData('speakers-all', () =>
  queryCollection('speakers').order('featured', 'DESC').all())

const seoMetadata = extractSeoMetadata({
  title: 'Speakers',
  description: 'Meet our amazing speakers and learn more about their talks.',
})
const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})

defineOgImageComponent('DefaultSatori', {
  headline: 'Speakers',
  title: 'Speakers',
  description: 'Meet our amazing speakers',
})
</script>

<template>
  <template v-if="speakers">
    <UContainer class="pt-3 pb-8">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Speakers' },
        ]"
      />

      <UPageHeader
        :description="description"
        :title="title"
      />

      <AppSpeakerGrid is-all-speakers :speakers="speakers" />
    </UContainer>
  </template>
</template>
