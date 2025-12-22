<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  title?: string
  description?: string
  headline?: string
  links?: ButtonProps[]
}>()
</script>

<template>
  <UPageHero
    :description="description"
    :headline="headline"
    :links="links"
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
  </UPageHero>
</template>
