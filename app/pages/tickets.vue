<script setup lang="ts">
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: tickets } = await useAsyncData('tickets-all', () => queryCollection('tickets').all())

const seoMetadata = extractSeoMetadata({
  title: 'Tickets',
  description: 'Purchase your ticket to join the conference.',
})
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})

defineOgImageComponent('DefaultSatori', {
  headline: 'Tickets',
  title: seoMetadata.title,
  description: seoMetadata.description,
})
</script>

<template>
  <template v-if="tickets">
    <UContainer class="pt-3 pb-8">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Tickets' },
        ]"
      />

      <UPageHeader
        :description="seoMetadata.description"
        :title="seoMetadata.title"
      />

      <UPricingPlans :plans="tickets" />
    </UContainer>
  </template>
</template>
