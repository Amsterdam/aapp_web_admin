import type {Paginated} from 'services/types'

type ArticleType = 'article' | 'warning'

type ArticleMetaId = {
  id: number
  type: ArticleType
}

type ArticleStub = {
  meta_id: ArticleMetaId
  modification_date: string
}

type ApiImageSource = {
  height: number
  uri: string
  width: number
}

export type ApiImage = {
  alternativeText: string | null
  aspectRatio: number
  id: string
  sources: ApiImageSource[]
}

export type ProjectBase = {
  id: number
  image: ApiImage | null
  subtitle: string | null
  title: string
}

export type ProjectsQueryArgs = {
  article_max_age?: number
  page?: number
  page_size?: number
}

type ProjectsItem = ProjectBase & {
  recent_articles: ArticleStub[]
}

export type ProjectsResponse = Paginated<ProjectsItem>
