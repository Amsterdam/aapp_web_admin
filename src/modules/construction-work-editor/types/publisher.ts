export type Publisher = {
  email: string
  projects: number[]
}

export type PublisherAddForm = {
  email: string
}

export type PublisherQueryArgs = {
  email: string
}

export type PublisherProjectsQueryArgs = {
  email: string
  projectIds: number[]
}
