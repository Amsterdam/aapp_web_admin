import ImageUploader, {FileObjectType} from 'react-image-upload'
import Icon from 'components/ui/media/Icon'
import 'react-image-upload/dist/index.css'

import './ImageUpload.css'

type Props = {
  aspectRatio: number
  onAdd: ({file, dataUrl}: FileObjectType) => void
  onDelete?: () => void
}

const ImageUpload = ({aspectRatio, onAdd, onDelete}: Props) => (
  <div className="ImageUpload">
    <ImageUploader
      onFileAdded={onAdd}
      onFileRemoved={onDelete}
      style={{width: '100%', aspectRatio, background: 'transparent'}}
      deleteIcon={
        <div className="DeleteIcon">
          <Icon name="cross" />
        </div>
      }
      uploadIcon={
        <div className="AddIcon">
          <Icon name="plus" />
        </div>
      }
    />
  </div>
)

export default ImageUpload
