<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  links?: ButtonProps[]
  image?: {
    src: string
    alt?: string
    loading?: 'eager' | 'lazy'
    sizes?: string
  }
  videoUrl?: string
  features?: {
    title: string
    description?: string
    icon?: string
  }[]
}>()

const videoId = computed(() => {
  if (!props.videoUrl)
    return undefined
  try {
    const url = new URL(props.videoUrl)
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      if (url.searchParams.has('v')) {
        return url.searchParams.get('v')
      }
      const pathSegments = url.pathname.substring(1).split('/')
      if (pathSegments[0] === 'embed' && pathSegments[1]) {
        return pathSegments[1]
      }
      if (url.hostname.includes('youtu.be') && pathSegments[0]?.length === 11) {
        return pathSegments[0]
      }
    }
    // Fallback regex
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = props.videoUrl.match(regExp)
    return (match && match[2]?.length === 11) ? match[2] : undefined
  }
  catch {
    return undefined
  }
})
</script>

<template>
  <UPageHero
    class="overflow-hidden"
    :description="description"
    :headline="headline"
    :links="links"
    orientation="horizontal"
    :title="title"
  >
    <template #top>
      <div
        class="absolute rounded-full bg-primary-600 dark:bg-primary blur-[300px] size-60 sm:size-80
        transform -translate-x-1/2 left-1/2 -translate-y-80"
      />
      <LazyAppStarsBg
        :size="{
          min: 1,
          max: 3,
        }"
      />
    </template>

    <template #links>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <UButton
          v-for="(link, index) in links"
          :key="index"
          v-bind="link"
        />
      </div>

      <div v-if="features?.length" class="w-full mt-8 sm:mt-10">
        <ul class="grid grid-cols-1 gap-4">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-start gap-x-3"
          >
            <UIcon
              v-if="feature.icon"
              class="size-6 shrink-0 text-primary"
              :name="feature.icon"
            />
            <div>
              <h3 class="font-medium text-neutral-900 dark:text-white">
                {{ feature.title }}
              </h3>
              <p v-if="feature.description" class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {{ feature.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </template>

    <template #default>
      <div
        v-if="videoUrl && videoId"
        class="group relative rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 p-2 ring-1 ring-neutral-200
        dark:ring-neutral-800 shadow-2xl"
      >
        <div
          class="relative w-full aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-black/10
          dark:ring-white/10"
        >
          <ScriptYouTubePlayer
            class="w-full h-full"
            :player-options="{
              host: 'https://www.youtube-nocookie.com',
            }"
            :video-id="videoId"
          >
            <template #awaitingLoad>
              <div
                class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900/50
                transition-colors"
              >
                <UIcon
                  class="text-6xl text-red-600 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all
                  duration-300"
                  name="i-simple-icons-youtube"
                />
              </div>
            </template>
          </ScriptYouTubePlayer>
        </div>
      </div>
      <NuxtImg
        v-else-if="image"
        :alt="image.alt || 'Hero image'"
        class="w-full h-auto rounded-xl shadow-xl ring-1 ring-neutral-200 dark:ring-neutral-800"
        :loading="image.loading"
        :sizes="image.sizes"
        :src="image.src"
      />
    </template>
  </UPageHero>
</template>
