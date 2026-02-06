<script setup lang="ts">
defineProps<{
  availableTalkTypes: {
    value: string
    label: string
    color: string
  }[]
}>()
</script>

<template>
  <div v-if="availableTalkTypes.length > 0" class="mt-6 flex flex-wrap justify-center gap-4 text-sm">
    <div v-for="type in availableTalkTypes" :key="type.value" class="flex items-center gap-2">
      <span class="h-3 w-3 rounded-full ring-1" :class="type.color" />
      <span class="font-medium text-neutral-600 dark:text-neutral-300">{{ type.label }}</span>
    </div>
  </div>
</template>
