export type PublisherBase = {
  email: string
  name: string
}

export type Publisher = {
  id: number
  projects?: number[]
} & PublisherBase

export type AddPublisherQueryArgs = {
  email: PublisherBase['email']
  name: PublisherBase['name']
}

export type PublisherProjectsQueryArgs = {
  id: Publisher['id']
  projectId: number
}
