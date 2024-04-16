import {
  Table as DesignSystemTable,
  Paragraph,
} from '@amsterdam/design-system-react'
import type {TableCellProps} from 'components/ui/table/types'

const TableCell = <T,>({content, obj}: TableCellProps<T>) => {
  return (
    <DesignSystemTable.Cell key={content[0].key as string}>
      {content.map(({key, renderer}, index) =>
        renderer ? (
          <div key={JSON.stringify(obj[key]) ?? index}>
            {renderer(obj[key] as never)}
          </div>
        ) : (
          <Paragraph key={obj[key] as string}>
            {key === 'title' ? (
              <strong>{obj[key] as string}</strong>
            ) : (
              (obj[key] as string)
            )}
          </Paragraph>
        ),
      )}
    </DesignSystemTable.Cell>
  )
}

export default TableCell
