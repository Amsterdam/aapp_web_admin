import {FieldPath, FieldPathValue, FieldValues} from 'react-hook-form'
import './Input.css'

type Props = {
  hasError: boolean
  id: string
  name: FieldPath<FieldValues>
  maxLength?: number
  onChange: (...event: unknown[]) => void
  type?: string
  value: FieldPathValue<FieldValues, FieldPath<FieldValues>>
}

const Input = ({
  hasError,
  id,
  maxLength,
  name,
  onChange,
  type,
  value,
}: Props) => (
  <input
    className="Input"
    data-font="body"
    data-has-error={hasError}
    id={id}
    maxLength={maxLength}
    name={name}
    onChange={onChange}
    type={type}
    value={value}
  />
)

export default Input
