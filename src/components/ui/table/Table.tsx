import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import {TextFilter} from 'components/ui/forms/TextFilter'
import Column from 'components/ui/layout/Column'
import {TableRow} from 'components/ui/table//TableRow'
import {defaultKeyGetter} from 'components/ui/table//utils'
import {TableHeader} from 'components/ui/table/TableHeader'
import type {TableProps} from 'components/ui/table/types'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'

import './Table.css'

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    config,
    data,
    getIsRowSelected,
    filter = '',
    filterCallback,
    keyGetter = defaultKeyGetter,
    onRowToggle,
  } = props

  const selectable = !!getIsRowSelected && !!onRowToggle

  return (
    <Column>
      {!!filterCallback && (
        <TextFilter
          callback={filterCallback}
          placeholder="Zoek in deze tabel"
          value={filter}
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
