import {useState} from 'react'
import {Controller} from 'react-hook-form'
import {Step, Stepper} from 'components/ui/containers/Stepper'
import {ImageCrop} from 'components/ui/forms/ImageField/ImageCrop'
import ImageDisplay from 'components/ui/forms/ImageField/ImageDisplay'
import ImageUpload from 'components/ui/forms/ImageField/ImageUpload'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import TextField from '../TextField'

type Props = {
  aspectRatio?: number
  description?: string | null
  label: string
  name: string
  outputWidth?: number
  src?: string
}

type ImageFieldStep = 'upload' | 'crop' | 'display'

const DEFAULT_ASPECT_RATIO = 960 / 540
const DEFAULT_OUTPUT_WIDTH = 960
const MAX_LENGTH_DESCRIPTION = 54

/**
 * Image upload and crop form element
 */
const ImageField = ({
  description,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  label,
  name,
  outputWidth = DEFAULT_OUTPUT_WIDTH,
  src,
}: Props) => {
  const [step, setStep] = useState<ImageFieldStep>(src ? 'display' : 'upload')

  const [uncroppedImage, setUncroppedImage] = useState<string | undefined>(src)

  return (
    <div className="ImageField" style={{width: `${outputWidth}px`}}>
      <Controller
        defaultValue={src}
        name={name}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Column gutter="sm">
            <Phrase color="muted">{label}</Phrase>
            <Stepper currentId={step}>
              <Step id="upload">
                <ImageUpload
                  aspectRatio={aspectRatio}
                  onAdd={image => {
                    setUncroppedImage(image)
                    setStep('crop')
                  }}
                />
              </Step>
              <Step id="crop">
                <ImageCrop
                  aspectRatio={aspectRatio}
                  onCancel={() => {
                    setUncroppedImage(undefined)
                    setStep('upload')
                  }}
                  onComplete={image => {
                    onChange(image)
                    setUncroppedImage(undefined)
                    setStep('display')
                  }}
                  outputWidth={outputWidth}
                  src={uncroppedImage}
                />
              </Step>
              <Step id="display">
                <ImageDisplay
                  aspectRatio={aspectRatio}
                  onDelete={() => {
                    onChange(undefined)
                    setStep('upload')
                  }}
                  src={value}
                />
              </Step>
            </Stepper>
            {!!error && <Phrase color="error">{error.message}</Phrase>}
            {step === 'display' && (
              <TextField
                defaultValue={description ?? ''}
                label="Beschrijving afbeelding"
                maxLength={MAX_LENGTH_DESCRIPTION}
                name="imageDescription"
                rules={{
                  required: 'Geef de afbeelding een beschrijving.',
                }}
              />
            )}
          </Column>
        )}
        rules={{
          validate: () =>
            // We accept no image or a cropped image, but not an uncropped image
            uncroppedImage ? 'De afbeelding moet bijgesneden zijn.' : true,
        }}
      />
    </div>
  )
}

export default ImageField
