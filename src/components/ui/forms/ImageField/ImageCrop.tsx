import {useCallback, useState} from 'react'
import Cropper, {type Area} from 'react-easy-crop'
import Button from 'components/ui/button/Button'
import Loader from 'components/ui/containers/Loader'
import {getCroppedImg} from 'components/ui/forms/ImageField/utils'

import './ImageCrop.css'
import Column from 'components/ui/layout/Column'

type Props = {
  aspectRatio: number
  onComplete: (image: string) => void
  url: string
  width: number
}

export const ImageCrop = ({aspectRatio, onComplete, url, width}: Props) => {
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()

  const onClick = useCallback(() => {
    if (!croppedAreaPixels) return
    // eslint-disable-next-line no-console
    console.log(croppedAreaPixels)
    setLoading(true)
    getCroppedImg(url, croppedAreaPixels)
      .then(onComplete)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => {
        setLoading(true)
      })
  }, [croppedAreaPixels, onComplete, url])

  // eslint-disable-next-line no-console
  console.log(url)

  return (
    <Column gutter="sm">
      <Loader loading={loading}>
        <div className="ImageCrop">
          <Cropper
            cropSize={{width, height: width / aspectRatio}}
            image={url}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={(_area, areaPixels) => {
              setCroppedAreaPixels(areaPixels)
            }}
            onZoomChange={setZoom}
          />
        </div>
      </Loader>
      <Button onClick={() => onClick()} disabled={!croppedAreaPixels}>
        Show Result
      </Button>
    </Column>
  )
}
