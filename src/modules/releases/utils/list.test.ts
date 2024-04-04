import {addToList} from 'modules/releases/utils/list'

describe('addToList', () => {
  test('add an element to an empty list', () => {
    const element = 'element'
    expect(addToList<string>([], 0, element)).toEqual(['element'])
  })
})
