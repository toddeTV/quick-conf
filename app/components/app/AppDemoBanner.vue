<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const isDemoMode = computed(() => {
  return runtimeConfig.public.demoMode === true
})
</script>

<template>
  <div
    v-if="isDemoMode"
    class="flex w-full flex-col items-center justify-center gap-2 border-t border-red-200 bg-red-50 p-3 text-center
    text-xs text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200 md:flex-row lg:text-sm"
  >
    <span>
      ⚠️ <u>Legal disclaimer:</u> This is a technical demonstration of a website template.
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
</template>
