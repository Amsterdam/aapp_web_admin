export enum PublisherEndpointNames {
  addPublisher = 'addPublisher',
  getPublisher = 'getPublisher',
}

export type PublisherMutationArgs = {
  email: string
}

export type Publisher = {
  email: string
  id: number
  projects: string[]
}

export type PublisherFormType = {
  email: string
}
