import {ApiImage} from '@/modules/construction-work-editor/types/image'
import {PublisherBase} from '@/modules/construction-work-editor/types/publisher'

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

export type ArticleBase = ArticleStub & {
  id: number
  body: string | null
  images: ApiImage[] | null
  publication_date: string
  title: string
}

export type ArticleNews = ArticleBase & {
  active: boolean
  creation_date: string
  expiration_date: string | null
  foreign_id: number
  intro: string | null
  last_seen: string | null
  projects: number[]
  url: string
}

export type ArticleWarning = ArticleBase & {
  notification_sent: boolean
  publisher: PublisherBase
  project: number | null
}

type ImageQueryArgs = {
  image?: {
    id: number
    description: string
  }
}

type ProjectWarningQueryArgs = {
  body: string
  title: string
  send_push_notification: boolean
}

export type AddProjectWarningImageQueryArgs = FormData

export type AddProjectWarningImageResponse = {
  warning_image_id: number
}

export type AddProjectWarningQueryArgs = {
  projectId: string
} & ProjectWarningQueryArgs &
  ImageQueryArgs

export type EditProjectWarningQueryArgs = {
  id: number
} & ProjectWarningQueryArgs &
  ImageQueryArgs

export type AddProjectWarningResponse = Pick<
  ArticleWarning,
  | 'id'
  | 'body'
  | 'title'
  | 'project'
  | 'publisher'
  | 'publication_date'
  | 'modification_date'
>
