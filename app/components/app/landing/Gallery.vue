<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  images: {
    src: string
    alt?: string
    loading?: 'eager' | 'lazy'
    sizes?: string
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
        class="relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800"
      >
        <NuxtImg
          :alt="image.alt"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          :loading="image.loading"
          :sizes="image.sizes"
          :src="image.src"
        />
      </div>
    </div>
  </UPageSection>
</template>
