<script setup lang="ts">
const route = useRoute()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('pages').path(`/pages${route.path}`).first())

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page "${route.path}" not Found`,
    fatal: true,
  })
}

const seoMetadata = extractSeoMetadata(page.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <template v-if="page">
    <UContainer>
      <ContentRenderer v-if="page.body" :value="page" />
    </UContainer>
  </template>
</template>
