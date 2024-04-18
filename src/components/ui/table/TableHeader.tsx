import {Table as DesignSystemTable} from '@amsterdam/design-system-react'
import type {TableHeaderProps} from 'components/ui/table/types'

export const TableHeader = <T extends object>({
  config,
  selectable,
}: TableHeaderProps<T>) => (
  <DesignSystemTable.Header>
    <DesignSystemTable.Row>
      {!!selectable && <DesignSystemTable.HeaderCell />}
      {config.map(({id, title}) => (
        <DesignSystemTable.HeaderCell key={id}>
          {title}
        </DesignSystemTable.HeaderCell>
      ))}
    </DesignSystemTable.Row>
  </DesignSystemTable.Header>
)
