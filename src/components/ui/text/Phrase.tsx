import {ReactNode} from 'react'
import './Phrase.css'

export type PhraseProps = {
  children?: ReactNode
  color?: 'error' | 'inverse' | 'muted' | 'default'
  emphasis?: 'strong' | 'italic'
  text?: string
}

const Phrase = ({children, color = 'default', emphasis, text}: PhraseProps) => (
  <span
    className="Phrase"
    data-color={color}
    data-emphasis={emphasis}
    data-font="body">
    {text ?? children}
  </span>
)

export default Phrase
