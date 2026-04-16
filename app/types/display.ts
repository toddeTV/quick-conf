export type DisplayDayMode = 'auto' | 'manual'
export type DisplayMode = 'timetable' | 'all-details' | 'stage-details'
export type DisplayNextTalksLayout = 'row' | 'column'
export type DisplayQrCodeStyle = 'black-on-white' | 'white-on-black' | 'black-on-transparent' | 'white-on-transparent'
export type DisplayScreenOrientation = 'horizontal' | 'vertical'
export type DisplaySponsorMode = 'off' | 'all' | 'rotate'
export type DisplayThemeMode = 'site' | 'light' | 'dark'

export interface DisplaySettings {
  dayISO?: string
  dayMode: DisplayDayMode
  layoutColumns: number
  mode: DisplayMode
  nextTalksLayout: DisplayNextTalksLayout
  qrCodeStyle: DisplayQrCodeStyle
  refreshSeconds: 60 | 120 | 300
  nextTalksCount: number
  scaleFactor: number
  screenOrientation: DisplayScreenOrientation
  selectedStageSlug?: string
  sponsorColumns: number
  sponsorMode: DisplaySponsorMode
  themeMode: DisplayThemeMode
}

export interface DisplaySpeakerView {
  image?: string
  name: string
  slug: string
}

export interface DisplayTalkView {
  description: string
  endClock: string
  endISO: string
  isCurrent: boolean
  slug: string
  speakers: DisplaySpeakerView[]
  startClock: string
  startISO: string
  stageName?: string
  talkType: string
  title: string
}

export interface StageDisplayGroup {
  primaryTalk?: DisplayTalkView
  stageName: string
  stageSlug: string
  upcomingTalks: DisplayTalkView[]
}
