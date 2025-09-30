<script setup lang="ts">
// Generate a random UUID-like ID using Math.random()
const randomId = `pattern-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`
</script>

<template>
  <div
    class="relative overflow-hidden rounded-sm border border-dashed
           border-accented opacity-75 px-4 flex items-center justify-center"
  >
    <svg
      aria-hidden="true"
      class="absolute inset-0 h-full w-full stroke-inverted/10"
      fill="none"
      focusable="false"
    >
      <defs>
        <pattern
          :id="randomId"
          height="10"
          patternUnits="userSpaceOnUse"
          width="10"
          x="0"
          y="0"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>
      <rect
        :fill="`url(#${randomId})`"
        height="100%"
        stroke="none"
        width="100%"
      />
    </svg>

    <slot />
  </div>
</template>
