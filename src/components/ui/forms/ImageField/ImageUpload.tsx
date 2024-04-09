import ImageUploader from 'react-image-upload'
import Loader from 'components/ui/containers/Loader'
import Column from 'components/ui/layout/Column'
import Icon from 'components/ui/media/Icon'
import 'react-image-upload/dist/index.css'

import './ImageUpload.css'

type Props = {
  aspectRatio: number
  loading?: boolean
  onAdd: (image: string) => void
  onDelete?: () => void
}

const ImageUpload = ({
  aspectRatio,
  loading = false,
  onAdd,
  onDelete,
}: Props) => (
  <Loader loading={loading}>
    <div className="ImageUpload">
      <Column gutter="md">
        <ImageUploader
          onFileAdded={({dataUrl}) => onAdd(dataUrl)}
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
      </Column>
    </div>
  </Loader>
)

export default ImageUpload
