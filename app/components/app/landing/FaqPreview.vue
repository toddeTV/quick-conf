<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  title?: string
  description?: string
  headline?: string
  items: {
    label: string
    content: string
  }[]
  link?: ButtonProps
}>()
</script>

<template>
  <UPageSection
    :description="description"
    :headline="headline"
    :title="title"
  >
    <div class="sm:px-10 lg:px-24">
      <UAccordion :items="items" />

      <div v-if="link" class="mt-10 flex justify-center">
        <UButton v-bind="link" />
      </div>
    </div>
  </UPageSection>
</template>
