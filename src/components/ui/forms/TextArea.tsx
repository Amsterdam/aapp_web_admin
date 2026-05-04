import uniqueId from 'lodash.uniqueid'
import {HTMLProps} from 'react'
import {Controller, UseControllerProps} from 'react-hook-form'
import Column from '@/components/ui/layout/Column'
import Phrase from '@/components/ui/text/Phrase'
import './TextField.css'
import CharactersLeftDisplay from './CharactersLeftDisplay'

enum FieldWidth {
  half = 'half',
}

type Props = {
  label: string
  width?: keyof typeof FieldWidth
} & UseControllerProps &
  HTMLProps<HTMLTextAreaElement>

const TextArea = ({
  defaultValue,
  label,
  name,
  rows,
  rules,
  width,
  maxLength,
}: Props) => {
  const id = uniqueId('TextArea-')

  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Column gutter="sm">
          <label
            className="TextAreaLabel"
            data-width={width}
            htmlFor={id}>
            <Column gutter="sm">
              <Phrase color="muted">{label}</Phrase>
              <textarea
                className="Input"
                data-font="body"
                data-has-error={!!error}
                id={id}
                maxLength={maxLength}
                onChange={onChange}
                rows={rows}
                value={value}
              />
            </Column>
          </label>
          <CharactersLeftDisplay
            maxLength={maxLength}
            value={value}
          />
          {!!error && <Phrase color="error">{error.message}</Phrase>}
        </Column>
      )}
      rules={rules}
    />
  )
}

export default TextArea
