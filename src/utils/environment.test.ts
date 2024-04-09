import {Environment, getEnvironment} from './environment'

describe('getEnvironment', () => {
  it('should return the expected environment', () => {
    expect(getEnvironment('ontw.app.amsterdam.nl')).toEqual(
      Environment.development,
    )
    expect(getEnvironment('test.app.amsterdam.nl')).toEqual(Environment.test)
    expect(getEnvironment('acc.app.amsterdam.nl')).toEqual(
      Environment.acceptance,
    )
    expect(getEnvironment('app.amsterdam.nl')).toEqual(Environment.production)
  })
  it('should return production environment, when there is no match', () => {
    expect(getEnvironment('amsterdam.nl')).toEqual(Environment.production)
    expect(getEnvironment('')).toEqual(Environment.production)
    expect(getEnvironment(null as unknown as string)).toEqual(
      Environment.production,
    )
    expect(getEnvironment(undefined as unknown as string)).toEqual(
      Environment.production,
    )
    // @ts-ignore just for testing purposes
    expect(getEnvironment()).toEqual(Environment.production)
  })
})
