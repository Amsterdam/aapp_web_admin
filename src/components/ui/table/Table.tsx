import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import {TableHeader} from 'components/ui/table/TableHeader'
import {TableRow} from 'components/ui/table/TableRow'
import {defaultKeyGetter} from 'components/ui/table/utils'
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
    keyGetter = defaultKeyGetter,
    onRowToggle,
  } = props

  const selectable = !!getIsRowSelected && !!onRowToggle

  return (
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
  )
}
