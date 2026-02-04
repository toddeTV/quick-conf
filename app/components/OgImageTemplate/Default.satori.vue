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
 * 4. Tailwind & CSS Variables:
 *    Satori does NOT load global CSS or Nuxt UI's runtime-generated Tailwind config.
 *    Classes like `text-primary-500` or variables like `--ui-bg` (from `custom-styles.css`)
 *    will not work automatically. We must manually resolve these from `app.config` and
 *    `custom-styles.css` and inject them into a local `<style>` block.
 */

import customStylesRaw from '../../../public/custom-styles.css?raw'

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

// We extract the `.satori-root` CSS block from ``custom-styles.css` to get the variables for Satori.
let ogStyles = ''
const match = customStylesRaw.match(/\.satori-root\s*\{[\s\S]*?\}/)
if (match) {
  ogStyles = match[0]
}
</script>

<template>
  <!--
    We use a wrapper that defines the CSS variables.
    Satori supports nested style tags or style attributes.
    We'll direct-bind the background to the variable.
  -->
  <div
    class="w-full h-full flex flex-row p-12 root-container satori-root"
  >
    <style>
      {{ ogStyles }}

      .root-container {
      /* Bind to the variables defined in .satori-root (from custom-styles.css) */
      background-color: var(--og-bg-light);
      color: var(--og-text-light);
      }

      /* Dark mode overrides */
      .dark .root-container {
      background-color: var(--og-bg-dark);
      color: var(--og-text-dark);
      }

      .text-primary-resolved {
      color: var(--og-primary);
      }
    </style>

    <!-- Left Content Side -->
    <div class="flex flex-col justify-between h-full" :class="[image ? 'w-2/3 pr-12' : 'w-full']">
      <!-- Top Section -->
      <div class="flex flex-col items-start">
        <img alt="Logo" class="mb-16 h-16 block dark:hidden" :src="appConfig.general?.logo?.dark || ''">
        <img alt="Logo" class="mb-16 h-16 hidden dark:block" :src="appConfig.general?.logo?.light || ''">

        <pre>empty</pre>
        <pre>{{ ogStyles }}</pre>

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
</template>
