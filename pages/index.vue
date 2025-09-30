<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(route.path, () => queryCollection('index').first())

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Landing Page not Found',
    fatal: true,
  })
}

const title = data.value.seo.title || data.value.title
const description = data.value.seo.description || data.value.description

useSeoMeta({
  ...getSeoMetaBase(title, description),
})
</script>

<template>
  <template v-if="data">
    <UPageHero
      :description="data.description"
      :title="data.title"
    >
      <template #top>
        <div
          class="absolute rounded-full dark:bg-primary blur-[300px] size-60 sm:size-80 transform
                 -translate-x-1/2 left-1/2 -translate-y-80"
        />
      </template>
    </UPageHero>

    <UContainer v-for="(index) in [...Array(20).keys()]" :key="index" class="mb-8">
      <AppPlaceholder class="h-32" />
    </UContainer>
  </template>
</template>
