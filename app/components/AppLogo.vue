<script setup lang="ts">
const appConfig = useAppConfig()
const { resolveImagePath } = useImgPaths()

const images = resolveImagePath({
  dark: appConfig.general?.logo?.dark,
  light: appConfig.general?.logo?.light,
})
</script>

<template>
  <UColorModeImage
    alt="App Logo"
    :dark="images.dark"
    :light="images.light"
    loading="eager"
    placeholder
    preload
  />
</template>
