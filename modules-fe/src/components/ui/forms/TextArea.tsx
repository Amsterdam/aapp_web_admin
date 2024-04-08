import {HTMLProps} from 'react'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import {CharactersLeftDisplay} from './CharactersLeftDisplay'

import './TextField.css'

enum FieldWidth {
  half = 'half',
}

export type TextAreaProps = {
  error?: string
  label: string
  width?: keyof typeof FieldWidth
} & HTMLProps<HTMLTextAreaElement>

const TextArea = ({
  id,
  onChange,
  error,
  label,
  rows,
  value,
  width,
  maxLength,
}: TextAreaProps) => (
  <Column gutter="sm">
    <label className="TextAreaLabel" data-width={width} htmlFor={id}>
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
    <CharactersLeftDisplay maxLength={maxLength} value={value?.toString()} />
    {!!error && <Phrase color="error">{error}</Phrase>}
  </Column>
)

export default TextArea
