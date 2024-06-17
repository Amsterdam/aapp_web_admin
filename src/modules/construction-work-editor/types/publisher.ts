export type PublisherBase = {
  email: string
  name: string
}

export type Publisher = {
  id: number
  projects?: number[]
} & PublisherBase

export type AddPublisherQueryArgs = PublisherBase

export type EditPublisherQueryArgs = Pick<Publisher, 'id'> & PublisherBase

export type PublisherProjectsQueryArgs = {
  id: Publisher['id']
  projectId: number
}
