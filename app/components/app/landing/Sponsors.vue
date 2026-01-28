<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  showViewAll?: boolean
  viewAllLink?: string
}>(), {
  showViewAll: false,
  viewAllLink: '/faq/sponsors',
})

const { data: sponsors } = await useAsyncData('sponsors-all', () => queryCollection('sponsors').all())
</script>

<template>
  <template v-if="sponsors && sponsors.length > 0">
    <UPageSection
      :description="description"
      :headline="headline"
      :title="title"
    >
      <UPageGrid>
        <UPageCard
          v-for="sponsor in sponsors"
          :key="sponsor.slug"
          class="flex h-32 items-center justify-center text-center"
          rel="noopener noreferrer"
          spotlight
          target="_blank"
          :to="sponsor.url"
          variant="subtle"
        >
          <template #default>
            <NuxtImg
              :alt="`Logo of sponsor ${sponsor.slug}`"
              class="mx-auto h-20 w-full object-contain"
              :src="sponsor.image"
            />
          </template>
        </UPageCard>

        <UPageCard
          v-if="showViewAll"
          class="flex h-32 items-center justify-center text-center"
          spotlight
          :to="viewAllLink"
          variant="subtle"
        >
          <div class="flex flex-col items-center gap-y-2">
            <UIcon
              class="text-4xl"
              name="i-lucide-handshake"
            />
            <span class="text-lg font-medium text-gray-900 dark:text-white">
              View All Sponsors
            </span>
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </template>
</template>
