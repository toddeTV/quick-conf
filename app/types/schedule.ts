import type { SpeakersCollectionItem, StagesCollectionItem, TalksCollectionItem } from '@nuxt/content'

export type ProcessedTalkType = Omit<TalksCollectionItem, 'speakers' | 'stage'> & {
  speakers: SpeakersCollectionItem[]
  stage: StagesCollectionItem | undefined
  start: Date
  end: Date
}
