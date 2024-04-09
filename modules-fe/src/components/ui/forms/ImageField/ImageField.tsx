import {Controller} from 'react-hook-form'
import ImageDisplay from 'components/ui/forms/ImageField/ImageDisplay'
import ImageUpload from 'components/ui/forms/ImageField/ImageUpload'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  aspectRatio?: number
  alt?: string
  label: string
  loading?: boolean
  name: string
  src?: string
}

const DEFAULT_ASPECT_RATIO = 940 / 415

const ImageField = ({
  alt,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  label,
  loading = false,
  name,
  src,
}: Props) => (
  <Controller
    defaultValue={src}
    name={name}
    render={({field: {onChange, value}}) => (
      <Column gutter="sm">
        <Phrase color="muted">{label}</Phrase>
        {value ? (
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
        )}
      </Column>
    )}
  />
)

export default ImageField
