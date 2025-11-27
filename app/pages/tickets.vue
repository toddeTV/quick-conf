<script setup lang="ts">
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: tickets } = await useAsyncData('tickets-all', () => queryCollection('tickets').all())

const seoMetadata = extractSeoMetadata({
  title: 'Tickets',
  description: 'Purchase your ticket to join the conference.',
})
const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <template v-if="tickets">
    <UContainer>
      <UBreadcrumb
        class="pt-3"
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Tickets' },
        ]"
      />

      <UPageHeader
        :description="description"
        :title="title"
        :ui="{
          root: 'border-b-0!',
        }"
      />

      <UPricingPlans :plans="tickets" />
    </UContainer>
  </template>
</template>
