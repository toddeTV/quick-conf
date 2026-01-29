<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const isDemoMode = computed(() => {
  return runtimeConfig.public.demoMode === true
})
</script>

<template>
  <div
    v-if="isDemoMode"
    class="h-16 w-full"
  >
    <div
      class="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center
      gap-2 bg-red-600 p-3 text-center text-xs text-white shadow-lg md:flex-row lg:text-sm"
    >
      <span>
        ⚠️ <u>LEGAL DISCLAIMER:</u> This is a technical demonstration of a website template.
        It does not represent a real website. All content, including Legal Notice and Privacy Policy, is fictitious.
        No binding agreements or purchases can be made.
      </span>
      <UButton
        class="w-32 shrink-0 flex justify-center"
        color="neutral"
        size="xs"
        target="_blank"
        to="https://github.com/toddeTV/quick-conf"
        variant="solid"
      >
        View Source Code
      </UButton>
    </div>
  </div>
</template>
