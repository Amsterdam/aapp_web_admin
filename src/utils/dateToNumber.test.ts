import dateToNumber from '@/utils/dateToNumber'

describe('dateToNumber', () => {
  it('should return correct timestamp for valid date string in YYYY-MM-DD format', () => {
    const dateString = '2023-05-20'
    const expectedTimestamp = 1684540800000
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for a leap year date', () => {
    const dateString = '2024-02-29'
    const expectedTimestamp = 1709164800000
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return NaN for an invalid date string', () => {
    const dateString = 'invalid-date'
    expect(dateToNumber(dateString)).toBeNaN()
  })

  it('should handle date and time correctly', () => {
    const dateString = '2023-05-20T15:30:00Z'
    const expectedTimestamp = 1684596600000
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for dates far in the past', () => {
    const dateString = '1900-01-01'
    const expectedTimestamp = -2208988800000
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })

  it('should return correct timestamp for dates far in the future', () => {
    const dateString = '3000-01-01'
    const expectedTimestamp = 32503680000000
    expect(dateToNumber(dateString)).toBe(expectedTimestamp)
  })
})
