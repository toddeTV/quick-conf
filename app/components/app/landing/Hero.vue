<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  links?: ButtonProps[]
}>()
</script>

<template>
  <UPageHero
    class="overflow-hidden"
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
