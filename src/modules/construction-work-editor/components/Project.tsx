import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import ErrorComponent from '@/components/ui/Error'
import Loading from '@/components/ui/Loading'
import BlockLink from '@/components/ui/button/BlockLink'
import Column from '@/components/ui/layout/Column'
import Phrase from '@/components/ui/text/Phrase'
import Title from '@/components/ui/text/Title'
import ArticlesTable from '@/modules/construction-work-editor/components/Article/ArticlesTable'
import {useGetProjectQuery} from '@/modules/construction-work-editor/services/projects'
import dateToNumber from '@/utils/dateToNumber'
import getDateFromString from '@/utils/getDateFromString'

type Props = {
  id: string
}

const Project = ({id}: Props) => {
  const {
    data: project,
    isError,
    isLoading,
  } = useGetProjectQuery(id || skipToken)

  // TODO: Remove once generic sorting mechanism is implemented
  const warningsSortedByModificationDate = useMemo(
    () =>
      project
        ? [...project.warnings].sort(
            (a, b) =>
              dateToNumber(b.modification_date) -
              dateToNumber(a.modification_date),
          )
        : [],
    [project],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !project) {
    return <ErrorComponent message="Project kan niet worden getoond" />
  }

  const {
    creation_date: creationDate,
    subtitle,
    title,
    publishers,
    url,
  } = project

  return (
    <Column gutter="xl">
      <Column>
        <Title level={2}>{title}</Title>
        <Title level={3}>{subtitle}</Title>
        {!!publishers.length && (
          <Phrase>
            Publishers: {publishers.map(({name}) => name).join(', ')}
          </Phrase>
        )}
        <Phrase color="muted">
          Aangemaakt: {getDateFromString(creationDate)}
        </Phrase>
        <BlockLink to={url}>
          <Phrase>Bekijk op amsterdam.nl</Phrase>
        </BlockLink>
      </Column>
      <ArticlesTable
        projectId={id}
        warnings={warningsSortedByModificationDate}
      />
    </Column>
  )
}

export default Project
