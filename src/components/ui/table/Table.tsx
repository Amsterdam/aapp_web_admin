import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import TextFilter from 'components/ui/forms/TextFilter'
import Column from 'components/ui/layout/Column'
import TableHeader from 'components/ui/table/TableHeader'
import TableRow from 'components/ui/table/TableRow'
import {defaultKeyGetter} from 'components/ui/table/utils'
import type {TableProps} from 'components/ui/table/types'

import './Table.css'

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    config,
    data,
    getIsRowSelected,
    filterQuery = '',
    filterCallback,
    keyGetter = defaultKeyGetter,
    onRowToggle,
  } = props

  const selectable = !!getIsRowSelected && !!onRowToggle

  return (
    <Column gutter="sm">
      {!!filterCallback && (
        <TextFilter
          callback={filterCallback}
          placeholder="Zoek in deze tabel"
          value={filterQuery}
        />
      )}
      <DesignSystemTable className="Table">
        <TableHeader config={config} selectable={selectable} />
        <DesignSystemTable.Body>
          {data.map(obj => (
            <TableRow
              {...props}
              key={keyGetter(obj)}
              rowData={obj}
              selectable={selectable}
            />
          ))}
        </DesignSystemTable.Body>
      </DesignSystemTable>
    </Column>
  )
}

export default Table
