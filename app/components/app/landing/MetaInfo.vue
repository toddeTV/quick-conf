<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  height?: 'normal' | 'small'
  items: {
    icon: string
    text: string
    label?: string
  }[]
}>()
</script>

<template>
  <UPageSection
    :class="{ 'md:-my-[70px] relative z-10': height === 'small' }"
    :description="description"
    :headline="headline"
    :title="title"
  >
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
          <p v-if="item.label" class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {{ item.label }}
          </p>
          <p class="text-lg font-semibold text-neutral-900 dark:text-white">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </UPageSection>
</template>
