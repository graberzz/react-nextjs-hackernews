export interface HNUser {
  id: string
  delay: number
  created: number
  karma: number
  about: string
  submitted: number[]
}

export type HNItemType =
  | 'job'
  | 'story'
  | 'comment'
  | 'comment'
  | 'poll'
  | 'pollopt'

export type HNCategory = 'top' | 'show' | 'ask' | 'new' | 'jobs'

export interface HNItem<KidType = number> {
  id: number
  deleted: boolean
  type: HNItemType
  by: string
  time: number
  dead: boolean
  kids?: KidType[]
}

export interface HNJob extends HNItem {
  text: string
  url: string
  title: string
}

export interface HNStory<KT = number> extends HNItem<KT> {
  descendants: number
  score: number
  title: string
  url: string
}

export interface HNComment<KT = number> extends HNItem<KT> {
  parent: number
  text: string
}

export interface HNPoll extends HNItem {
  parts: number[]
  descendants: number
  score: number
  title: string
  text: string
}

export interface HNPollOption extends HNItem {
  parent: number
  score: number
}

export type RenderHNItem = HNItem<RenderHNItem>
export type RenderHNComment = HNComment<RenderHNComment>
export type RenderHNStory = HNStory<RenderHNComment>
