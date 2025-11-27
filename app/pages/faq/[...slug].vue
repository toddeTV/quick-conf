<script setup lang="ts">
import { isNil } from 'lodash-es'

const route = useRoute()
const appConfig = useAppConfig()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

// Fetch all FAQ pages for navigation, sorted by order field
const { data: _faqPages } = await useAsyncData(
  'faq-all',
  () => queryCollection('faq').order('order', 'ASC').all(),
)

// Get the FAQ page data based on the content path
const { data: _page } = await useAsyncData(
  `faq-page-${route.path}`,
  () => queryCollection('faq').path(route.path).first(),
  { watch: [() => route.path] },
)

if (isNil(_faqPages.value) || isNil(_page.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'FAQ page not found',
    fatal: true,
  })
}

// we tested above that these are not nil, so we can assert the types here safely by removing nil from them
const faqPages = _faqPages as globalThis.Ref<NonNullable<typeof _faqPages.value>>
const page = _page as globalThis.Ref<NonNullable<typeof _page.value>>

// Fetch surrounding pages for prev/next navigation
const { data: surround } = await useAsyncData(
  `faq-surround-${route.path}`,
  () => queryCollectionItemSurroundings('faq', route.path),
  { watch: [() => route.path] },
)

const seoMetadata = extractSeoMetadata(page.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})

// Build breadcrumb items based on current page
const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Home', to: '/' },
    { label: 'FAQ' },
  ]

  // Add current page title if not on the FAQ index
  if (route.path !== '/faq' && page.value?.title) {
    items[items.length - 1]!.to = '/faq'
    items.push({
      label: page.value.title,
    })
  }

  return items
})
</script>

<template>
  <UContainer>
    <UBreadcrumb
      class="pt-3"
      :items="breadcrumbItems"
    />

    <UPageHeader
      :description="`Frequently asked questions about ${appConfig.general.conferenceName}`"
      title="FAQ"
    />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
      <aside class="lg:col-span-1">
        <UContentNavigation
          :navigation="faqPages.map(page => ({
            ...page,
          }))"
          variant="pill"
        />
      </aside>

      <main class="lg:col-span-3 order-1 lg:order-2">
        <UPage>
          <UPageBody>
            <ContentRenderer v-if="page?.body" :value="page" />
          </UPageBody>
        </UPage>

        <UContentSurround class="mt-8" :surround="surround" />
      </main>
    </div>
  </UContainer>
</template>
