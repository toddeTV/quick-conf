<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
import { isNil } from 'lodash-es'

const appConfig = useAppConfig()

const yearCurrent = new Date().getFullYear()
const yearStart = appConfig.general?.conferenceFoundingYear ?? yearCurrent
const yearSpan = yearStart === yearCurrent ? yearStart : `${yearStart} - ${yearCurrent}`

const columns: FooterColumn[] = [
  {
    label: 'Community',
    children: [
      {
        label: 'Apply as Speaker',
        to: '',
      },
      {
        label: 'Become a sponsor',
        to: '',
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
        to: '',
      },
      {
        label: 'Privacy Policy',
        to: '',
      },
      {
        label: 'Legal Notice',
        to: '',
      },
    ],
  },
  ...(
    (
      isNil(appConfig.customFooterColumn)
      || isNil(appConfig.customFooterColumn.title)
      || isNil(appConfig.customFooterColumn.links)
    )
      ? []
      : [{
          label: appConfig.customFooterColumn.title ?? '',
          children: Object.values(appConfig.customFooterColumn.links)
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
        <UFooterColumns
          :columns="columns"
          :ui="{
            center: 'md:grid',
          }"
        />
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
        aria-label="GitHub"
        color="neutral"
        icon="i-simple-icons-github"
        target="_blank"
        to="https://github.com/toddeTV/quick-conf"
        variant="ghost"
      />

      <UColorModeButton />
    </template>
  </UFooter>
</template>
