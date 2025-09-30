<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    label: 'Schedule',
    to: '/schedule',
    active: route.path.startsWith('/schedule') || route.path.startsWith('/talks'),
  },
  {
    label: 'Speakers',
    to: '/speakers',
    active: route.path.startsWith('/speakers'),
  },
  {
    label: 'Location',
    to: '/location',
    active: route.path.startsWith('/location'),
  },
  {
    label: 'FAQ',
    to: '/faq',
    active: route.path.startsWith('/faq'),
  },
])
</script>

<template>
  <UHeader mode="slideover">
    <template #left>
      <NuxtLink
        aria-label="Home"
        class="mr-0 md:mr-8"
        to="/"
      >
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>

      <UNavigationMenu
        class="hidden lg:inline-flex"
        :items="items"
        variant="link"
      />
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        aria-label="Buy tickets"
        class="lg:hidden"
        color="neutral"
        icon="i-lucide-ticket"
        title="Buy tickets"
        to="/tickets"
        variant="ghost"
      />

      <UButton
        class="hidden lg:inline-flex"
        color="primary"
        label="Apply as Speaker"
        to="/cfp"
        variant="outline"
      />

      <UButton
        class="hidden lg:inline-flex"
        color="primary"
        label="Buy Tickets"
        to="/tickets"
        variant="solid"
      />
    </template>

    <template #body>
      <UNavigationMenu
        class="-mx-2.5"
        :items="items"
        orientation="vertical"
      />

      <USeparator class="my-6" />

      <UButton
        block
        class="mb-3"
        color="primary"
        label="Buy Tickets"
        to="/tickets"
      />
    </template>
  </UHeader>
</template>
