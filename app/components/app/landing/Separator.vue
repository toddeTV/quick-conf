<script setup lang="ts">
defineProps<{
  title?: string // TODO not used
  description?: string // TODO not used
  headline?: string // TODO not used
  label?: string
  icon?: string
  avatar?: {
    src: string
    alt?: string
  }
}>()
</script>

<template>
  <USeparator
    :avatar="avatar"
    :icon="icon"
    :label="label"
  />
</template>
