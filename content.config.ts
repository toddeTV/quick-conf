/**
 * @file Defines the `@nuxt/content` configuration for the application.
 * Contains mainly the schema for content in the `/content/` folder.
 */

import { defineCollection, defineContentConfig } from '@nuxt/content'
import { customConfigSchema } from './app/schemas/customConfig'
import { faqSchema } from './app/schemas/faq'
import { landingSchema } from './app/schemas/landing'
import { pageSchema } from './app/schemas/page'
import { speakerSchema } from './app/schemas/speaker'
import { sponsorSchema } from './app/schemas/sponsor'
import { stageSchema } from './app/schemas/stage'
import { talkSchema } from './app/schemas/talk'
import { ticketSchema } from './app/schemas/ticket'

export default defineContentConfig({
  collections: {
    // -------- app config

    customConfig: defineCollection({
      type: 'data',
      source: '0.custom-config.json',
      schema: customConfigSchema,
    }),

    // -------- static pages

    // Home/Landing page
    index: defineCollection({
      type: 'page',
      source: '1.index.yml',
      schema: landingSchema,
    }),

    // FAQ collection for frequently asked questions
    faq: defineCollection({
      type: 'page',
      source: 'faq/**/*.md',
      schema: faqSchema,
    }),

    // generic pages, e.g. Contact, Privacy Policy, Legal Notice, etc.
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: pageSchema,
    }),

    // -------- standalone data

    sponsors: defineCollection({
      type: 'data',
      source: 'sponsors/**/*.yml',
      schema: sponsorSchema,
    }),

    tickets: defineCollection({
      type: 'data',
      source: 'tickets/**/*.yml',
      schema: ticketSchema,
    }),

    // -------- linked data

    stages: defineCollection({
      type: 'data',
      source: 'stages/**/*.yml',
      schema: stageSchema,
    }),

    speakers: defineCollection({
      type: 'page',
      source: 'speakers/**/*.md',
      schema: speakerSchema,
    }),

    talks: defineCollection({
      type: 'page',
      source: 'talks/**/*.md',
      schema: talkSchema,
    }),
  },
})
