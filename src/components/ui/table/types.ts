import {Key, ReactNode} from 'react'

export type ColumnConfig<T extends object> = {
  key?: keyof T
  renderer?: (obj: T, key?: keyof T) => ReactNode
  id: string
  title?: string
}

export type TableProps<T extends object> = {
  config: ColumnConfig<T>[]
  /** An array of data objects */
  data: T[]
  filterCallback?: (query: string) => void
  filterQuery?: string
  /** Will be called per row to determine if the checkbox should be checked */
  getIsRowSelected?: (obj: T) => boolean
  loading?: boolean
  /** Will be called per row and per cell to get a unique key */
  keyGetter: (obj: T) => Key
  onRowClick?: (obj: T) => void
  onRowToggle?: (obj: T, checked: boolean) => void
}

export type TableHeaderProps<T extends object> = {
  config: ColumnConfig<T>[]
  selectable: boolean
}

export type TableRowProps<T extends object> = TableProps<T> & {
  key: Key
  rowData: T
  selectable: boolean
}

export type TableCellProps<T extends object> = {
  configItem: ColumnConfig<T>
  rowData: T
}
