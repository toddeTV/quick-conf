import type { SponsorsCollectionItem } from '@nuxt/content'
import type { DisplaySponsorMode } from '~/types/display'

export function useDisplaySponsors(
  sponsors: Ref<SponsorsCollectionItem[] | null | undefined>,
  sponsorMode: Ref<DisplaySponsorMode>,
) {
  const currentIndex = ref(0)
  let rotationTimer: ReturnType<typeof setInterval> | undefined

  const allSponsors = computed(() => sponsors.value ?? [])

  const rotatingSponsor = computed(() => {
    if (allSponsors.value.length === 0) {
      return undefined
    }

    return allSponsors.value[currentIndex.value % allSponsors.value.length]
  })

  function stopRotation() {
    if (!rotationTimer) {
      return
    }

    clearInterval(rotationTimer)
    rotationTimer = undefined
  }

  function startRotation() {
    if (!import.meta.client) {
      return
    }

    stopRotation()

    if (sponsorMode.value !== 'rotate' || allSponsors.value.length === 0) {
      return
    }

    rotationTimer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % allSponsors.value.length
    }, 5000)
  }

  watch([() => allSponsors.value.length, sponsorMode], ([length]) => {
    if (length === 0) {
      currentIndex.value = 0
      stopRotation()
      return
    }

    currentIndex.value = 0
    startRotation()
  }, { immediate: true })

  watch(allSponsors, (nextSponsors) => {
    if (nextSponsors.length === 0) {
      currentIndex.value = 0
      return
    }

    if (currentIndex.value >= nextSponsors.length) {
      currentIndex.value = 0
    }
  })

  onUnmounted(() => {
    stopRotation()
  })

  return {
    allSponsors,
    rotatingSponsor,
  }
}
