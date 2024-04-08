import Icon from 'components/ui/media/Icon'
import 'react-image-upload/dist/index.css'

import './ImageDisplay.css'

type Props = {
  alt?: string
  aspectRatio: number
  src: string
  onDelete?: () => void
}

const ImageDisplay = ({alt = '', aspectRatio, onDelete, src}: Props) => (
  <figure className="ImageDisplay">
    <img alt={alt} src={src} style={{aspectRatio}} />
    {!!onDelete && (
      <button
        className="DeleteButton"
        onClick={onDelete}
        type="button"
        aria-label="verwijder">
        <Icon name="cross" />
      </button>
    )}
  </figure>
)

export default ImageDisplay
