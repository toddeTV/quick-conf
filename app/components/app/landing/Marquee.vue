<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string // TODO not used
  description?: string // TODO not used
  headline?: string // TODO not used
  images: {
    src: string
    alt?: string
  }[]
  direction?: 'left' | 'right'
  speed?: number // duration in seconds
  gap?: number // gap in px
}>(), {
  direction: 'left',
  speed: 20,
  gap: 0,
})

const style = computed(() => ({
  '--marquee-duration': `${props.speed}s`,
  '--marquee-gap': `${props.gap}px`,
}))
</script>

<template>
  <div class="relative flex overflow-hidden py-8" :style="style">
    <div
      class="flex shrink-0 items-center justify-start gap-(--marquee-gap) animate-marquee"
      :class="{ 'animate-marquee-reverse': direction === 'right' }"
    >
      <NuxtImg
        v-for="(image, index) in images"
        :key="index"
        :alt="image.alt"
        class="max-w-none h-32 object-contain"
        :src="image.src"
      />
    </div>
    <div
      aria-hidden="true"
      class="flex shrink-0 items-center justify-start gap-(--marquee-gap) animate-marquee
      ml-(--marquee-gap)"
      :class="{ 'animate-marquee-reverse': direction === 'right' }"
    >
      <NuxtImg
        v-for="(image, index) in images"
        :key="`clone-${index}`"
        :alt="image.alt"
        class="max-w-none h-32 object-contain"
        :src="image.src"
      />
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee var(--marquee-duration) linear infinite;
}

.animate-marquee-reverse {
  animation-direction: reverse;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--marquee-gap)));
  }
}
</style>
