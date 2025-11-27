<script setup lang="ts">
import type { PageAnchor } from '@nuxt/ui'
import { isNil } from 'lodash-es'

const route = useRoute()
const { extractSeoMetadata, getSeoMetaBase } = useSeo()

let slug_speaker: string
try {
  slug_speaker = normalizeSlug(route.params.slug)
}
catch (error) {
  throw createError({
    statusCode: 404,
    statusMessage: error instanceof Error ? error.message : 'No Speaker Provided',
    fatal: true,
  })
}

const { data: speaker } = await useAsyncData(route.path, () =>
  queryCollection('speakers').where('slug', '=', slug_speaker).first())

if (!speaker.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Speaker "${slug_speaker}" not Found`,
    fatal: true,
  })
}

const { data: talks } = await useAsyncData(`${route.path}-talks`, () =>
  queryCollection('talks').where('speakers', 'LIKE', `%"${slug_speaker}"%`).all())

const seoMetadata = extractSeoMetadata({
  ...extractSeoMetadata(speaker.value),
  title: speaker.value.name, // `title` is present, but it is the filename, not the speaker name, so set manually
})
// const { title, description } = seoMetadata

useSeoMeta({
  ...getSeoMetaBase(seoMetadata),
})

const socialLinks = computed((): PageAnchor[] => {
  if (isNil(speaker.value) || isNil(speaker.value.socialMedia))
    return []

  return speaker.value.socialMedia.map(social => ({
    label: social.description || social.url,
    to: social.url,
    target: '_blank',
    icon: social.icon || getIconForUrl(social.url),
  }))
})
</script>

<template>
  <template v-if="speaker">
    <UContainer class="pt-3">
      <UPageBody>
        <UPageCard
          :ui="{
            root: 'mt-12 overflow-visible',
          }"
          variant="subtle"
        >
          <div class="flex flex-col sm:flex-row gap-6">
            <div>
              <div class="relative aspect-4/3 w-60 -translate-y-8 sm:-translate-y-12 transform">
                <NuxtImg
                  :alt="`Picture of ${speaker.name}`"
                  class="h-full w-full rounded-lg object-cover ring-2 ring-white dark:ring-gray-900"
                  densities="1x 2x"
                  fit="cover"
                  format="webp"
                  height="300"
                  quality="80"
                  :src="speaker.image"
                  width="400"
                />
              </div>
            </div>
            <div class="w-full">
              <UPageHeader
                :description="speaker.description"
                headline="Speaker"
                :title="speaker.name"
                :ui="{
                  root: 'border-b-0!',
                }"
              />
              <!-- <UPageAnchors :links="socialLinks" /> -->
              <!-- <UFooterColumns
                :columns="[{
                  label: '',
                  children: socialLinks,
                }]"
              /> -->
              <div class="flex flex-wrap gap-4 -mt-2">
                <UTooltip
                  v-for="link in socialLinks"
                  :key="link.label"
                  :text="link.label"
                >
                  <UButton
                    :aria-label="link.label"
                    class="rounded-full"
                    color="neutral"
                    :icon="link.icon"
                    size="xl"
                    :target="link.target"
                    :to="link.to"
                    variant="subtle"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
        </UPageCard>

        <!-- speaker bio -->
        <div class="prose dark:prose-invert">
          <ContentRenderer v-if="speaker.body" :value="speaker" />
        </div>

        <!-- talks -->
        <div>
          <ProseH2>
            Talks & Workshops
          </ProseH2>
          <template v-if="!isNil(talks) && talks.length > 0">
            <div class="flex flex-col gap-y-4">
              <UPageCard
                v-for="talk in talks"
                :key="talk.slug"
                :description="talk.type"
                spotlight
                :title="talk.title"
                :to="`/talks/${talk.slug}`"
              />
            </div>
          </template>
          <template v-else>
            <UAlert
              color="neutral"
              :description="`${speaker.name} currently has no talks or workshops listed.`"
              icon="i-lucide-info"
              variant="subtle"
            />
          </template>
        </div>
      </UPageBody>
    </UContainer>
  </template>
</template>
