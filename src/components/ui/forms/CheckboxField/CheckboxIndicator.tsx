import './CheckboxIndicator.css'

export type CheckboxIndicatorStatus = boolean | 'indeterminate'

type Props = {
  status: CheckboxIndicatorStatus
}

const CheckboxIndicator = ({status}: Props) => (
  <svg
    className="CheckboxIndicator"
    data-checked={status}
    height="24"
    viewBox="0 0 24 24"
    width="24">
    <rect width="24" height="24" />
    {status === 'indeterminate' ? (
      <line x1="5" y1="12" x2="19" y2="12" />
    ) : (
      <path d="M10.1079 17.5082L4 11.0841L5.45546 9.69887L10.128 14.6173L18.5646 6L20 7.40025L10.1079 17.5082Z" />
    )}
  </svg>
)

export default CheckboxIndicator
