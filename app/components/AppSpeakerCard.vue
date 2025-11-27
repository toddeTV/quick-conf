<script setup lang="ts">
import type { SpeakersCollectionItem } from '@nuxt/content'

const _props = defineProps<{
  speaker: SpeakersCollectionItem
}>()
</script>

<template>
  <UPageCard
    class="relative overflow-visible"
    spotlight
    :ui="{
      root: 'mt-[15%]',
    }"
  >
    <ULink
      class="focus:outline-none"
      :to="`/speakers/${speaker.slug}`"
    >
      <span aria-hidden="true" class="absolute inset-0" />
      <div class="absolute left-1/2 top-0 z-10 aspect-4/3 w-[70%] -translate-x-1/2 -translate-y-1/4 transform">
        <NuxtImg
          :alt="`Picture of ${speaker.name}`"
          class="h-full w-full rounded-lg object-cover ring-2 ring-white dark:ring-gray-900"
          densities="1x 2x"
          fit="contain"
          format="webp"
          height="300"
          quality="80"
          :src="speaker.image"
          width="400"
        />
      </div>
      <div class="text-center mt-[45%]">
        <h3 class="text-md font-medium text-gray-900 dark:text-white">
          {{ speaker.name }}
        </h3>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {{ speaker.description }}
        </p>
      </div>
    </ULink>
  </UPageCard>
</template>
