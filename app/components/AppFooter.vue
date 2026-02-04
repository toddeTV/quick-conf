<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { version } from '~~/package.json'

/**
 * NOTE: Configuration values from appConfig (derived from `0.custom-config.json`) are treated as static.
 * Reactivity is intentionally removed to improve performance, as these values do not support hot-reload
 * via Nuxt Studio in this context and rarely change during a session.
 */

const appConfig = useAppConfig()
const footerConfig = appConfig.footer
const columnsConfig = footerConfig?.footerColumns
const bottomIcons = footerConfig?.bottomIcons

// year span calculation
const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general.conferenceFoundingYear === 0
  ? yearCurrent
  : appConfig.general.conferenceFoundingYear
const yearSpan = yearStart === yearCurrent ? yearStart : `${yearStart} - ${yearCurrent}`

// --- Column 1 ---
const col1 = columnsConfig?.column1
const col1Links = (col1?.links ?? []).filter(link => link.url)
const hasCol1 = Boolean(col1?.title) || col1Links.length > 0

// --- Column 2 ---
const col2 = columnsConfig?.column2
const col2Links = (col2?.links ?? []).filter(link => link.url)
const hasCol2 = Boolean(col2?.title) || col2Links.length > 0

// --- Column 3 (Legal - Always visible) ---
const legalLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Legal Notice', to: '/legal-notice' },
]

// --- Column 4 (Socials) ---
const col4 = columnsConfig?.column4
const socialLinks = (col4?.socials ?? []).filter(social => social.url)
const hasSocials = socialLinks.length > 0

// grid class helper
const gridClassCount = 1 + (hasCol1 ? 1 : 0) + (hasCol2 ? 1 : 0) + (hasSocials ? 1 : 0)
const gridClass = (() => {
  if (gridClassCount === 4) {
    return 'md:grid-cols-2 lg:grid-cols-4'
  }
  if (gridClassCount === 3) {
    return 'md:grid-cols-3 lg:grid-cols-3'
  }
  return 'md:grid-cols-2 lg:grid-cols-2'
})()

// create final columns for later usage
const columns: FooterColumn[] = []

// Column 1
if (hasCol1) {
  columns.push({
    label: col1?.title ?? '',
    children: col1Links.map(link => ({
      label: link.name ?? link.url,
      icon: link.icon,
      to: link.url,
      target: isExternalLink(link.url) ? '_blank' : undefined,
    })),
  })
}

// Column 2
if (hasCol2) {
  columns.push({
    label: col2?.title ?? '',
    children: col2Links.map(link => ({
      label: link.name ?? link.url,
      icon: link.icon,
      to: link.url,
      target: isExternalLink(link.url) ? '_blank' : undefined,
    })),
  })
}

// Column 3 (Legal)
columns.push({
  label: 'Legal Information',
  children: legalLinks,
})

// Column 4 (Socials)
if (hasSocials) {
  columns.push({
    label: 'Social Media',
    children: socialLinks.map(social => ({
      label: social.name ?? social.url,
      icon: social.icon || getIconForUrl(social.url),
      to: social.url,
      target: isExternalLink(social.url) ? '_blank' : undefined,
    })),
  })
}

const {
  url: repositoryUrl,
  icon: repositoryIcon,
  label: repositoryLabel,
} = getRepositoryDetails(appConfig.studio.repository)

/**
 * Perform a hard page reload to the admin area.
 * This ensures the route is intercepted correctly by Nuxt Studio (e.g. for GitHub/GitLab login)
 * instead of being handled by the Nuxt app's client-side router, as we need a page reload here.
 */
function navigateToAdmin() {
  window.location.href = '/_admin'
}
</script>

<template>
  <USeparator class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-8"
          :class="gridClass"
        >
          <UFooterColumns
            v-for="column in columns"
            :key="`footer-column-${column.label}`"
            :columns="[column]"
          />
        </div>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ yearSpan }}. All rights reserved.
      </p>
    </template>

    <template #default>
      <p class="text-muted text-sm">
        Created with
        <UIcon
          aria-hidden="true"
          class="inline-block w-3.5 h-3.5 mx-0.5"
          name="i-lucide-heart"
        />
        via
        <ULink
          aria-label="quick-conf GitHub Repository"
          class="text-primary/70"
          target="_blank"
          to="https://github.com/toddeTV/quick-conf"
        >
          quick-conf
        </ULink>
        <span class="mx-0.5">v{{ version }}</span>
        by
        <ULink
          aria-label="todde.tv website"
          class="text-primary/70"
          target="_blank"
          to="https://todde.tv"
        >
          todde.tv
        </ULink>
      </p>
    </template>

    <template #right>
      <!-- icon="i-lucide-key-round" -->
      <!-- icon="i-lucide-key" -->
      <!-- icon="i-lucide-log-in" -->
      <UButton
        v-if="bottomIcons?.showAdminLink"
        aria-label="Admin Area"
        color="neutral"
        icon="i-lucide-log-in"
        variant="ghost"
        @click="navigateToAdmin"
      />

      <UButton
        v-if="bottomIcons?.showRepositoryLink"
        :aria-label="repositoryLabel"
        color="neutral"
        :icon="repositoryIcon"
        target="_blank"
        :to="repositoryUrl"
        variant="ghost"
      />

      <UColorModeButton />
    </template>
  </UFooter>
</template>
