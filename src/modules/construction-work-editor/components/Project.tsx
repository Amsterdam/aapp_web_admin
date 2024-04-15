/* eslint-disable camelcase */
import {skipToken} from '@reduxjs/toolkit/query'
import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import BlockLink from 'components/ui/button/BlockLink'
import Column from 'components/ui/layout/Column'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import {useGetProjectQuery} from 'modules/construction-work-editor/services'
import {
  ArticleBase,
  ArticleMetaId,
} from 'modules/construction-work-editor/types/article'
import getDateFromString from 'utils/getDateFromString'
import type {Column as ColumnType} from 'components/ui/table/types'

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
    return <Error message="Project kan niet worden getoond" />
  }

  const {
    creation_date: creationDate,
    recent_articles: recentArticles,
    subtitle,
    title,
    url,
  } = project

  const articles = recentArticles.map(
    ({id: articleId, meta_id, publisher, title: articleTitle}) => ({
      id: articleId,
      meta_id,
      publisher,
      title: articleTitle,
    }),
  )

  const columns: ColumnType<Partial<ArticleBase>, ArticleMetaId>[] = [
    {
      title: 'Titel',
      content: [{key: 'title'}],
    },
    {
      title: 'Redacteur',
      content: [{key: 'publisher'}],
    },
    {
      title: 'Type bericht',
      content: [
        {
          key: 'meta_id',
          renderer: meta_id => (
            <Phrase>{meta_id?.type === 'article' ? 'Nieuws' : 'App'}</Phrase>
          ),
        },
      ],
    },
  ]

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
      <Table columns={columns} data={articles} />
    </Column>
  )
}

export default Project
