import {FileObjectType} from 'react-image-upload'
import ImageDisplay from 'components/ui/forms//ImageDisplay'
import ImageUpload from 'components/ui/forms/ImageUpload'

type Props = {
  aspectRatio?: number
  alt?: string
  caption?: string
  src?: string
  onAdd: ({file, dataUrl}: FileObjectType) => void
  onDelete?: () => void
}

const DEFAULT_ASPECT_RATIO = 940 / 415

const ImageField = ({
  alt,
  src,
  caption,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  onAdd,
  onDelete,
}: Props) => {
  if (src) {
    return (
      <ImageDisplay
        alt={alt}
        aspectRatio={aspectRatio}
        caption={caption}
        onDelete={onDelete}
        src={src}
      />
    )
  }

  return (
    <ImageUpload aspectRatio={aspectRatio} onAdd={onAdd} onDelete={onDelete} />
  )
}

export default ImageField
