<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui-pro'

const yearStart = 2025
const yearCurrent = new Date().getFullYear()
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
  {
    label: 'Social Media',
    children: [
      // {
      //   label: '',
      //   icon: '',
      //   to: 'https://...',
      // },
    ],
  },
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
        <NuxtLink
          class="text-primary/70"
          target="_blank"
          to="https://github.com/toddeTV/quick-conf"
        >
          quick-conf
        </NuxtLink>
        <!-- @ -->
        <Icon class="inline-block w-3.5 h-3.5 mx-0.5" name="lucide:heart" />
        <NuxtLink
          class="text-primary/70"
          target="_blank"
          to="https://todde.tv/"
        >
          Thorsten Seyschab
        </NuxtLink>
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
