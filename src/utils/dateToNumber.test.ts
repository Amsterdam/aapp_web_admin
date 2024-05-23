import dateToNumber from 'utils/dateToNumber'

describe('dateToNumber', () => {
  it('should return correct timestamp for valid date string in YYYY-MM-DD format', () => {
    const dateString = '2023-05-20'
    const expectedTimestamp = new Date('2023-05-20').getTime()
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for a leap year date', () => {
    const dateString = '2024-02-29'
    const expectedTimestamp = new Date('2024-02-29').getTime()
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return NaN for an invalid date string', () => {
    const dateString = 'invalid-date'
    expect(dateToNumber(dateString)).toBeNaN()
  })

  it('should handle date and time correctly', () => {
    const dateString = '2023-05-20T15:30:00Z'
    const expectedTimestamp = new Date('2023-05-20T15:30:00Z').getTime()
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for dates far in the past', () => {
    const dateString = '1900-01-01'
    const expectedTimestamp = new Date('1900-01-01').getTime()
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for dates far in the future', () => {
    const dateString = '3000-01-01'
    const expectedTimestamp = new Date('3000-01-01').getTime()
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })
})
