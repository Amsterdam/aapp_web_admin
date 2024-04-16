import {Key} from 'react'

export const defaultKeyGetter = <T>(obj: T, affix?: Key) =>
  `${affix?.toString()}-${JSON.stringify(obj)}`
