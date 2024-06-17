import {HTMLProps} from 'react'

import './Input.css'

type Props = {
  callback: (query: string) => void
} & Omit<HTMLProps<HTMLInputElement>, 'className' | 'onChange' | 'type'>

const TextFilter = ({callback, ...rest}: Props) => (
  <input
    maxLength={100}
    {...rest}
    className="Input"
    data-font="body"
    onChange={e => {
      callback(e.currentTarget.value)
    }}
    type="text"
  />
)

export default TextFilter
