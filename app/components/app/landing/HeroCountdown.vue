<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  targetDate: string // ISO string or UTC date string
  links?: ButtonProps[]
}>()

const now = useState(() => new Date())
const target = computed(() => new Date(props.targetDate).getTime())

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const timeLeft = computed(() => {
  const diff = target.value - now.value.getTime()
  return diff
})

const status = computed(() => {
  const diff = timeLeft.value
  // 12 hours in milliseconds
  const twelveHours = 12 * 60 * 60 * 1000

  if (diff > 0) {
    return 'counting'
  }
  else if (diff > -twelveHours) {
    return 'live'
  }
  else {
    return 'ended'
  }
})

const countdown = computed(() => {
  const diff = timeLeft.value
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})
</script>

<template>
  <UPageSection
    :description="description"
    :headline="headline"
    :title="title"
  >
    <div>
      <div
        v-if="status === 'counting'"
        class="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto"
      >
        <div
          v-for="(value, label) in countdown"
          :key="label"
          class="flex flex-col items-center p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl"
        >
          <span class="text-4xl font-bold text-primary-600 dark:text-primary-400 font-mono">
            {{ value.toString().padStart(2, '0') }}
          </span>
          <span class="text-sm text-neutral-500 uppercase tracking-wider mt-1">{{ label }}</span>
        </div>
      </div>

      <div
        v-else-if="status === 'live'"
        class="flex flex-col items-center"
      >
        <div
          class="inline-flex items-center px-8 py-4 rounded-full bg-red-600 text-white animate-pulse"
        >
          <span class="relative flex h-3 w-3 mr-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span class="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          <span class="text-2xl font-bold uppercase tracking-widest">Live Now</span>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center"
      >
        <div
          class="inline-block px-8 py-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-500
                 dark:text-neutral-400"
        >
          <span class="text-2xl font-bold">Event Ended</span>
        </div>
      </div>
    </div>

    <div v-if="links?.length" class="flex flex-wrap justify-center gap-4">
      <UButton
        v-for="(link, index) in links"
        :key="index"
        v-bind="link"
      />
    </div>
  </UPageSection>
</template>
