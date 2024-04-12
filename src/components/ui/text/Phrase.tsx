import {ReactNode} from 'react'
import './Phrase.css'

export type PhraseProps = {
  children?: ReactNode
  color?: 'error' | 'inverse' | 'muted' | 'default'
  emphasis?: 'strong' | 'italic'
}

const Phrase = ({children, color = 'default', emphasis}: PhraseProps) => (
  <span
    className="Phrase"
    data-color={color}
    data-emphasis={emphasis}
    data-font="body">
    {children}
  </span>
)

export default Phrase
