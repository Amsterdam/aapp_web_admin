type GetTypeOfParam<Param extends string> = Param extends `${infer Name}?`
  ? Partial<Record<Name, string>>
  : Record<Param, string>

type ExtractParam<Path, NextPart> = Path extends `:${infer Param}`
  ? GetTypeOfParam<Param> & NextPart
  : NextPart

type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, Record<string, string>>

const getUrl = <T extends string>(url: T, params: ExtractParams<T>) =>
  url.replace(/:([^/?]+)\??/g, match => {
    const paramName = match.replace(/[:?]/g, '')

    return params[paramName] ?? ''
  })

const url = '/users/:userId/profile/:section?'
const params = {userId: '123', section: 'settings'}

getUrl(url, params)

export default getUrl
