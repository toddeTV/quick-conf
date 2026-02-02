<script setup lang="ts">
defineOptions({
  inheritAttrs: false, // inherited attrs can mess up satori parser
})

defineProps<{
  headline?: string
  title: string
  description?: string
  image?: string
}>()

const appConfig = useAppConfig()

// TODO would be better to use `resolveImagePath` here, but inside a satori component it seems not to work
// due to no auto imports and therefore `pnpm run test:types` fails.
const logoSrc = appConfig.general?.logo?.light
</script>

<template>
  <div class="w-full h-full flex flex-row p-12">
    <!-- Left Content Side -->
    <div class="flex flex-col justify-between h-full" :class="[image ? 'w-2/3 pr-12' : 'w-full']">
      <!-- Top Section -->
      <div class="flex flex-col items-start">
        <NuxtImg alt="Logo" class="mb-16 h-16" :src="logoSrc" />

        <div v-if="headline" class="text-2xl font-bold text-gray-500 uppercase tracking-widest">
          {{ headline }}
        </div>

        <h1 class="text-6xl font-bold text-gray-900 leading-tight mb-6 -mt-1">
          {{ title }}
        </h1>

        <p v-if="description" class="text-2xl text-gray-500 font-medium leading-normal line-clamp-4">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Right Image Side (Optional) -->
    <div v-if="image" class="w-1/3 h-full flex items-center justify-center">
      <NuxtImg alt="Optional Image" class="w-full h-full object-cover rounded-3xl" :src="image" />
    </div>
  </div>
</template>
