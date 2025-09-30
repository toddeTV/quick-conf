<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const statusCode = props.error.statusCode || undefined
const statusCodeString = statusCode === 404 ? 'Not Found' : 'Error'
const title = statusCodeString
const description = statusCode === 404
  ? 'We are sorry but this resource could not be found.'
  : 'We are sorry but an error occurred while processing your request.'

useSeoMeta({
  ...getSeoMetaBase(title, description),
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
