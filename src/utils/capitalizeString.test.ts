import {capitalizeString} from 'utils/capitalizeString'

describe('capitalizeString', () => {
  it('Capitalize the first character of a string', () => {
    expect(capitalizeString('guus')).toEqual('Guus')
    expect(capitalizeString('Guus')).toEqual('Guus')
  })
})
