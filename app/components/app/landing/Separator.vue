<script setup lang="ts">
defineProps<{
  // title?: string // TODO not used
  // description?: string // TODO not used
  // headline?: string // TODO not used
  // class?: string // works without using it due to Vue3's attribute fallthrough
  label?: string
  icon?: string
  avatar?: {
    src: string
    alt?: string
    loading?: 'eager' | 'lazy'
    sizes?: string
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
