<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
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
