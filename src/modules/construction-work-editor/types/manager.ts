export enum ManagerEndpoints {
  createManager = 'createManager',
}

export type ManagersResponse = {
  manager_key: string
  email: string
  projects: number[]
}

export type ManagerFormType = {
  name: string
  email: string
  projects: number[]
}
