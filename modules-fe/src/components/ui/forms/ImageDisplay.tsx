import Icon from 'components/ui/media/Icon'
import Phrase from 'components/ui/text/Phrase'
import 'react-image-upload/dist/index.css'

import './ImageDisplay.css'

type Props = {
  alt?: string
  caption?: string
  aspectRatio: number
  src: string
  onDelete?: () => void
}

const ImageDisplay = ({
  alt = '',
  aspectRatio,
  caption,
  onDelete,
  src,
}: Props) => (
  <figure className="ImageDisplay">
    <img alt={alt} src={src} style={{aspectRatio}} />
    {!!caption && (
      <caption>
        <Phrase emphasis="italic">{caption}</Phrase>
      </caption>
    )}
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
