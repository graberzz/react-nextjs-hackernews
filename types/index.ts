export interface HNUser {
  id: string
  delay: number
  created: number
  karma: number
  about: string
  submitted: number[]
}

export interface HNItem {
  id: number
  deleted: boolean
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
  by: string
  time: number
  dead: boolean
  kids: number[]
}

export interface HNJob extends HNItem {
  text: string
  url: string
  title: string
}

export interface HNStory extends HNItem {
  descendants: number
  score: number
  title: string
  url: string
}

export interface HNComment extends HNItem {
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
