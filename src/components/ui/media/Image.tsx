import type {ApiImage} from 'modules/construction-work-editor/types/image'

enum ImageVariant {
  table = 'table',
}

const ImageHeight = {
  [ImageVariant.table]: 100,
}

type Props = {
  image: ApiImage
  variant?: ImageVariant
}

const Image = ({
  image: {alternativeText, sources},
  variant = ImageVariant.table,
}: Props) => {
  const sourceUri = sources[1]?.uri ?? sources[0]?.uri
  if (!sourceUri) {
    return null
  }
  return (
    <img
      src={sourceUri}
      alt={alternativeText ?? ''}
      height={ImageHeight[variant]}
    />
  )
}

export default Image
