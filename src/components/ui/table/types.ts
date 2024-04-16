import {Key, ReactNode} from 'react'

export type TableProps<T extends object> = {
  /** An array of names of showing columns */
  columns: Column<T>[]
  /** An array of data objects */
  data: T[]
  isRowChecked?: (obj: T) => boolean
  keyGetter: (obj: T, prefix?: Key) => Key
  onRowClick?: (obj: T) => void
  onRowToggle?: (obj: T, checked: boolean) => void
}

export type ColumnContent<T extends object> = {
  key: keyof T
  renderer?: (obj: T) => ReactNode
}[]

export type Column<T extends object> = {
  content: ColumnContent<T>
  title: string
}

export type TableCellProps<T extends object> = {
  content: ColumnContent<T>
  obj: T
}
