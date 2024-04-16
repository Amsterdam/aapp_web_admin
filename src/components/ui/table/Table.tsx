import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import {Key} from 'react'
import TableCell from 'components/ui/table/TableCell'
import CheckboxToggle from '../forms/CheckboxField/CheckboxToggle'
import type {TableProps} from 'components/ui/table/types'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'

import './Table.css'

const defaultKeyGetter = <T,>(obj: T, prefix?: Key) =>
  `${prefix}${JSON.stringify(obj)}`

export const Table = <T extends object>({
  data,
  columns,
  isRowChecked,
  keyGetter = defaultKeyGetter,
  onRowClick,
  onRowToggle,
}: TableProps<T>) => {
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
        {data.map(obj => {
          const key = keyGetter(obj)

          return (
            <DesignSystemTable.Row onClick={() => onRowClick?.(obj)} key={key}>
              {!!withCheckboxes && (
                <DesignSystemTable.Cell>
                  <CheckboxToggle
                    status={isRowChecked?.(obj)}
                    onClick={(checked, e) => {
                      e.stopPropagation()
                      onRowToggle?.(obj, checked)
                    }}
                  />
                </DesignSystemTable.Cell>
              )}
              {columns.map(({content}) => (
                <TableCell
                  obj={obj}
                  content={content}
                  key={defaultKeyGetter(content, key)}
                />
              ))}
            </DesignSystemTable.Row>
          )
        })}
      </DesignSystemTable.Body>
    </DesignSystemTable>
  )
}
