export enum ApiDirectory {
  constructionWork = '/construction-work/api/v1',
  modules = '/modules/api/v1',
}

type Links = {
  next: {href: string}
  previous: {href: string}
  self: {href: string}
}

type Page = {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

export type Paginated<T> = {
  _links: Links
  page: Page
  result: T[]
}
