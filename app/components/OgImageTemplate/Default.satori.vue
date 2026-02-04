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
 *    This avoids complex parsing of CSS files and ensures data consistency with Nuxt Studio.
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
</script>

<template>
  <!--
    We inject the resolved HEX values directly into classes/styles.
    This bypasses CSS variable resolution issues in Satori.
  -->
  <div class="w-full h-full flex flex-col">
    <style>
      .root-container {
      background-color: {{ appConfig.ogImage.bgLight }};
      color: {{ appConfig.ogImage.textLight }};
      }

      /* Dark mode overrides */
      .dark .root-container {
      background-color: {{ appConfig.ogImage.bgDark }};
      color: {{ appConfig.ogImage.textDark }};
      }

      .text-primary-resolved {
      color: {{ appConfig.ogImage.primary }};
      }
    </style>

    <!-- Main Content Container -->
    <div class="root-container w-full h-full flex flex-row p-12" :class="[image ? 'w-2/3 pr-12' : 'w-full']">
      <!-- Left Content Side -->
      <div class="flex flex-col justify-between h-full w-full">
        <div class="flex flex-col items-start">
          <img alt="Logo" class="mb-16 h-16 block dark:hidden" :src="appConfig.general?.logo?.dark || ''">
          <img alt="Logo" class="mb-16 h-16 hidden dark:block" :src="appConfig.general?.logo?.light || ''">

          <div v-if="headline" class="text-2xl font-bold uppercase tracking-widest text-primary-resolved">
            {{ headline }}
          </div>

          <h1 class="text-6xl font-bold leading-tight mb-6 -mt-1 text-primary-resolved">
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
