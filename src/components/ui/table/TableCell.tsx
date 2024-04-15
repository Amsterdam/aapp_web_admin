import {
  Table as DesignSystemTable,
  Paragraph,
} from '@amsterdam/design-system-react'
import type {TableCellProps} from 'components/ui/table/types'

const TableCell = <T, K>({content, obj}: TableCellProps<T, K>) => {
  return (
    <DesignSystemTable.Cell key={JSON.stringify(content)}>
      {content.map(({key, renderer}) =>
        renderer ? (
          <div key={obj[key] as string}>{renderer(obj[key] as K)}</div>
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
