import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import {defaultRenderer} from 'components/ui/table/utils'
import countPropertyOccurrences from 'utils/countPropertyOccurrences'
import type {TableCellProps} from 'components/ui/table/types'

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
