<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
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
    sizes?: string
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
      :sizes="image.sizes"
      :src="image.src"
    />
  </UPageSection>
</template>
