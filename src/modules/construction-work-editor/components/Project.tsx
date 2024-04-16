import {skipToken} from '@reduxjs/toolkit/query'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import BlockLink from 'components/ui/button/BlockLink'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import ArticlesTable from 'modules/construction-work-editor/components/ArticlesTable'
import {useGetProjectQuery} from 'modules/construction-work-editor/services'
import getDateFromString from 'utils/getDateFromString'

type Props = {
  id?: string
}

const ARTICLE_MAX_AGE_IN_DAYS = 10000

const Project = ({id}: Props) => {
  const {
    data: project,
    isError,
    isLoading,
  } = useGetProjectQuery(
    id
      ? {
          article_max_age: ARTICLE_MAX_AGE_IN_DAYS,
          id,
        }
      : skipToken,
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !project) {
    return <ErrorComponent message="Project kan niet worden getoond" />
  }

  const {creation_date: creationDate, subtitle, title, url} = project

  return (
    <Column gutter="xl">
      <Column>
        <Title level={2}>{title}</Title>
        <Title level={3}>{subtitle}</Title>
        <Phrase color="muted">
          Aangemaakt: {getDateFromString(creationDate)}
        </Phrase>
        <BlockLink to={url}>
          <Phrase>Bekijk op amsterdam.nl</Phrase>
        </BlockLink>
      </Column>
      <ArticlesTable projectId={id} />
    </Column>
  )
}

export default Project
