import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import {useGetArticlesQuery} from 'modules/construction-work-editor/services'
import {ConstructionWorkEditorRoute} from '../routes'
import type {Column as ColumnType} from 'components/ui/table/types'
import type {
  ArticlePublisher,
  ArticleType,
} from 'modules/construction-work-editor/types/article'
import type {ApiImage} from 'modules/construction-work-editor/types/image'

type ArticleForTable = {
  id: number
  image?: ApiImage
  publisher: ArticlePublisher
  title: string
  type: ArticleType
}

type Props = {
  projectId?: string
}

const columns: ColumnType<ArticleForTable>[] = [
  {
    title: 'Titel',
    content: [{key: 'title'}],
  },
  {
    title: 'Type bericht',
    content: [
      {
        key: 'type',
        renderer: ({type}) => (type === 'article' ? 'Nieuws' : 'App'),
      },
    ],
  },
  {
    title: '',
    content: [
      {
        key: 'image',
        renderer: ({image}) => image && <Image image={image} />,
      },
    ],
  },
]

const ArticlesTable = ({projectId}: Props) => {
  const navigate = useNavigate()

  const {data, isError, isLoading} = useGetArticlesQuery(
    projectId !== undefined
      ? {
          project_ids: projectId?.toString(),
        }
      : skipToken,
  )

  const onRowClick = useCallback(
    (article: ArticleForTable) => {
      if (!article.id) {
        return
      }
      navigate(`${ConstructionWorkEditorRoute.article}/${article.id}`)
    },
    [navigate],
  )

  const tableArticles: ArticleForTable[] | undefined = data?.map(
    ({images, meta_id: metaId, publisher, title: articleTitle}) => ({
      id: metaId.id,
      image: images?.[0],
      publisher, // TODO add to table once API is ready
      title: articleTitle,
      type: metaId.type,
    }),
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <ErrorComponent message="Artikelen konden niet worden opgehaald. Probeer het later opnieuw" />
    )
  }

  if (!tableArticles?.length) {
    return <Phrase>Er zijn geen artikelen voor dit project</Phrase>
  }

  return (
    <Column>
      <Table
        columns={columns}
        data={tableArticles}
        keyGetter={({id}) => id}
        onRowClick={onRowClick}
      />
      <Button
        label="Maak app bericht"
        onClick={() => navigate(ConstructionWorkEditorRoute.article)}
      />
    </Column>
  )
}

export default ArticlesTable
