import getUrl from './getUrl'

describe('getUrl', () => {
  it('should replace parameters in the URL correctly', () => {
    const url = '/articles/:articleId?'
    const params = {articleId: '1'}
    expect(getUrl(url, params)).toBe('/articles/1')
  })

  it('should handle optional parameters correctly', () => {
    const url = '/articles/:articleId?'
    const params = {}
    expect(getUrl(url, params)).toBe('/articles/')
  })

  it('should replace multiple parameters in the URL correctly', () => {
    const url = '/users/:userId/profile/:section?'
    const params = {userId: '123', section: 'settings'}
    expect(getUrl(url, params)).toBe('/users/123/profile/settings')
  })

  it('should handle parameters with multiple segments correctly', () => {
    const url = '/users/:userId/profile/:section?'
    const params = {userId: '123'}
    expect(getUrl(url, params)).toBe('/users/123/profile/')
  })

  it('should handle parameters with non-string values correctly', () => {
    const url = '/articles/:articleId?'
    const params = {articleId: '123'} // Note: non-string value
    expect(getUrl(url, params)).toBe('/articles/123')
  })

  it('should handle parameters with empty string values correctly', () => {
    const url = '/articles/:articleId?'
    const params = {articleId: ''}
    expect(getUrl(url, params)).toBe('/articles/')
  })
})
