<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const statusCode = props.error.statusCode || undefined

const seoMetadata = extractSeoMetadata({
  title: statusCode === 404 ? 'Not Found' : 'Error',
  description: statusCode === 404
    ? 'We are sorry but this resource could not be found.'
    : 'We are sorry but an error occurred while processing your request.',
})
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
