import Loader from 'components/ui/containers/Loader'
import {CheckboxIndicatorStatus, CheckboxIndicator} from './CheckboxIndicator'

import './Checkbox.css'

type Props = {
  status: CheckboxIndicatorStatus
  loading?: boolean
  onClick: (
    checked: boolean,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const getLabel = (status: CheckboxIndicatorStatus) => {
  switch (status) {
    case true:
      return 'Aangevinkt'
    case false:
      return 'Uitgevinkt'
    case 'indeterminate':
    default:
      return 'Status onbekend'
  }
}

const getNewValue = (status: CheckboxIndicatorStatus) => {
  if (status === 'indeterminate') {
    return false
  }

  return !status
}

const CheckboxToggle = ({status, loading = false, onClick}: Props) => (
  <Loader loading={loading}>
    <div className="CheckboxToggle">
      <button
        type="button"
        aria-label={getLabel(status)}
        onClick={e => {
          onClick(getNewValue(status), e)
        }}>
        <CheckboxIndicator status={status} />
      </button>
    </div>
  </Loader>
)

export default CheckboxToggle
