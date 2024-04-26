import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import Article from 'modules/construction-work-editor/components/Article/Article'

export type ArticleScreenParams = {
  id?: string
  projectId?: string
}

const ArticleScreen = () => {
  const {id, projectId} = useParams<ArticleScreenParams>()

  return (
    <Screen>
      <Article id={id} projectId={projectId} />
    </Screen>
  )
}

export default ArticleScreen
