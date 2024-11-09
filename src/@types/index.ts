export interface VideosId {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: VideoId[]
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface VideoId {
  kind: string
  etag: string
  id: Id
}

export interface Id {
  kind: string
  videoId: string
}

export interface Videos {
  kind: string
  etag: string
  items: VideoItem[]
  pageInfo: PageInfo
}

export interface VideoItem {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: string
  localized: Localized
  defaultAudioLanguage: string
  defaultLanguage?: string
}

export interface Thumbnails {
  default: Default
  medium: Medium
  high: High
  standard: Standard
  maxres: Maxres
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface Medium {
  url: string
  width: number
  height: number
}

export interface High {
  url: string
  width: number
  height: number
}

export interface Standard {
  url: string
  width: number
  height: number
}

export interface Maxres {
  url: string
  width: number
  height: number
}

export interface Localized {
  title: string
  description: string
}

export interface ContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  regionRestriction?: RegionRestriction
  contentRating: ContentRating
  projection: string
}

export interface RegionRestriction {
  allowed: string[]
}

export interface ContentRating {}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: Default
  duration: string
}
