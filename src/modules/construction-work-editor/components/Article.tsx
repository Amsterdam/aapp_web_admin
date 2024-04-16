import Column from 'components/ui/layout/Column'
import Title from 'components/ui/text/Title'

type Props = {
  id?: string
}

const Article = ({id}: Props) => (
  <Column>
    <Title>Bericht {id}</Title>
  </Column>
)

export default Article
