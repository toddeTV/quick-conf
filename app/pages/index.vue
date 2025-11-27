<script setup lang="ts">
import { isNil } from 'lodash-es'

const { extractSeoMetadata, getSeoMetaBase } = useSeo()

const [
  { data: _page },
  { data: _sponsors },
  { data: _speakers },
] = await Promise.all([
  useAsyncData('index-first', () => queryCollection('index').first()),
  useAsyncData('sponsors-all', () => queryCollection('sponsors').all()),
  useAsyncData('speakers-featured-all', () =>
    queryCollection('speakers').where('featured', '=', true).order('featured', 'DESC').all()),
])

if (isNil(_page.value) || isNil(_sponsors.value) || isNil(_speakers.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Landing Page Data not Found',
    fatal: true,
  })
}

// we tested above that these are not nil, so we can assert the types here safely by removing nil from them
const page = _page as globalThis.Ref<NonNullable<typeof _page.value>>
const sponsors = _sponsors as globalThis.Ref<NonNullable<typeof _sponsors.value>>
const speakers = _speakers as globalThis.Ref<NonNullable<typeof _speakers.value>>

const seoMetadata = extractSeoMetadata(page.value)
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})
</script>

<template>
  <!-- hero -->
  <UPageHero
    :description="page.description"
    :links="page.hero.links"
    :title="page.title"
  >
    <template #top>
      <div
        class="absolute rounded-full bg-primary-600 dark:bg-primary blur-[300px] size-60 sm:size-80
        transform -translate-x-1/2 left-1/2 -translate-y-80"
      />
      <LazyAppStarsBg
        :size="{
          min: 1,
          max: 3,
        }"
      />
    </template>
  </UPageHero>

  <!-- sections -->
  <template v-if="page.sections">
    <template
      v-for="(section, index) in page.sections"
      :key="index"
    >
      <UPageSection
        :description="section.description"
        :features="section.features"
        :headline="section.headline"
        :orientation="section.orientation"
        :reverse="section.reverse"
        :title="section.title"
      >
        <NuxtImg
          :alt="section.image.alt"
          class="w-full rounded-lg h-full object-cover"
          :src="section.image.src"
        />
      </UPageSection>
    </template>
  </template>

  <!-- features -->
  <template v-if="page.features">
    <UPageSection
      :description="page.features.description"
      :headline="page.features.headline"
      :title="page.features.title"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>
  </template>

  <!-- speakers -->
  <template v-if="page.speakers && speakers.length > 0">
    <UPageSection>
      <AppSpeakerGrid :speakers="speakers" />
    </UPageSection>
  </template>

  <!-- testimonials -->
  <template v-if="page.testimonials">
    <UPageSection
      :description="page.testimonials.description"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
          variant="subtle"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>
  </template>

  <!-- sponsors -->
  <template v-if="page.sponsors && sponsors.length > 0">
    <UPageSection
      :description="page.sponsors.description"
      :headline="page.sponsors.headline"
      :title="page.sponsors.title"
    >
      <UPageGrid>
        <UPageCard
          v-for="(sponsor, index) in sponsors"
          :key="index"
          rel="noopener noreferrer"
          spotlight
          target="_blank"
          :to="sponsor.url"
          variant="subtle"
        >
          <template #default>
            <NuxtImg
              :alt="`Logo of sponsor ${sponsor.slug}`"
              class="mx-auto h-12 w-full object-contain dark:invert"
              :src="sponsor.image"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </template>

  <!-- cta -->
  <template v-if="page.cta">
    <USeparator />
    <UPageCTA
      v-bind="page.cta"
      class="overflow-hidden"
      variant="naked"
    >
      <div
        class="absolute rounded-full bg-primary-600 dark:bg-primary blur-[250px] size-40 sm:size-50
        transform -translate-x-1/2 left-1/2 -translate-y-80"
      />

      <LazyAppStarsBg
        :size="{
          min: 1,
          max: 3,
        }"
      />
    </UPageCTA>
  </template>
</template>
