<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  images: {
    src: string
    alt?: string
  }[]
}>()
</script>

<template>
  <UPageSection
    :description="description"
    :headline="headline"
    :title="title"
  >
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative aspect-4/3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
      >
        <NuxtImg
          :alt="image.alt"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          :src="image.src"
        />
      </div>
    </div>
  </UPageSection>
</template>
