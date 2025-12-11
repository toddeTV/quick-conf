<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { isEmpty, isNil } from 'lodash-es'

const appConfig = useAppConfig()

const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general?.conferenceFoundingYear ?? yearCurrent
const yearSpan = yearStart === yearCurrent ? yearStart : `${yearStart} - ${yearCurrent}`

const hasCustomFooterColumn = !(isNil(appConfig.customFooterColumn) || isEmpty(appConfig.customFooterColumn)
  || isNil(appConfig.customFooterColumn.title) || isEmpty(appConfig.customFooterColumn.title)
  || isNil(appConfig.customFooterColumn.links) || isEmpty(appConfig.customFooterColumn.links)
  || !Object.values(appConfig.customFooterColumn.links).some(link => !isNil(link.url) && link.url !== ''))

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
          label: appConfig.customFooterColumn.title ?? '',
          children: Object.values(appConfig.customFooterColumn.links!)
            .filter(link => link.url)
            .map(link => ({
              label: link.name ?? link.url!,
              icon: link.icon,
              to: link.url,
              target: isExternalLink(link.url!) ? '_blank' : undefined,
            })),
        } as FooterColumn]
  ),
  ...(isNil(appConfig.socials)
    ? []
    : [{
        label: 'Social Media',
        children: Object.values(appConfig.socials)
          .filter(social => social.url)
          .map(social => ({
            label: social.name ?? social.url!,
            icon: social.icon || getIconForUrl(social.url!),
            to: social.url,
            target: isExternalLink(social.url!) ? '_blank' : undefined,
          })),
      }]),
]
</script>

<template>
  <USeparator class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          :class="{
            'lg:grid-cols-3': !hasCustomFooterColumn,
            'lg:grid-cols-4': hasCustomFooterColumn,
          }"
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
        v-if="!isEmpty(appConfig.general.githubProjectLink)"
        aria-label="GitHub"
        color="neutral"
        icon="i-simple-icons-github"
        target="_blank"
        :to="appConfig.general.githubProjectLink"
        variant="ghost"
      />

      <UColorModeButton />
    </template>
  </UFooter>
</template>
