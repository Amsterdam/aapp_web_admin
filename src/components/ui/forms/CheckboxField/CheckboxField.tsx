import React from 'react'
import {UseControllerProps, useFormContext} from 'react-hook-form'
import {CheckboxIndicator} from 'components/ui/forms/CheckboxField/CheckboxIndicator'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Phrase from 'components/ui/text/Phrase'

import './CheckboxField.css'

type Props = {
  isGroupFormField?: boolean
  label: string
} & UseControllerProps

const CheckboxField = ({isGroupFormField, label, name}: Props) => {
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
            hidden
            id={label}
            onChange={onChange}
            type="checkbox"
            value={isGroupFormField ? label : undefined}
          />
          <CheckboxIndicator status={value} />
          <Phrase>{label}</Phrase>
        </Row>
      </label>
    </Column>
  )
}

export default CheckboxField
