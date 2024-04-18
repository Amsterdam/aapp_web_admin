import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import CheckboxToggle from 'components/ui/forms/CheckboxField/CheckboxToggle'
import {defaultRenderer} from 'components/ui/table/utils'
import type {TableRowProps} from 'components/ui/table/types'

export const TableRow = <T extends object>({
  config,
  getIsRowSelected,
  keyGetter,
  loading,
  onRowClick,
  onRowToggle,
  rowData,
  selectable,
}: TableRowProps<T>) => (
  <DesignSystemTable.Row
    className="TableRow"
    onClick={() => onRowClick?.(rowData)}>
    {!!selectable && (
      <DesignSystemTable.Cell className="CheckboxCell">
        <CheckboxToggle
          ariaLabel="Toewijzen"
          checked={getIsRowSelected?.(rowData)}
          loading={loading}
          onClick={(checked, e) => {
            e.stopPropagation()
            onRowToggle?.(rowData, checked)
          }}
        />
      </DesignSystemTable.Cell>
    )}
    {config.map(({id, key, renderer = defaultRenderer}) => (
      <DesignSystemTable.Cell key={keyGetter(rowData, id)}>
        {renderer(rowData, key)}
      </DesignSystemTable.Cell>
    ))}
  </DesignSystemTable.Row>
)
