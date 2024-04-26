import {ApiImage} from 'modules/construction-work-editor/types/image'

export enum ArticleType {
  article = 'article',
  warning = 'warning',
}

export type ArticleMetaId = {
  id: number
  type: ArticleType
}

export type ArticleStub = {
  meta_id: ArticleMetaId
  modification_date: string
}

export type ArticlePublisher = {
  email: string
  name: string
}

export type ArticleBase = ArticleStub & {
  body: string | null
  id: number
  modification_date: string
  publication_date: string
  title: string
}

export type ArticleNews = ArticleBase & {
  active: boolean
  creation_date: string
  expiration_date: string | null
  foreign_id: number
  image: ApiImage | null
  intro: string | null
  last_seen: string | null
  projects: number[]
  url: string
}

export type ArticleWarning = ArticleBase & {
  author_email: string | null
  images: ApiImage[] | null
  is_already_pushed: boolean
  project: number | null
}

export type ArticlesQueryArgs = {
  limit?: number
  project_ids?: string // comma separated project ids
}

export type ArticlesItem = {
  images: ApiImage[] | null
  meta_id: ArticleMetaId
  publication_date: string
  publisher: ArticlePublisher
  title: string
}

type ImageQueryArgs = {
  image: {
    data: string
    description: string
    main: boolean
  }
}

type ProjectWarningQueryArgs = {
  body: string
  title: string
  send_push_notification: boolean
}

export type AddProjectWarningQueryArgs = {
  project_id: string
} & ProjectWarningQueryArgs &
  ImageQueryArgs

export type EditProjectWarningQueryArgs = {
  id: string
} & ProjectWarningQueryArgs &
  ImageQueryArgs

export type AddProjectWarningResponse = {
  id: number
  title: string
  body: string
  publication_date: string
  modification_date: string
  author_email: string
  project: number
}
