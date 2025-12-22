<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  orientation?: 'vertical' | 'horizontal'
  reverse?: boolean
  features?: {
    title?: string
    description?: string
    icon?: string
  }[]
  image?: {
    src: string
    alt?: string
  }
}>()
</script>

<template>
  <UPageSection
    :description="description"
    :features="features"
    :headline="headline"
    :orientation="orientation"
    :reverse="reverse"
    :title="title"
  >
    <NuxtImg
      v-if="image"
      :alt="image.alt"
      class="w-full rounded-lg h-full object-cover"
      :src="image.src"
    />
  </UPageSection>
</template>
