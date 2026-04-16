<script setup lang="ts">
import { version } from '~~/package.json'
</script>

<template>
  <p class="text-muted text-sm">
    Created with
    <UIcon
      aria-hidden="true"
      class="mx-0.5 inline-block h-3.5 w-3.5"
      name="lucide:heart"
    />
    via
    <ULink
      aria-label="quick-conf GitHub repository"
      class="text-primary/70"
      target="_blank"
      to="https://github.com/toddeTV/quick-conf"
    >
      quick-conf
    </ULink>
    <ULink
      class="mx-0.5"
      target="_blank"
      :to="`https://github.com/toddeTV/quick-conf/blob/v${version}/docs/README.md`"
    >
      v{{ version }}
    </ULink>
    by
    <ULink
      aria-label="todde.tv website"
      class="text-primary/70"
      target="_blank"
      to="https://todde.tv"
    >
      todde.tv
    </ULink>
  </p>
</template>
