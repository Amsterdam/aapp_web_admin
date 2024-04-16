import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import CheckboxToggle from 'components/ui/forms/CheckboxField/CheckboxToggle'
import TableCell from 'components/ui/table/TableCell'
import type {TableRowProps} from 'components/ui/table/types'

export const TableRow = <T extends object>({
  columns,
  isRowChecked,
  keyGetter,
  loading,
  onRowClick,
  onRowToggle,
  rowData,
  withCheckboxes,
}: TableRowProps<T>) => (
  <DesignSystemTable.Row
    className="TableRow"
    onClick={() => onRowClick?.(rowData)}>
    {!!withCheckboxes && (
      <DesignSystemTable.Cell className="CheckboxCell">
        <CheckboxToggle
          ariaLabel="Toewijzen"
          checked={isRowChecked?.(rowData)}
          loading={loading}
          onClick={(checked, e) => {
            e.stopPropagation()
            onRowToggle?.(rowData, checked)
          }}
        />
      </DesignSystemTable.Cell>
    )}
    {columns.map(({config, id}) => (
      <TableCell
        rowData={rowData}
        config={config}
        key={keyGetter(rowData, id)}
      />
    ))}
  </DesignSystemTable.Row>
)
