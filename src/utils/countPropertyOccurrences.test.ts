import countPropertyOccurrences from './countPropertyOccurrences'

describe('countPropertyOccurrences', () => {
  it('should return 0 when the list is empty', () => {
    const list: [] = []
    const prop = 'prop1'
    expect(countPropertyOccurrences(list, prop)).toBe(0)
  })

  it('should return the correct count when the property exists in some objects', () => {
    const list = [
      {prop1: 'value1', prop2: 'value2'},
      {prop1: 'value2', prop3: 'value3'},
      {prop2: 'value1', prop3: 'value2'},
    ]
    const prop = 'prop1'
    expect(countPropertyOccurrences(list, prop)).toBe(2)
  })

  it('should return 0 when the property does not exist in any object', () => {
    const list = [
      {prop1: 'value1', prop2: 'value2'},
      {prop2: 'value2', prop3: 'value3'},
    ]
    const prop = 'prop4'
    expect(countPropertyOccurrences(list, prop)).toBe(0)
  })

  it('should return the correct count when the property exists in all objects', () => {
    const list = [
      {prop1: 'value1', prop2: 'value2'},
      {prop1: 'value2', prop2: 'value3'},
      {prop1: 'value3', prop2: 'value4'},
    ]
    const prop = 'prop1'
    expect(countPropertyOccurrences(list, prop)).toBe(3)
  })
})
