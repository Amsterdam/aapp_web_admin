import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import Phrase from 'components/ui/text/Phrase'
import countPropertyOccurrences from 'utils/countPropertyOccurrences'
import type {TableCellProps} from 'components/ui/table/types'

const defaultRenderer = <T extends object>(
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

const TableCell = <T extends object>({config, rowData}: TableCellProps<T>) => {
  const hasMultipleKeys = countPropertyOccurrences(config, 'key') > 1

  return (
    <DesignSystemTable.Cell>
      {config.map(({key, renderer = defaultRenderer}, index) =>
        renderer(rowData, key, hasMultipleKeys && index === 0),
      )}
    </DesignSystemTable.Cell>
  )
}

export default TableCell
