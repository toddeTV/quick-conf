<script setup lang="ts">
import type { SponsorsCollectionItem } from '@nuxt/content'
import type { DisplaySponsorMode } from '~/types/display'

const props = defineProps<{
  mode: DisplaySponsorMode
  orientation: 'horizontal' | 'vertical'
  sponsorColumns: number
  sponsors: SponsorsCollectionItem[]
}>()

const modeRef = computed(() => props.mode)
const sponsorsRef = computed(() => props.sponsors)
const { allSponsors, rotatingSponsor } = useDisplaySponsors(sponsorsRef, modeRef)

const defaultColumns = computed(() => {
  if (props.orientation === 'vertical') {
    return 2
  }

  return 3
})

const allModeGridStyle = computed(() => {
  const sponsorCount = Math.max(1, allSponsors.value.length)
  const columns = props.sponsorColumns > 0
    ? Math.min(Math.max(1, Math.trunc(props.sponsorColumns)), sponsorCount)
    : Math.min(defaultColumns.value, sponsorCount)

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
})

const isSingleSponsor = computed(() => allSponsors.value.length === 1)
</script>

<template>
  <div
    v-if="mode !== 'off'"
    class="rounded-lg border border-neutral-200 bg-white/90 p-3 dark:border-neutral-700 dark:bg-neutral-900/90"
  >
    <div class="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-300">
      Sponsors
    </div>

    <div
      v-if="mode === 'all'"
      class="grid gap-2"
      :class="{ 'min-h-24 place-items-center': isSingleSponsor }"
      :style="allModeGridStyle"
    >
      <ULink
        v-for="sponsor in allSponsors"
        :key="sponsor.slug"
        class="flex h-16 w-full items-center justify-center rounded p-2"
        :to="sponsor.url || undefined"
      >
        <NuxtImg
          :alt="`Sponsor ${sponsor.slug}`"
          class="max-h-full w-auto max-w-full object-contain"
          :src="sponsor.image"
        />
      </ULink>
    </div>

    <div v-if="mode === 'rotate'" class="flex min-h-24 items-center justify-center">
      <ULink
        v-if="rotatingSponsor"
        :key="rotatingSponsor.slug"
        class="flex h-24 w-full items-center justify-center rounded p-2"
        :to="rotatingSponsor.url || undefined"
      >
        <NuxtImg
          :alt="`Sponsor ${rotatingSponsor.slug}`"
          class="max-h-full w-auto max-w-full object-contain"
          :src="rotatingSponsor.image"
        />
      </ULink>

      <div
        v-else
        class="flex h-24 items-center justify-center rounded border border-dashed border-neutral-300 text-xs
          text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
      >
        No sponsors available.
      </div>
    </div>
  </div>
</template>
