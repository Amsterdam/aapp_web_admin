import {Key} from 'react'
import Phrase from 'components/ui/text/Phrase'

export const defaultKeyGetter = <T extends object>(obj: T, affix?: Key) =>
  `${affix?.toString()}-${JSON.stringify(obj)}`

export const defaultRenderer = <T extends object>(
  rowData: T,
  key: keyof T,
  highLighted = false,
) => {
  const value =
    typeof rowData[key] === 'string'
      ? (rowData[key] as string)
      : JSON.stringify(rowData[key])

  return (
    <Phrase emphasis={highLighted ? 'strong' : undefined} key={value}>
      {value}
    </Phrase>
  )
}
