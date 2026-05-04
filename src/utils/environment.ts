import {BASE_ROUTE} from '@/constants/routes'

export enum Environment {
  local = 'local',
  development = 'development',
  test = 'test',
  acceptance = 'acceptance',
  production = 'production',
}

const hostnameEnvironment: Record<string, Environment> = {
  localhost: Environment.local,
  'ontw.app.amsterdam.nl': Environment.development,
  'test.app.amsterdam.nl': Environment.test,
  'acc.app.amsterdam.nl': Environment.acceptance,
  'app.amsterdam.nl': Environment.production,
}

export const environmentClientId: Record<Environment, string> = {
  [Environment.local]: 'df8c1ff0-fbc7-4fdb-b67a-33b476f162ec', // the same as dev
  [Environment.development]: 'df8c1ff0-fbc7-4fdb-b67a-33b476f162ec',
  [Environment.test]: '4eb5870c-33bd-4261-bf01-c7b073af420f',
  [Environment.acceptance]: '0e476f80-dc11-4c46-a316-74f95951d890',
  [Environment.production]: '6972130c-f05b-4dfa-af6f-ae77aacef456',
}

export const environmentRedirectUri: Record<Environment, string> = {
  [Environment.local]: `http://localhost:3000${BASE_ROUTE}`,
  [Environment.development]: `https://ontw.app.amsterdam.nl${BASE_ROUTE}`,
  [Environment.test]: `https://test.app.amsterdam.nl${BASE_ROUTE}`,
  [Environment.acceptance]: `https://acc.app.amsterdam.nl${BASE_ROUTE}`,
  [Environment.production]: `https://app.amsterdam.nl${BASE_ROUTE}`,
}

export const getEnvironment = (hostname: string): Environment =>
  hostnameEnvironment[hostname] ?? Environment.production

// eslint-disable-next-line no-restricted-globals
export const environment = getEnvironment(location.hostname)

export const currentClientId = environmentClientId[environment]

export const currentRedirectUri = environmentRedirectUri[environment]
