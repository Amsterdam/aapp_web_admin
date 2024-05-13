import {
  ArticleNews,
  ArticleWarning,
} from 'modules/construction-work-editor/types/article'
import {PublisherBase} from 'modules/construction-work-editor/types/publisher'
import type {ApiImage} from 'modules/construction-work-editor/types/image'

export type ProjectContact = {
  address: string | null // @TODO: not in API definition (100764)
  email: string | null
  id: number
  name: string | null
  phone: string | null
  position: string | null
}

export type ProjectSection = {
  body: string | null
  title: string | null
}

export type ProjectSections = {
  contact: ProjectSection[] | null
  what: ProjectSection[] | null
  when: ProjectSection[] | null
  where: ProjectSection[] | null
  work: ProjectSection[] | null
}

export type ProjectTimelineSubItem = {
  body: string | null
  date: string
  title?: string
}

export type ProjectTimelineItem = {
  body: string | null
  collapsed: boolean
  date: string
  items: ProjectTimelineSubItem[] | null
  progress: 'Afgelopen' | 'Huidig' | 'Aankomend' // @TODO: not in API definition (100764)
  title: string
}

export type ProjectTimeline = {
  intro: string | null
  items: ProjectTimelineItem[]
  title: string
}

export type ProjectBase = {
  id: number
  image: ApiImage | null
  subtitle: string | null
  title: string
}

export type Project = ProjectBase & {
  active: boolean
  articles: ArticleNews[]
  contacts: ProjectContact[] | null
  creation_date: string
  coordinates: {
    lat: number
    lon: number
  } | null
  expiration_date: string | null
  followers: number
  foreign_id: number
  image: ApiImage | null
  last_seen: string | null
  meter: number
  modification_date: string
  publication_date: string
  publishers: PublisherBase[]
  recent_articles: (ArticleNews | ArticleWarning)[]
  sections: ProjectSections | null
  strides: number
  timeline: ProjectTimeline | null
  url: string
  warnings: ArticleWarning[]
}

export type ProjectsItem = Pick<
  Project,
  'creation_date' | 'id' | 'image' | 'subtitle' | 'title'
> & {
  article_count: number
  publishers: PublisherBase['email']
  warning_count: number
}

export type ProjectQueryArgs = {
  article_max_age?: number
  id: string
}
