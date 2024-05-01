type GetTypeOfParam<Param extends string> = Param extends `${infer Name}?`
  ? Partial<Record<Name, string | number>>
  : Record<Param, string | number>

/**
 * ExtractParam<'releases/:hotfixVersion?/create', Record<string, string>> = {hotfixVersion: string} & Record<string, string>
 */
type ExtractParam<Path, NextPart> = Path extends `:${infer Param}`
  ? GetTypeOfParam<Param> & NextPart
  : NextPart

/**
 * ExtractParams<'releases/:hotfixVersion?/create'> = {hotfixVersion: string}
 */
export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, Record<string, string | number>>

/**
 * getUrl<'releases/:hotfixVersion?/create', {hotfixVersion: '0.15.0'}> = 'releases/0.15.0/create'
 */
const getUrl = <T extends string>(url: T, params?: ExtractParams<T>) =>
  url.replace(/:([^/?]+)\??/g, match => {
    const paramName = match.replace(/[:?]/g, '')

    return params?.[paramName]?.toString() ?? ''
  })

export default getUrl
