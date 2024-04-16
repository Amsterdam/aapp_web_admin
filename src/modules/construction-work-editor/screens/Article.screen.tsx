import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import Article from 'modules/construction-work-editor/components/Article'

type Params = {
  id: string
}

const ArticleScreen = () => {
  const {id} = useParams<Params>()

  return (
    <Screen>
      <Article id={id} />
    </Screen>
  )
}

export default ArticleScreen
