<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  title?: string
  description?: string
  headline?: string // TODO not used
  links?: ButtonProps[]
}>()
</script>

<template>
  <USeparator />
  <UPageCTA
    class="overflow-hidden"
    :description="description"
    :links="links"
    :title="title"
    variant="naked"
  >
    <div
      class="absolute rounded-full bg-primary-600 dark:bg-primary blur-[250px] size-40 sm:size-50
      transform -translate-x-1/2 left-1/2 -translate-y-80"
    />

    <LazyAppStarsBg
      :size="{
        min: 1,
        max: 3,
      }"
    />
  </UPageCTA>
</template>
