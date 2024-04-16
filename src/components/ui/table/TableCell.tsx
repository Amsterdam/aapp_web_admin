import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import Phrase from 'components/ui/text/Phrase'
import countPropertyOccurrences from 'utils/countPropertyOccurrences'
import type {TableCellProps} from 'components/ui/table/types'

const defaultRenderer = <T extends object>(
  obj: T,
  key: keyof T,
  highLighted = false,
) => {
  const value =
    typeof obj[key] === 'string'
      ? (obj[key] as string)
      : JSON.stringify(obj[key])

  return (
    <Phrase emphasis={highLighted ? 'strong' : undefined} key={value}>
      {value}
    </Phrase>
  )
}

const TableCell = <T extends object>({content, obj}: TableCellProps<T>) => {
  const hasMultipleKeys = countPropertyOccurrences(content, 'key') > 1

  return (
    <DesignSystemTable.Cell>
      {content.map(({key, renderer = defaultRenderer}, index) =>
        renderer(obj, key, hasMultipleKeys && index === 0),
      )}
    </DesignSystemTable.Cell>
  )
}

export default TableCell
