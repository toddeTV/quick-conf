<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const isDemoMode = computed(() => {
  return runtimeConfig.public.demoMode === true
})
</script>

<template>
  <div
    v-if="isDemoMode "
    class="h-14 w-full"
  >
    <div
      class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-red-600
      p-3 text-center text-sm font-bold text-white shadow-lg"
    >
      <span>⚠️ This is a demo website with dummy data. No real content.</span>
    </div>
  </div>
</template>
