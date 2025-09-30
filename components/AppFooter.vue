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
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ yearSpan }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        aria-label="GitHub"
        color="neutral"
        icon="i-simple-icons-github"
        target="_blank"
        to="https://github.com/toddeTV/printed-europe.com"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
