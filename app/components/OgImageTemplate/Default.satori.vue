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

// Fallback values in case config is missing/failed to load
const og = {
  primary: appConfig.ogImage?.primary || '#22c55e',
  bgLight: appConfig.ogImage?.bgLight || '#ffffff',
  bgDark: appConfig.ogImage?.bgDark || '#0f172a',
  textLight: appConfig.ogImage?.textLight || '#64748b',
  textDark: appConfig.ogImage?.textDark || '#94a3b8',
}
</script>

<template>
  <div
    class="w-full h-full flex flex-row p-12"
    :class="[
      `bg-[${og.bgLight}] dark:bg-[${og.bgDark}]`,
      `text-[${og.textLight}] dark:text-[${og.textDark}]`,
    ]"
  >
    <!-- Left Content Side -->
    <div class="flex flex-col justify-between h-full" :class="[image ? 'w-2/3 pr-12' : 'w-full']">
      <div class="flex flex-col items-start">
        <img alt="Logo" class="mb-16 h-16 block dark:hidden" :src="appConfig.general?.logo?.light || ''">
        <img alt="Logo" class="mb-16 h-16 hidden dark:block" :src="appConfig.general?.logo?.dark || ''">

        <div v-if="headline" class="text-2xl font-bold uppercase tracking-widest">
          {{ headline }}
        </div>

        <h1 :class="`text-6xl font-bold leading-tight mb-6 -mt-1 text-[${og.primary}]`">
          {{ title }}
        </h1>

        <p v-if="description" class="text-2xl font-medium leading-normal line-clamp-4">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Right Image Side (Optional) -->
    <div v-if="image" class="w-1/3 h-full flex items-center justify-center">
      <img alt="Optional Image" class="w-full h-full object-cover rounded-3xl" :src="image">
    </div>
  </div>
</template>
