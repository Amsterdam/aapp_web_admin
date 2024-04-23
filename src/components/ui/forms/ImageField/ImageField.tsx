import {useState} from 'react'
import {Controller} from 'react-hook-form'
import {ImageCrop} from 'components/ui/forms/ImageField/ImageCrop'
import ImageDisplay from 'components/ui/forms/ImageField/ImageDisplay'
import ImageUpload from 'components/ui/forms/ImageField/ImageUpload'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

import './ImageField.css'

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
}: Props) => {
  const [step, setStep] = useState<'upload' | 'crop' | 'display'>(
    src ? 'display' : 'upload',
  )

  const [uncroppedImage, setUncroppedImage] = useState(src)

  // eslint-disable-next-line no-console
  console.log(step)

  return (
    <div className="ImageField">
      <Controller
        defaultValue={src}
        name={name}
        render={({field: {onChange, value}}) => (
          <Column gutter="sm">
            <Phrase color="muted">{label}</Phrase>
            {step === 'display' && (
              <ImageDisplay
                alt={alt}
                aspectRatio={aspectRatio}
                onDelete={() => {
                  onChange(undefined)
                  setStep('upload')
                }}
                src={value}
              />
            )}
            {step === 'crop' && !!uncroppedImage && (
              <ImageCrop
                aspectRatio={aspectRatio}
                onComplete={i => {
                  onChange(i)
                  setUncroppedImage(undefined)
                  setStep('display')
                }}
                url={uncroppedImage}
                width={600}
              />
            )}
            {step === 'upload' && (
              <ImageUpload
                aspectRatio={aspectRatio}
                loading={loading}
                onAdd={i => {
                  // eslint-disable-next-line no-console
                  console.log(i)
                  setUncroppedImage(i)
                  setStep('crop')
                }}
                onDelete={() => {
                  setUncroppedImage(undefined)
                  setStep('upload')
                }}
              />
            )}
          </Column>
        )}
      />
    </div>
  )
}

export default ImageField
