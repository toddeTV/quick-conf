<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  headline?: string
  // class?: string // works without using it due to Vue3's attribute fallthrough
  items: {
    quote: string
    user: {
      name: string
      description?: string
      to: string
      target?: string
      avatar: {
        src: string
        alt?: string
        loading?: 'eager' | 'lazy'
        sizes?: string
      }
    }
  }[]
}>()
</script>

<template>
  <UPageSection
    :description="description"
    :headline="headline"
    :title="title"
  >
    <UPageColumns class="xl:columns-4">
      <UPageCard
        v-for="(testimonial, index) in items"
        :key="index"
        :description="testimonial.quote"
        :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        variant="subtle"
      >
        <template #footer>
          <UUser
            v-bind="testimonial.user"
            size="lg"
          />
        </template>
      </UPageCard>
    </UPageColumns>
  </UPageSection>
</template>
