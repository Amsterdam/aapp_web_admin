// import {ReactNode, useMemo} from 'react'
import './Table.css'
import {Table as TanstackTable} from '@amsterdam/design-system-react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import {useState} from 'react'
import Button from '../button/Button'

type Props = {fuck?: string}

type ContentThing = {
  title: string
  date: string
}

const data = [
  {title: 'Project 1', date: '1apr'},
  {title: 'Project 2', date: '1apr'},
  {title: 'Project 3', date: '1apr'},
  {title: 'Project 4', date: '1apr'},
  {title: 'Project 5', date: '1apr'},
  {title: 'Project 6', date: '1apr'},
  {title: 'Project 7', date: '1apr'},
  {title: 'Project 8', date: '1apr'},
  // 8 rows
  {title: 'Project 9', date: '1apr'},
  {title: 'Project 10', date: '1apr'},
  {title: 'Project 11', date: '1apr'},
  {title: 'Project 12', date: '1apr'},
  {title: 'Project 13', date: '1apr'},
  {title: 'Project 14', date: '1apr'},
  {title: 'Project 15', date: '1apr'},
  {title: 'Project 16', date: '1apr'},
]

const columnHelper = createColumnHelper<ContentThing>()

const columns = [
  columnHelper.accessor('title', {
    header: () => 'Titel',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: () => 'Datum',
    cell: info => info.renderValue(),
  }),
]

const Table = ({fuck}: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <TanstackTable>
      <TanstackTable.Header>
        {table.getHeaderGroups().map(headerGroup => (
          <TanstackTable.Row key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TanstackTable.HeaderCell key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TanstackTable.HeaderCell>
            ))}
          </TanstackTable.Row>
        ))}
      </TanstackTable.Header>
      <TanstackTable.Body>
        {table.getRowModel().rows.map(row => (
          <TanstackTable.Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TanstackTable.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TanstackTable.Cell>
            ))}
          </TanstackTable.Row>
        ))}
      </TanstackTable.Body>
      <TanstackTable.Footer>
        <TanstackTable.Row>
          <Button
            label="Prev"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            label="Next"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </TanstackTable.Row>
      </TanstackTable.Footer>
    </TanstackTable>
  )
}

export default Table
