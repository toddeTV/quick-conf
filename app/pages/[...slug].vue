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

defineOgImageComponent('DefaultSatori', {
  headline: 'Page',
  title: seoMetadata.title,
  description: seoMetadata.description,
})
</script>

<template>
  <template v-if="page">
    <UContainer class="pt-3 pb-8">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: page.title },
        ]"
      />

      <ContentRenderer v-if="page.body" class="mt-8" :value="page" />
    </UContainer>
  </template>
</template>
