import {useParams} from 'react-router-dom'
import Loading from 'components/ui/Loading'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import Article from 'modules/construction-work-editor/components/Article/Article'
import {useGetProjectQuery} from '../services/projects'

export type ArticleScreenParams = {
  id?: string
  projectId: string
}

const ArticleScreen = () => {
  const {id, projectId} = useParams() as ArticleScreenParams
  const {data: project, isLoading} = useGetProjectQuery(projectId)

  return (
    <Screen>
      <Column gutter="md">
        {isLoading ? (
          <Loading />
        ) : (
          project && (
            <ScreenTitle
              subtitle={project.title}
              title={`${id ? 'Bericht wijzigen' : 'Nieuw bericht'}`}
            />
          )
        )}
        <Article id={Number(id)} projectId={projectId} />
      </Column>
    </Screen>
  )
}

export default ArticleScreen
