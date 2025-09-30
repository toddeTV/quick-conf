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
          id="pattern-cb49ce14-2657-4b6a-ad69-bcaed71606f4"
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
        fill="url(#pattern-cb49ce14-2657-4b6a-ad69-bcaed71606f4)"
        height="100%"
        stroke="none"
        width="100%"
      />
    </svg>

    <slot />
  </div>
</template>
