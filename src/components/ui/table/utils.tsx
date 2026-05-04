import Phrase from '@/components/ui/text/Phrase'

/**
 * Will be used to get a unique key if no getter is added via the Table props
 */
export const defaultKeyGetter = <T extends object>(obj: T) =>
  JSON.stringify(obj)

/**
 * Will be used to render the table cell data if no renderer is defined in the column configuration
 */
export const defaultRenderer = <T extends object>(
  rowData: T,
  key?: keyof T,
) => {
  if (key === undefined) {
    return null
  }
  const value =
    typeof rowData[key] === 'string'
      ? (rowData[key] as string)
      : JSON.stringify(rowData[key])

  return <Phrase key={value}>{value}</Phrase>
}
