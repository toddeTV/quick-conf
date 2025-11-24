<script setup lang="ts">
const colorMode = useColorMode()
const appConfig = useAppConfig()
const { autoSwitchOnColorMode } = useImgPaths()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : '#ffffff')

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }, // TODO used or delete?
  ],
  link: [
    {
      rel: 'icon',
      // href: '/favicon.svg',
      href: autoSwitchOnColorMode({
        dark: appConfig.general?.favicon?.dark,
        light: appConfig.general?.favicon?.light,
      }),
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
}))

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
