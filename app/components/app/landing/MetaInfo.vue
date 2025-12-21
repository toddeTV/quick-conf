<script setup lang="ts">
defineProps<{
  items: {
    icon: string
    text: string
    label?: string
  }[]
}>()
</script>

<template>
  <USeparator />
  <UContainer class="my-12">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-4"
      >
        <div class="shrink-0">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30
              text-primary-600 dark:text-primary-400"
          >
            <UIcon class="w-6 h-6" :name="item.icon" />
          </div>
        </div>
        <div>
          <p v-if="item.label" class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ item.label }}
          </p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </UContainer>
  <USeparator />
</template>
