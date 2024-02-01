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

export const getEnvironment = (hostname: string): Environment =>
  hostnameEnvironment[hostname] ?? Environment.production

// eslint-disable-next-line no-restricted-globals
export const environment = getEnvironment(location.hostname)
