<script setup lang="ts">
/**
 * META DOCUMENTATION: Satori & OG Image Generation Limitations
 *
 * 1. Image Handling on Vercel:
 *    We use standard <img> tags instead of <NuxtImg>.
 *    Reason: <NuxtImg> attempts to use Vercel's Image Optimization API. When running inside the
 *    Serverless Function that generates the OG image (Satori), fetching from the optimization API
 *    often fails (Error 500) due to internal network restrictions (loopback issues) or authentication.
 *    Satori works best with raw public URLs or file system paths provided to standard <img> tags.
 *
 * 2. Helper Functions & Auto-Imports:
 *    Satori components (.satori.vue) run in an isolated server-side environment (Nitro).
 *    While basic Nuxt context (useAppConfig, useRuntimeConfig) is available, full auto-import
 *    support for custom utils or composables (like `resolveImagePath`) is often limited or causes
 *    type-checking errors (`vue-tsc` / `pnpm run test:types`).
 *
 * 3. Nuxt Context:
 *    The context is minimal. Browser APIs (window, document) are unavailable.
 *    Complex Nuxt plugins or stores (Pinia) are usually not accessible or initialized
 *    in this isolated render process.
 *
 * 4. CSS Variables:
 *    We read the configured OG Image colors directly from `appConfig.ogImage`.
 *    We inject them as Tailwind arbitrary values (e.g. `bg-[#abcdef]`) because Satori has limited
 *    support for complex `<style>` blocks or CSS variables from external files.
 *    (So no `<style>' block and no `var(...)` inside CSS is possible.)
 */

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
const og = computed(() => appConfig.ogImage || {
  primary: '#22c55e',
  bgLight: '#ffffff',
  bgDark: '#0f172a',
  textLight: '#64748b',
  textDark: '#94a3b8',
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div
      class="w-full h-full flex flex-row p-12"
      :class="[
        image ? 'w-2/3 pr-12' : 'w-full',
        `bg-[${og.bgLight}] dark:bg-[${og.bgDark}]`,
        `text-[${og.textLight}] dark:text-[${og.textDark}]`,
      ]"
    >
      <!-- Left Content Side -->
      <div class="flex flex-col justify-between h-full w-full">
        <div class="flex flex-col items-start">
          <img alt="Logo" class="mb-16 h-16 block dark:hidden" :src="appConfig.general?.logo?.light || ''">
          <img alt="Logo" class="mb-16 h-16 hidden dark:block" :src="appConfig.general?.logo?.dark || ''">

          <div v-if="headline" :class="`text-2xl font-bold uppercase tracking-widest text-[${og.primary}]`">
            {{ headline }}
          </div>

          <h1
            class="text-6xl font-bold leading-tight mb-6 -mt-1"
            :class="`text-[${og.primary}]`"
          >
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
  </div>
</template>
