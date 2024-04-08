import {Controller} from 'react-hook-form'
import ImageDisplay from 'components/ui/forms/ImageField/ImageDisplay'
import ImageUpload from 'components/ui/forms/ImageField/ImageUpload'

type Props = {
  aspectRatio?: number
  alt?: string
  loading?: boolean
  name: string
  src?: string
}

const DEFAULT_ASPECT_RATIO = 940 / 415

const ImageField = ({
  alt,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  loading = false,
  name,
  src,
}: Props) => {
  return (
    <Controller
      defaultValue={src}
      name={name}
      render={({field: {onChange, value}}) => {
        return value ? (
          <ImageDisplay
            alt={alt}
            aspectRatio={aspectRatio}
            onDelete={() => {
              onChange(undefined)
            }}
            src={value}
          />
        ) : (
          <ImageUpload
            aspectRatio={aspectRatio}
            loading={loading}
            onAdd={onChange}
            onDelete={() => {
              onChange(undefined)
            }}
          />
        )
      }}
    />
  )
}

export default ImageField
