import './Table.css'
import {
  Table as DesignSystemTable,
  Paragraph,
} from '@amsterdam/design-system-react'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import TableCell from 'components/ui/table/TableCell'
import type {TableProps} from 'components/ui/table/types'

export const Table = <T extends object, K>({
  data,
  columns,
  onRowClick,
}: TableProps<T, K>) => {
  return (
    <DesignSystemTable className="Table">
      <DesignSystemTable.Header>
        <DesignSystemTable.Row>
          {columns.map(({title}) => (
            <DesignSystemTable.HeaderCell key={title}>
              {title}
            </DesignSystemTable.HeaderCell>
          ))}
        </DesignSystemTable.Row>
      </DesignSystemTable.Header>
      <DesignSystemTable.Body>
        {data.map(obj => (
          <DesignSystemTable.Row
            onClick={() => onRowClick?.(obj)}
            key={JSON.stringify(obj)}>
            {columns.map(({content}) => (
              <TableCell
                obj={obj}
                content={content}
                key={JSON.stringify(content)}
              />
            ))}
          </DesignSystemTable.Row>
        ))}
      </DesignSystemTable.Body>
    </DesignSystemTable>
  )
}
