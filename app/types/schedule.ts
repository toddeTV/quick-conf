import type { SpeakersCollectionItem, StagesCollectionItem, TalksCollectionItem } from '@nuxt/content'
import type { DateTime } from 'luxon'

export type ProcessedTalkType = Omit<TalksCollectionItem, 'speakers' | 'stage'> & {
  speakers: SpeakersCollectionItem[]
  stage: StagesCollectionItem | undefined
  start: DateTime
  end: DateTime
}
