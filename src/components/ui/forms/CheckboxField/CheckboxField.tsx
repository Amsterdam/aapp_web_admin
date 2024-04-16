import React from 'react'
import {UseControllerProps, useFormContext} from 'react-hook-form'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Phrase from 'components/ui/text/Phrase'
import {CheckboxIndicator} from './CheckboxIndicator'

import './Checkbox.css'

type Props = {
  hideLabel?: boolean
  isGroupFormField?: boolean
  label: string
} & UseControllerProps

const CheckboxField = ({
  hideLabel = false,
  isGroupFormField,
  label,
  name,
}: Props) => {
  const {register, setValue, watch} = useFormContext()
  const value = isGroupFormField
    ? [...(watch(name) ?? [])].includes(label)
    : watch(name)
  const {onChange: onChangeRHF, ...rest} = register(name)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === 'indeterminate') {
      setValue(name, true)
    } else {
      onChangeRHF(event)
    }
  }

  return (
    <Column gutter="sm" halign="start">
      <label className="CheckboxField" htmlFor={label}>
        <Row gutter="sm" valign="center">
          <input
            {...rest}
            id={label}
            hidden
            onChange={onChange}
            type="checkbox"
            value={isGroupFormField ? label : undefined}
          />
          <CheckboxIndicator status={value} />
          {!!hideLabel && <Phrase>{label}</Phrase>}
        </Row>
      </label>
    </Column>
  )
}

export default CheckboxField
