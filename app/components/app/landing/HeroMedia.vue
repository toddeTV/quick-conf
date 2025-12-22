<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  title?: string
  description?: string
  headline?: string
  links?: ButtonProps[]
  image?: {
    src: string
    alt?: string
  }
  video?: {
    src: string
    poster?: string
  }
  overlayOpacity?: number
}>()
</script>

<template>
  <div class="relative flex items-center justify-center min-h-[600px] overflow-hidden">
    <!-- Background Media -->
    <div class="absolute inset-0 z-0">
      <video
        v-if="video"
        autoplay
        class="w-full h-full object-cover"
        loop
        muted
        playsinline
        :poster="video.poster"
        :src="video.src"
      />
      <NuxtImg
        v-else-if="image"
        :alt="image.alt"
        class="w-full h-full object-cover"
        :src="image.src"
      />

      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black" :style="{ opacity: overlayOpacity ?? 0.5 }" />
    </div>

    <!-- Content -->
    <UPageSection
      class="relative z-5"
      :description="description"
      :headline="headline"
      :title="title"
    >
      <div v-if="links?.length" class="flex flex-wrap justify-center gap-4">
        <UButton
          v-for="(link, index) in links"
          :key="index"
          v-bind="link"
        />
      </div>
    </UPageSection>
  </div>
</template>
