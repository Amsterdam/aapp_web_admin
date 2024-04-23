import Column from 'components/ui/layout/Column'
import Title from 'components/ui/text/Title'

type Props = {
  id?: string
}

const Article = ({id}: Props) => {
  const isNewArticle = !id

  return (
    <Column>
      <Title>{`${isNewArticle ? 'Nieuw bericht' : `Bericht: ${id}`}`}</Title>
    </Column>
  )
}

export default Article
