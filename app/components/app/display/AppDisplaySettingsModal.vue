<script setup lang="ts">
import type { DisplaySettings } from '~/types/display'
import { copyToClipboard } from '~/utils/clipboard'

const props = defineProps<{
  availableDays: string[]
  availableStages: Array<{ name: string, slug: string }>
  finalUrl: string
  open: boolean
  settings: DisplaySettings
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'patchSettings': [value: Partial<DisplaySettings>]
}>()

const toast = useToast()

const dayOptions = computed(() => props.availableDays.map(day => ({
  label: day,
  value: day,
})))

const stageOptions = computed(() => props.availableStages.map(stage => ({
  label: stage.name,
  value: stage.slug,
})))

const modeItems = [
  { label: 'Full schedule timetable', value: 'timetable' },
  { label: 'All stages with details', value: 'all-details' },
  { label: 'One stage with details', value: 'stage-details' },
]

const orientationItems = [
  { label: 'Right side', value: 'horizontal' },
  { label: 'Bottom row', value: 'vertical' },
]

const sponsorItems = [
  { label: 'Off', value: 'off' },
  { label: 'Show all', value: 'all' },
  { label: 'Show one at a time, rotate every 5 seconds', value: 'rotate' },
]

const nextTalksLayoutItems = [
  { label: 'One row below active talk', value: 'row' },
  { label: 'One column below active talk', value: 'column' },
]

const qrCodeStyleItems = [
  { label: 'Black on white', value: 'black-on-white' },
  { label: 'White on black', value: 'white-on-black' },
  { label: 'Black on transparent', value: 'black-on-transparent' },
  { label: 'White on transparent', value: 'white-on-transparent' },
]

const themeItems = [
  { label: 'Follow site', value: 'site' },
  { label: 'Force light', value: 'light' },
  { label: 'Force dark', value: 'dark' },
]

const refreshItems = [
  { label: '60 seconds', value: '60' },
  { label: '120 seconds', value: '120' },
  { label: '300 seconds', value: '300' },
]

/**
 * Parses an integer input and clamps it to a configured range.
 *
 * @param {string | number | undefined} value - Raw numeric input.
 * @param {number} fallback - Value used when parsing fails.
 * @param {number} minValue - Lower clamp boundary.
 * @param {number} maxValue - Upper clamp boundary.
 * @returns {number} Safe integer inside the accepted range.
 */
function toSafeInteger(
  value: string | number | undefined,
  fallback: number,
  minValue: number,
  maxValue: number,
): number {
  const parsed = Number.parseInt(String(value ?? ''), 10)

  if (Number.isNaN(parsed)) {
    return fallback
  }

  return Math.min(maxValue, Math.max(minValue, parsed))
}

/**
 * Parses and clamps scale factor input for display zoom.
 *
 * @param {string | number | undefined} value - Raw scale input.
 * @returns {number} Scale factor inside supported bounds.
 */
function toSafeScale(value: string | number | undefined): number {
  const parsed = Number.parseFloat(String(value ?? '1'))

  if (Number.isNaN(parsed)) {
    return 1
  }

  return Math.min(1.8, Math.max(0.75, parsed))
}

/**
 * Maps input to the supported refresh presets.
 *
 * @param {string | number | undefined} value - Raw refresh input.
 * @returns {DisplaySettings['refreshSeconds']} Supported refresh interval.
 */
function toRefreshSeconds(value: string | number | undefined): DisplaySettings['refreshSeconds'] {
  const normalized = String(value ?? '300')

  if (normalized === '60') {
    return 60
  }

  if (normalized === '120') {
    return 120
  }

  if (normalized === '300') {
    return 300
  }

  return 300
}

/**
 * Closes the settings panel.
 *
 * @returns {void}
 */
function closePanel() {
  emit('update:open', false)
}

/**
 * Copies the final display URL to clipboard and shows success feedback.
 *
 * @returns {Promise<void>} Promise resolved after copy attempt.
 */
async function copyUrl() {
  const didCopy = await copyToClipboard(props.finalUrl)

  if (!didCopy) {
    toast.add({
      title: 'Copy failed',
      description: 'Could not copy URL to clipboard.',
      color: 'error',
      icon: 'lucide:clipboard-x',
    })
    return
  }

  toast.add({
    title: 'Copied to clipboard',
    description: 'The display URL is ready to share.',
    color: 'success',
    icon: 'lucide:copy-check',
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-250 ease-out"
    enter-from-class="translate-x-6 opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-6 opacity-0"
  >
    <aside v-if="open" class="h-full min-h-0 w-92 shrink-0 overflow-hidden">
      <UCard
        class="flex h-full min-h-0 flex-col"
        :ui="{
          body: 'min-h-0 flex-1 overflow-y-auto space-y-4 p-4',
          header: 'px-4 py-3',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Display Settings
              </div>

              <div class="text-xs text-neutral-500 dark:text-neutral-400">
                Changes apply live.
              </div>
            </div>

            <UButton
              aria-label="Close display settings"
              color="neutral"
              icon="lucide:x"
              variant="ghost"
              @click="closePanel"
            />
          </div>
        </template>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Layout
          </div>

          <UFormField label="Display mode">
            <USelect
              class="w-full"
              :items="modeItems"
              :model-value="settings.mode"
              @update:model-value="emit('patchSettings', { mode: $event as DisplaySettings['mode'] })"
            />
          </UFormField>

          <UFormField v-if="settings.mode === 'stage-details'" label="Stage (for one stage mode)">
            <USelect
              class="w-full"
              :items="stageOptions"
              :model-value="settings.selectedStageSlug"
              @update:model-value="emit('patchSettings', { selectedStageSlug: $event as string })"
            />
          </UFormField>

          <UFormField label="Info Boxes Position">
            <USelect
              class="w-full"
              :items="orientationItems"
              :model-value="settings.screenOrientation"
              @update:model-value="emit('patchSettings', {
                screenOrientation: $event as DisplaySettings['screenOrientation'],
              })"
            />
          </UFormField>

          <UFormField label="Grid columns (0 = auto, 999 = one row)">
            <UInput
              class="w-full"
              :model-value="String(settings.layoutColumns)"
              type="number"
              @update:model-value="emit('patchSettings', {
                layoutColumns: toSafeInteger($event, 0, 0, 999),
              })"
            />
          </UFormField>

          <UFormField label="Scale factor">
            <UInput
              class="w-full"
              :model-value="String(settings.scaleFactor)"
              type="number"
              @update:model-value="emit('patchSettings', {
                scaleFactor: toSafeScale($event),
              })"
            />
          </UFormField>

          <UFormField label="Theme">
            <USelect
              class="w-full"
              :items="themeItems"
              :model-value="settings.themeMode"
              @update:model-value="emit('patchSettings', {
                themeMode: $event as DisplaySettings['themeMode'],
              })"
            />
          </UFormField>
        </div>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Next Talks
          </div>

          <UFormField label="Next talks after active talk">
            <UInput
              class="w-full"
              :model-value="String(settings.nextTalksCount)"
              type="number"
              @update:model-value="emit('patchSettings', {
                nextTalksCount: toSafeInteger($event, 3, 1, 12),
              })"
            />

            <div class="pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Use 3 or 4 for one stage. Use 1 or 2 for all stages.
            </div>
          </UFormField>

          <UFormField label="Next talks layout">
            <USelect
              class="w-full"
              :items="nextTalksLayoutItems"
              :model-value="settings.nextTalksLayout"
              @update:model-value="emit('patchSettings', {
                nextTalksLayout: $event as DisplaySettings['nextTalksLayout'],
              })"
            />
          </UFormField>
        </div>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Schedule
          </div>

          <UFormField label="Day mode">
            <USelect
              class="w-full"
              :items="[
                { label: 'Auto (today/first day)', value: 'auto' },
                { label: 'Manual day', value: 'manual' },
              ]"
              :model-value="settings.dayMode"
              @update:model-value="emit('patchSettings', {
                dayMode: $event as DisplaySettings['dayMode'],
              })"
            />
          </UFormField>

          <UFormField v-if="settings.dayMode === 'manual'" label="Manual day">
            <USelect
              class="w-full"
              :items="dayOptions"
              :model-value="settings.dayISO"
              @update:model-value="emit('patchSettings', { dayISO: $event as string })"
            />
          </UFormField>

          <UFormField label="Data refresh interval">
            <USelect
              class="w-full"
              :items="refreshItems"
              :model-value="String(settings.refreshSeconds)"
              @update:model-value="emit('patchSettings', {
                refreshSeconds: toRefreshSeconds($event),
              })"
            />

            <div class="pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Applies to server data refresh only. Clock and red now line stay live.
            </div>
          </UFormField>
        </div>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Sponsors
          </div>

          <UFormField label="Sponsors">
            <USelect
              class="w-full"
              :items="sponsorItems"
              :model-value="settings.sponsorMode"
              @update:model-value="emit('patchSettings', {
                sponsorMode: $event as DisplaySettings['sponsorMode'],
              })"
            />
          </UFormField>

          <UFormField label="Sponsor logo columns (0 = auto)">
            <UInput
              class="w-full"
              :model-value="String(settings.sponsorColumns)"
              type="number"
              @update:model-value="emit('patchSettings', {
                sponsorColumns: toSafeInteger($event, 0, 0, 6),
              })"
            />
          </UFormField>
        </div>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            QR-Code
          </div>

          <UFormField label="QR code style">
            <USelect
              class="w-full"
              :items="qrCodeStyleItems"
              :model-value="settings.qrCodeStyle"
              @update:model-value="emit('patchSettings', {
                qrCodeStyle: $event as DisplaySettings['qrCodeStyle'],
              })"
            />
          </UFormField>
        </div>

        <div class="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
          <div class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Share
          </div>

          <UFormField label="Shareable URL">
            <div class="flex items-center gap-2">
              <UInput class="w-full" :model-value="finalUrl" readonly />

              <UButton
                color="neutral"
                icon="lucide:copy"
                label="Copy"
                @click="copyUrl"
              />
            </div>

            <div class="pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Use this link on another screen to restore the same display setup.
            </div>
          </UFormField>
        </div>
      </UCard>
    </aside>
  </Transition>
</template>
