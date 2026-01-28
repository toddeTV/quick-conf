<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  items: {
    title?: string
    description?: string
    icon?: string
  }[]
}>()
</script>

<template>
  <UPageSection
    :description="description"
    :headline="headline"
    :title="title"
  >
    <UPageGrid>
      <UPageCard
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
      />
    </UPageGrid>
  </UPageSection>
</template>
