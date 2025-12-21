<script setup lang="ts">
defineProps<{
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
