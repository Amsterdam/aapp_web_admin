import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import CheckboxToggle from 'components/ui/forms/CheckboxField/CheckboxToggle'
import {defaultRenderer} from 'components/ui/table/utils'
import type {TableRowProps} from 'components/ui/table/types'
import 'components/ui/button/BlockLink.css'
import 'components/ui/table/TableRow.css'

const TableRow = <T extends object>({
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
    className={`${onRowClick ? 'BlockLink' : ''} TableRow`}
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
      <DesignSystemTable.Cell key={`${keyGetter(rowData)}-${id}`}>
        {renderer(rowData, key)}
      </DesignSystemTable.Cell>
    ))}
  </DesignSystemTable.Row>
)

export default TableRow
