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
  return (
    <img
      src={sources[1].uri}
      alt={alternativeText ?? ''}
      height={ImageHeight[variant]}
    />
  )
}

export default Image
