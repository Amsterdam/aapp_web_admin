import {getHotfixVersion} from 'modules/releases/utils/getHotfixVersion'

describe('getHotfixVersion', () => {
  it('should return the next available patch version', () => {
    const existingVersions: string[] = ['1.0.0', '1.0.1', '1.0.2', '1.1.0']
    expect(getHotfixVersion('1.0.0', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.0.1', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.0.2', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.1.0', existingVersions)).toEqual('1.1.1')
  })
  it('should return the next available patch version with a random ordered existingVersions array', () => {
    const existingVersions: string[] = ['1.0.2', '1.0.0', '1.1.0', '1.0.1']
    expect(getHotfixVersion('1.0.0', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.0.1', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.0.2', existingVersions)).toEqual('1.0.3')
    expect(getHotfixVersion('1.1.0', existingVersions)).toEqual('1.1.1')
  })
})
