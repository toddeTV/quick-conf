<script setup lang="ts">
import { formatDateReadable } from '~/utils/date'

defineProps<{
  availableDays: string[]
}>()

const activeDayISO = defineModel<string>('modelValue', { required: true })
</script>

<template>
  <div v-if="availableDays.length > 0" class="mb-6 flex flex-wrap gap-2">
    <template v-if="availableDays.length > 1">
      <UButton
        v-for="day in availableDays"
        :key="day"
        color="neutral"
        :label="formatDateReadable(day)"
        size="lg"
        :variant="activeDayISO === day ? 'subtle' : 'ghost'"
        @click="activeDayISO = day"
      />
    </template>
    <div v-else class="text-lg font-medium text-gray-900 dark:text-white">
      {{ formatDateReadable(availableDays[0]!) }}
    </div>
  </div>
</template>
