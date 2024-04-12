export type RequiredId<T> = T & {id: number}

export type TableProps<T, K> = {
  /** An array of names of showing columns */
  columns: Column<T, K>[]
  /** A function executes when click on a Row */
  onRowClick?: (entry: T) => void
} & (NonSelectableTableProps<T> | SelectableTableProps<T>)

type SelectableTableProps<T> = {
  data: RequiredId<T>[]
  isSelectable: true
}
type NonSelectableTableProps<T> = {
  data: T[]
  isSelectable?: false
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
