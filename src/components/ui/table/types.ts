import {Key, ReactNode} from 'react'

export type ColumnConfig<T extends object> = {
  key: keyof T
  renderer?: (obj: T) => ReactNode
}[]

export type Column<T extends object> = {
  config: ColumnConfig<T>
  id: string
  title: string
}

export type TableProps<T extends object> = {
  /** An array of names of showing columns */
  columns: Column<T>[]
  /** An array of data objects */
  data: T[]
  isRowChecked?: (obj: T) => boolean
  loading?: boolean
  keyGetter: (obj: T, affix?: string) => Key
  onRowClick?: (obj: T) => void
  onRowToggle?: (obj: T, checked: boolean) => void
}

export type TableRowProps<T extends object> = TableProps<T> & {
  key: Key
  rowData: T
  withCheckboxes: boolean
}

export type TableCellProps<T extends object> = {
  config: ColumnConfig<T>
  rowData: T
}
