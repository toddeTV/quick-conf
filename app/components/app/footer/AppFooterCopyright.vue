<script setup lang="ts">
const appConfig = useAppConfig()

const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general.conferenceFoundingYear === 0
  ? yearCurrent
  : appConfig.general.conferenceFoundingYear
const yearSpan = yearStart === yearCurrent ? String(yearStart) : `${yearStart} - ${yearCurrent}`
</script>

<template>
  <p class="text-muted text-sm">
    Copyright © {{ yearSpan }}. All rights reserved.
  </p>
</template>
