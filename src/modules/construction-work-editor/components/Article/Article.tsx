import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Column from 'components/ui/layout/Column'
import Title from 'components/ui/text/Title'
import ArticleForm from 'modules/construction-work-editor/components/Article/ArticleForm'
import RemoveProjectWarning from 'modules/construction-work-editor/components/Article/RemoveProjectWarning'
import {ArticleScreenParams} from 'modules/construction-work-editor/screens/Article.screen'
import {useGetProjectWarningQuery} from 'modules/construction-work-editor/services/articles'

const Article = ({id, projectId}: ArticleScreenParams) => {
  const isNewArticle = !id
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false) // prevents fetching the article again after submitting
  const {data: article, isLoading: isLoadingProjectWarning} =
    useGetProjectWarningQuery(id && !isBeforeNavigation ? {id} : skipToken)

  if (!isNewArticle && isLoadingProjectWarning) {
    return <Loading />
  }

  if (!isNewArticle && !article) {
    return (
      <ErrorComponent message="Het is niet gelukt om het bericht op te halen" />
    )
  }

  return (
    <Column gutter="lg">
      <Title>{`${isNewArticle ? 'Nieuw bericht' : `Bericht: ${id}`}`}</Title>
      <ArticleForm article={article} id={id} projectId={projectId} />
      {!isNewArticle && !!id && !!projectId && (
        <RemoveProjectWarning
          id={id}
          projectId={projectId}
          setIsBeforeNavigation={setIsBeforeNavigation}
        />
      )}
    </Column>
  )
}

export default Article
