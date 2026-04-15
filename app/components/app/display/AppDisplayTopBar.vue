<script setup lang="ts">
import { formatDateReadable } from '~/utils/date'

defineProps<{
  activeDayISO: string
  nowLabel: string
}>()

const emit = defineEmits<{
  openSettings: []
}>()
</script>

<template>
  <div
    class="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur
      dark:border-neutral-800 dark:bg-neutral-950/95"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <ULink aria-label="Go to landing page" class="shrink-0" to="/">
          <AppLogo class="h-8 w-auto" />
        </ULink>

        <div class="min-w-0">
          <div class="truncate text-lg font-mono font-semibold text-neutral-800 dark:text-neutral-100">
            {{ nowLabel }}
          </div>

          <div class="truncate text-sm font-semibold text-neutral-500 dark:text-neutral-300">
            {{ formatDateReadable(activeDayISO) }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          aria-label="Open display settings"
          color="neutral"
          icon="lucide:sliders-horizontal"
          variant="outline"
          @click="emit('openSettings')"
        />
      </div>
    </div>
  </div>
</template>
