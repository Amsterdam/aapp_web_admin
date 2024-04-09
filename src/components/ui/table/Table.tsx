import './Table.css'
import {Table as DesignSystemTable} from '@amsterdam/design-system-react'

import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import {capitalizeString} from 'utils/capitalizeString'

type Props<T> = {
  /** An array of data objects */
  data: T[]
  /** An array of names of showing columns */
  columnNames: Array<keyof T>
}

export const Table = <T,>({data, columnNames}: Props<T>) => {
  return (
    <DesignSystemTable className="Table">
      <DesignSystemTable.Header>
        <DesignSystemTable.Row key={1}>
          {columnNames.map(name => (
            <DesignSystemTable.HeaderCell key={name as string}>
              {capitalizeString(name as string)}
            </DesignSystemTable.HeaderCell>
          ))}
        </DesignSystemTable.Row>
      </DesignSystemTable.Header>
      <DesignSystemTable.Body>
        {data.map(obj => (
          <DesignSystemTable.Row key={(obj as string) ?? ''}>
            {columnNames.map(key => (
              <DesignSystemTable.Cell key={obj[key] as string}>
                {obj[key] as string}
              </DesignSystemTable.Cell>
            ))}
          </DesignSystemTable.Row>
        ))}
      </DesignSystemTable.Body>
    </DesignSystemTable>
  )
}
