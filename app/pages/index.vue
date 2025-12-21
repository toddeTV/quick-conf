<script setup lang="ts">
import {
  AppLandingCta,
  AppLandingFeatures,
  AppLandingHero,
  AppLandingSection,
  AppLandingSpeakers,
  AppLandingSponsors,
  AppLandingTestimonials,
} from '#components'
import { isNil } from 'lodash-es'

const componentsMap: Record<string, Component> = {
  AppLandingHero,
  AppLandingSection,
  AppLandingFeatures,
  AppLandingSpeakers,
  AppLandingTestimonials,
  AppLandingSponsors,
  AppLandingCta,
}

const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const { data: _page } = await useAsyncData('index-first', () => queryCollection('index').first())

if (isNil(_page.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Landing Page Data not Found',
    fatal: true,
  })
}

// we tested above that these are not nil, so we can assert the types here safely by removing nil from them
const page = _page as globalThis.Ref<NonNullable<typeof _page.value>>

const renderedBlocks = computed(() => {
  if (!page.value?.blocks)
    return []

  return page.value.blocks
    .filter((block) => {
      if (!componentsMap[block.component]) {
        console.warn(`[Landing Page] Component "${block.component}" not found in componentsMap.`)
        return false
      }
      return true
    })
    .map((block, index) => {
      const { component: componentName, ...props } = block
      const Component = componentsMap[componentName]

      return {
        is: Component,
        props,
        key: `${componentName}-${index}`,
      }
    })
})

const seoMetadata = extractSeoMetadata(page.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <div v-if="page.blocks">
    <template v-for="block in renderedBlocks" :key="block.key">
      <component :is="block.is" v-bind="block.props" />
    </template>
  </div>
</template>
