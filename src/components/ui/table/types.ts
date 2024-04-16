export type TableProps<T> = {
  /** An array of names of showing columns */
  columns: Column<T>[]
  /** An array of data objects */
  data: T[]
  onRowClick?: (obj: T) => void
}

export type ColumnContent<T> = {
  key: keyof T
  renderer?: (value: never) => React.ReactNode
}[]

export type Column<T> = {
  content: ColumnContent<T>
  title: string
}

export type TableCellProps<T> = {
  content: ColumnContent<T>
  obj: T
}
