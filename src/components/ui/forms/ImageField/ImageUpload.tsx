import ImageUploader from 'react-image-upload'
import Icon from 'components/ui/media/Icon'
import 'react-image-upload/dist/index.css'

import './ImageUpload.css'

type Props = {
  aspectRatio: number
  onAdd: (image: string, file: File) => void
  onDelete?: () => void
}

const ImageUpload = ({aspectRatio, onAdd, onDelete}: Props) => (
  <div className="ImageUpload">
    <ImageUploader
      onFileAdded={({dataUrl, file}) => onAdd(dataUrl, file)}
      onFileRemoved={onDelete}
      style={{width: '100%', aspectRatio, background: 'transparent'}}
      deleteIcon={<div />}
      uploadIcon={
        <div className="ImageUploadAddIcon">
          <Icon name="plus" />
        </div>
      }
    />
  </div>
)

export default ImageUpload
