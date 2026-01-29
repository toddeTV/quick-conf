<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { version } from '~~/package.json'

const appConfig = useAppConfig()
const footerConfig = computed(() => appConfig.footer)
const columnsConfig = computed(() => footerConfig.value?.footerColumns)
const bottomIcons = computed(() => footerConfig.value?.bottomIcons)

// year span calculation
const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general.conferenceFoundingYear === 0
  ? yearCurrent
  : appConfig.general.conferenceFoundingYear
const yearSpan = yearStart === yearCurrent ? yearStart : `${yearStart} - ${yearCurrent}`

// --- Column 1 ---
const col1 = computed(() => columnsConfig.value?.column1)
const col1Links = computed(() => (col1.value?.links ?? []).filter(link => link.url))
const hasCol1 = computed(() => Boolean(col1.value?.title) || col1Links.value.length > 0)

// --- Column 2 ---
const col2 = computed(() => columnsConfig.value?.column2)
const col2Links = computed(() => (col2.value?.links ?? []).filter(link => link.url))
const hasCol2 = computed(() => Boolean(col2.value?.title) || col2Links.value.length > 0)

// --- Column 3 (Legal - Always visible) ---
const legalLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Legal Notice', to: '/legal-notice' },
]

// --- Column 4 (Socials) ---
const col4 = computed(() => columnsConfig.value?.column4)
const socialLinks = computed(() => (col4.value?.socials ?? []).filter(social => social.url))
const hasSocials = computed(() => socialLinks.value.length > 0)

// grid class helper
const gridClass = computed(() => {
  const count = 1 + (hasCol1.value ? 1 : 0) + (hasCol2.value ? 1 : 0) + (hasSocials.value ? 1 : 0)

  if (count === 4) {
    return 'md:grid-cols-2 lg:grid-cols-4'
  }
  if (count === 3) {
    return 'md:grid-cols-3 lg:grid-cols-3'
  }
  return 'md:grid-cols-2 lg:grid-cols-2'
})

// create final columns for later usage
const columns = computed<FooterColumn[]>(() => {
  const cols: FooterColumn[] = []

  // Column 1
  if (hasCol1.value) {
    cols.push({
      label: col1.value?.title ?? '',
      children: col1Links.value.map(link => ({
        label: link.name ?? link.url,
        icon: link.icon,
        to: link.url,
        target: isExternalLink(link.url) ? '_blank' : undefined,
      })),
    })
  }

  // Column 2
  if (hasCol2.value) {
    cols.push({
      label: col2.value?.title ?? '',
      children: col2Links.value.map(link => ({
        label: link.name ?? link.url,
        icon: link.icon,
        to: link.url,
        target: isExternalLink(link.url) ? '_blank' : undefined,
      })),
    })
  }

  // Column 3 (Legal)
  cols.push({
    label: 'Legal Information',
    children: legalLinks,
  })

  // Column 4 (Socials)
  if (hasSocials.value) {
    cols.push({
      label: 'Social Media',
      children: socialLinks.value.map(social => ({
        label: social.name ?? social.url,
        icon: social.icon || getIconForUrl(social.url),
        to: social.url,
        target: isExternalLink(social.url) ? '_blank' : undefined,
      })),
    })
  }

  return cols
})

const repositoryUrl = computed(() => {
  const { provider, owner, repo } = appConfig.studio.repository
  if (provider === 'github') {
    return `https://github.com/${owner}/${repo}`
  }
  if (provider === 'gitlab') {
    return `https://gitlab.com/${owner}/${repo}`
  }

  console.warn(`[AppFooter] Unsupported provider: ${provider} for repository ${owner}/${repo}`)
  return '#'
})

const repositoryIcon = computed(() => {
  const { provider } = appConfig.studio.repository
  if (provider === 'gitlab') {
    return 'i-simple-icons-gitlab'
  }
  if (provider === 'github') {
    return 'i-simple-icons-github'
  }
  // console warning is handled in `repositoryUrl` and not repeated here
  return ''
})

const repositoryLabel = computed(() => {
  const { provider } = appConfig.studio.repository
  if (provider === 'gitlab') {
    return 'GitLab'
  }
  if (provider === 'github') {
    return 'GitHub'
  }
  // console warning is handled in `repositoryUrl` and not repeated here
  return ''
})
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
        Created with template
        <ULink
          aria-label="quick-conf GitHub Repository"
          class="text-primary/70"
          target="_blank"
          to="https://github.com/toddeTV/quick-conf"
        >
          quick-conf
        </ULink>
        <span class="ml-0.5 mr-1">v{{ version }}</span>
        <!-- @ -->
        <UIcon
          aria-hidden="true"
          class="inline-block w-3.5 h-3.5 mx-0.5"
          name="i-lucide-heart"
        />
        <ULink
          aria-label="Website of Thorsten Seyschab"
          class="text-primary/70"
          target="_blank"
          to="https://todde.tv/"
        >
          Thorsten Seyschab
        </ULink>
      </p>
    </template>

    <template #right>
      <UButton
        v-if="bottomIcons?.showRepositoryLink"
        :aria-label="repositoryLabel"
        color="neutral"
        :icon="repositoryIcon"
        target="_blank"
        :to="repositoryUrl"
        variant="ghost"
      />

      <UButton
        v-if="bottomIcons?.showAdminLink"
        aria-label="Admin Area"
        color="neutral"
        icon="i-lucide-layout-dashboard"
        target="_blank"
        to="/_admin"
        variant="ghost"
      />

      <UColorModeButton />
    </template>
  </UFooter>
</template>
