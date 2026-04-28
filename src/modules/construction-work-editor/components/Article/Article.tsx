import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Column from 'components/ui/layout/Column'
import ArticleForm from 'modules/construction-work-editor/components/Article/ArticleForm'
import RemoveProjectWarning from 'modules/construction-work-editor/components/Article/RemoveProjectWarning'
import {useGetProjectWarningQuery} from 'modules/construction-work-editor/services/articles'

type Props = {
  id?: number
  projectId: string
}

const Article = ({id, projectId}: Props) => {
  const isNewArticle = !id
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {data: article, isLoading: isLoadingProjectWarning} =
    useGetProjectWarningQuery(id && !isBeforeNavigation ? id : skipToken)

  if (!isNewArticle && isLoadingProjectWarning) {
    return <Loading />
  }

  if (!isNewArticle && !article) {
    return (
      <ErrorComponent message="Het is niet gelukt om het bericht op te halen" />
    )
  }

  return (
    <Column gutter="md">
      <ArticleForm
        article={article}
        id={id}
        projectId={projectId}
      />
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
