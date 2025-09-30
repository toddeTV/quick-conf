<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('pages').path(`/pages${route.path}`).first())

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page "${route.path}" not Found`,
    fatal: true,
  })
}

const title = page.value.seo.title || page.value.title
const description = page.value.seo.description || page.value.description

useSeoMeta({
  ...getSeoMetaBase(title, description),
})
</script>

<template>
  <template v-if="page">
    <UContainer>
      <ContentRenderer v-if="page.body" :value="page" />
    </UContainer>
  </template>
</template>
