import './Table.css'
import {Table as DesignSystemTable} from '@amsterdam/design-system-react'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import TableCell from 'components/ui/table/TableCell'
import CheckboxField from '../forms/CheckboxField'
import type {TableProps, RequiredId} from 'components/ui/table/types'

const getEntryType = <T,>(
  entry: T | RequiredId<T>,
  isSelectable: boolean,
): entry is RequiredId<T> => {
  return !!isSelectable
}

export const Table = <T, K>({
  data,
  columns,
  onRowClick,
  isSelectable = false,
}: TableProps<T, K>) => {
  return (
    <DesignSystemTable className="Table">
      <DesignSystemTable.Header>
        <DesignSystemTable.Row>
          {!!isSelectable && <DesignSystemTable.HeaderCell />}
          {columns.map(({title}) => (
            <DesignSystemTable.HeaderCell key={title}>
              {title}
            </DesignSystemTable.HeaderCell>
          ))}
        </DesignSystemTable.Row>
      </DesignSystemTable.Header>
      <DesignSystemTable.Body>
        {data.map(entry => (
          <DesignSystemTable.Row
            onClick={() => !isSelectable && onRowClick?.(entry)}
            key={JSON.stringify(entry)}>
            {getEntryType(entry, isSelectable) && (
              <DesignSystemTable.Cell key={JSON.stringify(entry)}>
                <CheckboxField name={`${entry.id}`} />
              </DesignSystemTable.Cell>
            )}
            {columns.map(({content}) => (
              <TableCell
                obj={entry}
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
