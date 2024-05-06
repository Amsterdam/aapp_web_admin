export type PublisherBase = {
  email: string
  name: string
}

export type Publisher = {
  id: number
  projects: number[]
} & PublisherBase

export type PublisherAddForm = {
  email: PublisherBase['email']
}

export type PublisherQueryArgs = {
  email: PublisherBase['email']
}

export type PublisherProjectsQueryArgs = {
  email: PublisherBase['email']
  projectIds: Publisher['projects']
}
