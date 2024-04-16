import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import {TableRow} from 'components/ui/table//TableRow'
import {defaultKeyGetter} from 'components/ui/table//utils'
import type {TableProps} from 'components/ui/table/types'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'

import './Table.css'

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    columns,
    data,
    isRowChecked,
    keyGetter = defaultKeyGetter,
    onRowToggle,
  } = props

  const withCheckboxes = !!isRowChecked && !!onRowToggle

  return (
    <DesignSystemTable className="Table">
      <DesignSystemTable.Header>
        <DesignSystemTable.Row>
          {!!withCheckboxes && <DesignSystemTable.HeaderCell />}
          {columns.map(({title}) => (
            <DesignSystemTable.HeaderCell key={title}>
              {title}
            </DesignSystemTable.HeaderCell>
          ))}
        </DesignSystemTable.Row>
      </DesignSystemTable.Header>
      <DesignSystemTable.Body>
        {data.map(obj => (
          <TableRow
            {...props}
            key={keyGetter(obj)}
            rowData={obj}
            withCheckboxes={withCheckboxes}
          />
        ))}
      </DesignSystemTable.Body>
    </DesignSystemTable>
  )
}
