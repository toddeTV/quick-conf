<script setup lang="ts">
import type { DisplayQrCodeStyle } from '~/types/display'
import { generateQrCodeDataUrl, getDisplayQrCodeColors } from '~/utils/qr-code'

const props = defineProps<{
  orientation: 'horizontal' | 'vertical'
  qrCodeStyle: DisplayQrCodeStyle
  scheduleUrl: string
}>()

const qrImageSrc = ref('')
let latestQrRequestId = 0

/**
 * Generates a QR image data URL for the current schedule URL and style.
 *
 * @returns {Promise<void>} Promise resolved after QR source update.
 */
async function generateQrImage(): Promise<void> {
  const requestId = ++latestQrRequestId

  if (!props.scheduleUrl) {
    // Clear stale image when no schedule URL is available.
    qrImageSrc.value = ''
    return
  }

  const colors = getDisplayQrCodeColors(props.qrCodeStyle)

  try {
    const nextQrSrc = await generateQrCodeDataUrl(props.scheduleUrl, {
      darkColor: colors.darkColor,
      lightColor: colors.lightColor,
      margin: 1,
      width: 220,
    })

    if (requestId !== latestQrRequestId) {
      return
    }

    qrImageSrc.value = nextQrSrc
  }
  catch {
    if (requestId !== latestQrRequestId) {
      return
    }

    qrImageSrc.value = ''
  }
}

watch([
  () => props.scheduleUrl,
  () => props.qrCodeStyle,
], async () => {
  if (!import.meta.client) {
    return
  }

  await generateQrImage()
}, {
  immediate: true,
})

const rootClass = computed(() => {
  if (props.orientation === 'vertical') {
    return 'h-full w-full'
  }

  return 'w-full'
})
</script>

<template>
  <div
    class="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white/90 p-3 text-center
      dark:border-neutral-700 dark:bg-neutral-900/90"
    :class="rootClass"
  >
    <div
      class="self-start text-left text-xs font-semibold uppercase tracking-wider text-neutral-500
        dark:text-neutral-300"
    >
      View full schedule
    </div>

    <NuxtImg
      v-if="qrImageSrc"
      alt="QR code to full schedule"
      class="size-28"
      height="112"
      :src="qrImageSrc"
      width="112"
    />

    <div class="max-w-44 truncate text-[11px] text-neutral-500 dark:text-neutral-400">
      {{ scheduleUrl }}
    </div>
  </div>
</template>
