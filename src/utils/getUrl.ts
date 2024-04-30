/**
 * GetTypeOfParam<':id'> = {id: string}
 */
type GetTypeOfParam<Param extends string> = Param extends `${infer Name}?`
  ? Partial<Record<Name, string>>
  : Record<Param, string>

/**
 * ExtractParam<':id', '/articles/:articleId?'> = {id: string} & '/articles/:articleId?'
 */
type ExtractParam<Path, NextPart> = Path extends `:${infer Param}`
  ? GetTypeOfParam<Param> & NextPart
  : NextPart

/**
 * ExtractParams<'/:id/articles/:articleId?'> = {id: string, articleId?: string}
 */
type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, Record<string, string>>

const getUrl = <T extends string>(url: T, params: ExtractParams<T>) =>
  url.replace(/:\w+/g, match => params[match.slice(1)])

export default getUrl
