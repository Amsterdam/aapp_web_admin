import {useCallback, useState} from 'react'
import Cropper, {type Area} from 'react-easy-crop'
import ErrorComponent from 'components/ui/Error'
import Button from 'components/ui/button/Button'
import {getCroppedImage} from 'components/ui/forms/ImageField/utils'
import {Slider} from 'components/ui/forms/Slider'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'

import './ImageCrop.css'

type Props = {
  aspectRatio: number
  onCancel?: () => void
  onComplete: (image: string) => void
  outputWidth: number
  src?: string
}

const ZOOM_SLIDER_MIN = 1
const ZOOM_SLIDER_MAX = 3
const ZOOM_SLIDER_STEP = 0.1

export const ImageCrop = ({
  aspectRatio,
  onCancel,
  onComplete,
  outputWidth,
  src,
}: Props) => {
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [error, setError] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const onClick = useCallback(() => {
    if (!croppedAreaPixels || !src) {
      return
    }

    getCroppedImage(src, croppedAreaPixels, outputWidth, aspectRatio)
      .then(onComplete)
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
        setError(true)
      })
  }, [aspectRatio, croppedAreaPixels, onComplete, outputWidth, src])

  if (error || !src) {
    return (
      <ErrorComponent message="Sorry, er is iets misgegaan bij het uploaden." />
    )
  }

  return (
    <div className="ImageCrop">
      <Column gutter="sm">
        <div className="ImageCropImage" style={{aspectRatio}}>
          <Cropper
            cropSize={{width: outputWidth, height: outputWidth / aspectRatio}}
            image={src}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={(_area, areaPixels) => {
              setCroppedAreaPixels(areaPixels)
            }}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <Row valign="center" gutter="md">
          <Slider
            min={ZOOM_SLIDER_MIN}
            max={ZOOM_SLIDER_MAX}
            onChange={value => {
              if (typeof value === 'number') {
                setZoom(value)
              }
            }}
            step={ZOOM_SLIDER_STEP}
            value={zoom}
          />
          <Button
            onClick={() => onClick()}
            disabled={!croppedAreaPixels}
            label="Bevestig"
          />
          {!!onCancel && (
            <Button
              onClick={() => onCancel()}
              label="Annuleer"
              variant="secondary"
            />
          )}
        </Row>
      </Column>
    </div>
  )
}
