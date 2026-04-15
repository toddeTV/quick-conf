<script setup lang="ts">
defineProps<{
  speakers: Array<{
    image?: string
    name: string
    slug: string
  }>
}>()
</script>

<template>
  <div v-if="speakers.length > 0" class="flex flex-wrap gap-2">
    <div
      v-for="speaker in speakers"
      :key="speaker.slug"
      class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-2 py-1
        dark:border-neutral-700 dark:bg-neutral-800"
    >
      <NuxtImg
        :alt="speaker.name"
        class="size-6 rounded-full object-cover"
        height="24"
        :src="speaker.image || '/assets/image-placeholder/light.svg'"
        width="24"
      />

      <span class="max-w-40 truncate text-xs font-medium text-neutral-800 dark:text-neutral-100">
        {{ speaker.name }}
      </span>
    </div>
  </div>
</template>
