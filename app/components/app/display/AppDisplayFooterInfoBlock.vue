<script setup lang="ts">
const appConfig = useAppConfig()

const conferenceLabel = computed(() => {
  const conferenceName = appConfig.general.conferenceName || ''
  const conferenceYear = appConfig.general.conferenceFoundingYear

  if (!conferenceYear) {
    return conferenceName
  }

  return `${conferenceName} ${conferenceYear}`.trim()
})
</script>

<template>
  <UCard
    :ui="{
      body: 'space-y-2',
    }"
  >
    <div class="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
      Conference
    </div>

    <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
      {{ conferenceLabel }}
    </div>

    <AppFooterCopyright />
    <AppFooterBuiltWith />
  </UCard>
</template>
