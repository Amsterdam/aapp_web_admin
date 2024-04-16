import {
  ArticleNews,
  ArticleStub,
  ArticleWarning,
} from 'modules/construction-work-editor/types/article'
import type {ApiImage} from 'modules/construction-work-editor/types/image'
import type {Paginated} from 'services/types'

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
  contacts: ProjectContact[] | null
  coordinates: {
    lat: number
    lon: number
  } | null
  creation_date: string
  expiration_date: string | null
  followers: number
  foreign_id: number
  images: ApiImage[] | null
  last_seen: string | null
  modification_date: string
  publication_date: string
  recent_articles: (ArticleNews | ArticleWarning)[]
  sections: ProjectSections | null
  timeline: ProjectTimeline | null
  url: string
}
type ProjectsItem = ProjectBase & {
  recent_articles: ArticleStub[]
}

// api
export type ProjectsQueryArgs = {
  article_max_age?: number
  page?: number
  page_size?: number
}

export type ProjectsResponse = Paginated<ProjectsItem>
export type ProjectQueryArgs = {
  article_max_age?: number
  id: string
}
