<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const error: NuxtError<unknown> = props.error ?? {
  statusCode: 500,
  fatal: true,
  unhandled: true,
  name: 'Unknown Error',
  message: 'An unknown error occurred',
  toJSON: () => ({
    statusCode: 500,
    message: 'An unknown error occurred',
  }),
}

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const seoMetadata = extractSeoMetadata({
  title: error.statusCode === 404 ? 'Not Found' : 'Error',
  description: error.statusCode === 404
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
