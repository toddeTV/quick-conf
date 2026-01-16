<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { version } from '~~/package.json'

const appConfig = useAppConfig()

const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general.conferenceFoundingYear === 0
  ? yearCurrent
  : appConfig.general.conferenceFoundingYear
const yearSpan = yearStart === yearCurrent ? yearStart : `${yearStart} - ${yearCurrent}`

const customFooterLinks = (appConfig.customFooterColumn?.links ?? []).filter(link => link.url)
const socialLinks = (appConfig.socials ?? []).filter(social => social.url)
const hasCustomFooterColumn = Boolean(appConfig.customFooterColumn?.title) && customFooterLinks.length > 0
const hasSocials = socialLinks.length > 0

const gridClass = computed(() => {
  const count = 2 + (hasCustomFooterColumn ? 1 : 0) + (hasSocials ? 1 : 0)

  if (count === 4) {
    return 'md:grid-cols-2 lg:grid-cols-4'
  }
  if (count === 3) {
    return 'md:grid-cols-3 lg:grid-cols-3'
  }
  return 'md:grid-cols-2 lg:grid-cols-2'
})

const columns: FooterColumn[] = [
  {
    label: 'Community',
    children: [
      {
        label: 'Apply as Speaker',
        to: '/faq/cfp',
      },
      {
        label: 'Become a Sponsor',
        to: '/faq/sponsoring',
      },
      {
        label: 'Code of Conduct',
        to: '/faq/code-of-conduct',
      },
      {
        label: 'Location',
        to: '/faq/location',
      },
    ],
  },
  {
    label: 'Legal Information',
    children: [
      {
        label: 'Contact',
        to: '/contact',
      },
      {
        label: 'Privacy Policy',
        to: '/privacy-policy',
      },
      {
        label: 'Legal Notice',
        to: '/legal-notice',
      },
    ],
  },
  ...(
    !hasCustomFooterColumn
      ? []
      : [{
          label: appConfig.customFooterColumn?.title ?? '',
          children: customFooterLinks.map(link => ({
            label: link.name ?? link.url!,
            icon: link.icon,
            to: link.url,
            target: isExternalLink(link.url!) ? '_blank' : undefined,
          })),
        } as FooterColumn]
  ),
  ...(!hasSocials
    ? []
    : [{
        label: 'Social Media',
        children: socialLinks.map(social => ({
          label: social.name ?? social.url!,
          icon: social.icon || getIconForUrl(social.url!),
          to: social.url,
          target: isExternalLink(social.url!) ? '_blank' : undefined,
        })),
      }]),
]

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
        v-if="appConfig.studio.repository.private === false"
        aria-label="GitHub"
        color="neutral"
        icon="i-simple-icons-github"
        target="_blank"
        :to="repositoryUrl"
        variant="ghost"
      />

      <UColorModeButton />
    </template>
  </UFooter>
</template>
