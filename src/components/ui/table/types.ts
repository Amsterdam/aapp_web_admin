export type TableProps<T, K> = {
  /** An array of names of showing columns */
  columns: Column<T, K>[]
  /** An array of data objects */
  data: T[]
  onRowClick?: (obj: T) => void
}

export type ColumnContent<T, K> = {
  key: keyof T
  renderer?: (value: K) => React.ReactNode
}[]

export type Column<T, K> = {
  content: ColumnContent<T, K>
  title: string
}

export type TableCellProps<T, K> = {
  content: ColumnContent<T, K>
  obj: T
}
