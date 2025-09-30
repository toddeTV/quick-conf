<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : '#ffffff')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  // titleTemplate: '%s',
  // TODO
  // ogImage: '',
  // twitterImage: '',
  // twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
