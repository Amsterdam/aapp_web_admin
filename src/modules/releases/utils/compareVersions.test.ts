import {compareVersions} from './compareVersions'

describe('compareVersions', () => {
  it('should return the next available patch version', () => {
    expect(compareVersions('1.0.0', '1.0.0')).toEqual(0)
    expect(compareVersions('1.0.1', '1.0.0')).toEqual(1)
    expect(compareVersions('1.1.0', '1.0.0')).toEqual(1)
    expect(compareVersions('2.0.0', '1.0.0')).toEqual(1)
    expect(compareVersions('1.0.1', '1.0.2')).toEqual(-1)
    expect(compareVersions('1.1.1', '1.2.0')).toEqual(-1)
    expect(compareVersions('2.5.4', '3.3.3')).toEqual(-1)
    expect(compareVersions('10.0.0', '3.3.3')).toEqual(1)
    expect(compareVersions('1.10.0', '1.3.3')).toEqual(1)
    expect(compareVersions('1.1.10', '1.1.3')).toEqual(1)
  })
})
