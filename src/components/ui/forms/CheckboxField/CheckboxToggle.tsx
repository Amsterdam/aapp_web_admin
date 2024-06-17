import {AriaAttributes} from 'react'
import CheckboxIndicator from 'components/ui/forms/CheckboxField/CheckboxIndicator'

import './CheckboxToggle.css'

type Props = {
  ariaLabel: AriaAttributes['aria-label']
  checked?: boolean
  loading?: boolean
  onClick: (
    checked: boolean,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const CheckboxToggle = ({
  ariaLabel,
  checked = false,
  loading = false,
  onClick,
}: Props) => (
  <div className={`CheckboxToggle${loading ? ' CheckboxToggleLoading' : ''}`}>
    <button
      aria-label={`${ariaLabel}: ${checked ? 'uitzetten' : 'aanzetten'}`}
      onClick={e => {
        if (loading) {
          return
        }
        onClick(!checked, e)
      }}
      type="button">
      <CheckboxIndicator status={checked} />
    </button>
  </div>
)

export default CheckboxToggle
