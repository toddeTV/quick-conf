<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // TODO works without using it
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
    loading?: 'eager' | 'lazy'
    srcset?: string
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
      :loading="image.loading"
      :src="image.src"
      :srcset="image.srcset"
    />
  </UPageSection>
</template>
