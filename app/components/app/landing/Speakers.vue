<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
}>()

const { data: speakers } = await useAsyncData('speakers-featured-all', () =>
  queryCollection('speakers').where('featured', '=', true).order('featured', 'DESC').order('name', 'ASC').all())
</script>

<template>
  <template v-if="speakers && speakers.length > 0">
    <UPageSection
      :description="description"
      :headline="headline"
      :title="title"
    >
      <AppSpeakerGrid :speakers="speakers" />
    </UPageSection>
  </template>
</template>
