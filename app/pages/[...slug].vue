<script setup lang="ts">
const route = useRoute()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const staticAssetNamespacePattern = /^\/(?:_nuxt|__nuxt_icon|_ipx|assets)\//i
const staticAssetExtensionPattern = /\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|txt|webp|woff2?|xml|webmanifest)$/i

if (staticAssetNamespacePattern.test(route.path) && staticAssetExtensionPattern.test(route.path)) {
  throw createError({
    statusCode: 404,
    statusMessage: `Asset "${route.path}" not Found`,
    fatal: false,
  })
}

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
