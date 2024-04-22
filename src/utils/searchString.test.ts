import {
  addSearchString,
  getSearchString,
  applyAllowList,
  filterBySearchStringMatch,
} from './searchString'

describe('getSearchString', () => {
  it('returns empty string for nullish input', () => {
    expect(getSearchString(null)).toBe('')
    expect(getSearchString(undefined)).toBe('')
  })

  it('ignores booleans', () => {
    expect(getSearchString(true)).toBe('')
    expect(getSearchString(false)).toBe('')
  })

  it('joins array elements with pipe', () => {
    expect(getSearchString(['a', 'b', 'c'])).toBe('a|b|c')
  })

  it('maps object values and joins with pipe', () => {
    expect(getSearchString({a: 1, b: 2, c: 3})).toBe('1|2|3')
  })

  it('handled nested object and array values', () => {
    expect(getSearchString({a: [1, 2], b: {ba: 3}, c: [{ca: 4}]})).toBe(
      '1|2|3|4',
    )
  })

  it('converts other types to string', () => {
    expect(getSearchString(123)).toBe('123')
  })
})

describe('applyAllowList', () => {
  it('returns original input if allowList is not provided', () => {
    const input = {a: 1, b: 2}
    expect(applyAllowList(input)).toEqual(input)
  })

  it('filters out properties not specified in allowList', () => {
    const input = {a: 1, b: 2, c: 3}
    const allowList = ['a'] as (keyof typeof input)[]
    expect(applyAllowList(input, allowList)).toEqual({a: 1})
  })
})

describe('addSearchString', () => {
  it('adds searchString property to input', () => {
    const input = [{a: 1, b: 2}]
    expect(addSearchString(input)[0]).toHaveProperty('searchString')
  })

  it('adds searchString with all properties if allowList is omitted', () => {
    const input = [{a: 1, b: '2', c: ['3'], d: {e: '4'}}]
    const expectedsearchString = '1|2|3|4'
    expect(addSearchString(input)[0]).toEqual({
      ...input[0],
      searchString: expectedsearchString,
    })
  })

  it('adds searchString property with correct value', () => {
    const input = [{a: 1, b: 2, c: [3, 4, 5]}]
    const expectedsearchString = '1|2|3|4|5'
    expect(addSearchString(input)).toEqual([
      {
        ...input[0],
        searchString: expectedsearchString,
      },
    ])
  })

  it('adds searchString using lowercase only', () => {
    const input = [{a: 'Apple', b: 'Banana'}]
    const expectedsearchString = 'apple|banana'
    expect(addSearchString(input)).toEqual([
      {
        ...input[0],
        searchString: expectedsearchString,
      },
    ])
  })

  it('filters out properties before adding searchString if allowList is provided', () => {
    const input = [{a: 1, b: 2, c: 3}]
    const allowList = ['a', 'b'] as (keyof (typeof input)[0])[]
    const expectedsearchString = '1|2'
    expect(addSearchString(input, allowList)).toEqual([
      {
        ...input[0],
        searchString: expectedsearchString,
      },
    ])
  })
})

describe('filterBySearchStringMatch', () => {
  const testData = [
    {id: 1, name: 'apple', searchString: 'apple|fruit'},
    {id: 2, name: 'banana', searchString: 'banana|fruit'},
    {id: 3, name: 'carrot', searchString: 'carrot|vegetable'},
  ]

  it('returns original array if query is empty', () => {
    const result = filterBySearchStringMatch(testData, '')
    expect(result).toEqual(result)
  })

  it('filters data based on query match', () => {
    const result1 = filterBySearchStringMatch(testData, 'banana')
    expect(result1).toEqual([
      {id: 2, name: 'banana', searchString: 'banana|fruit'},
    ])

    const result2 = filterBySearchStringMatch(testData, 'fruit')
    expect(result2).toEqual([
      {id: 1, name: 'apple', searchString: 'apple|fruit'},
      {id: 2, name: 'banana', searchString: 'banana|fruit'},
    ])

    const result3 = filterBySearchStringMatch(testData, 'vegetable')
    expect(result3).toEqual([
      {id: 3, name: 'carrot', searchString: 'carrot|vegetable'},
    ])

    const result4 = filterBySearchStringMatch(testData, 'nonexistent')
    expect(result4).toEqual([])
  })

  it('matches only the content between the pipes', () => {
    const result = filterBySearchStringMatch(testData, 'na|fru')
    expect(result).toEqual([])
  })

  it('returns empty array if no match is found', () => {
    const result = filterBySearchStringMatch(testData, 'nonexistent')
    expect(result).toEqual([])
  })

  it('does partial matches', () => {
    const result1 = filterBySearchStringMatch(testData, 'nan')
    expect(result1).toEqual([
      {id: 2, name: 'banana', searchString: 'banana|fruit'},
    ])
  })

  it('ignores case', () => {
    const result1 = filterBySearchStringMatch(testData, 'NaN')
    expect(result1).toEqual([
      {id: 2, name: 'banana', searchString: 'banana|fruit'},
    ])
  })
})
