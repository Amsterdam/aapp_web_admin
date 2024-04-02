// import {ReactNode, useMemo} from 'react'
import './Table.css'
import {Table} from '@amsterdam/design-system-react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'

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
  {title: 'Project 51', date: '1apr'},
  {title: 'Project 457', date: '1apr'},
  {title: 'Project 1457', date: '1apr'},
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

const TableQ = ({fuck}: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="Table">
      <Table.Header>
        {table.getHeaderGroups().map(headerGroup => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Table.HeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map(row => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      {/* <Table.Footer>
        {table.getFooterGroups().map(footerGroup => (
          <Table.Row key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </Table.Row>
        ))}
      </Table.Footer> */}
    </Table>
  )
}

export default TableQ
