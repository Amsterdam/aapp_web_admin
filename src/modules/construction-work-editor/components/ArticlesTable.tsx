import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import {Column} from 'components/ui/table/types'
import Phrase from 'components/ui/text/Phrase'
import {useGetArticlesQuery} from '../services'
import type {
  ArticleBase,
  ArticlePublisher,
  ArticleType,
} from 'modules/construction-work-editor/types/article'
import type {ApiImage} from 'modules/construction-work-editor/types/image'

type ArticlesForTable = {
  id: number
  image?: ApiImage
  publisher: ArticlePublisher
  title: string
  type: ArticleType
}

type Props = {
  projectId?: string
}

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
    (article: Partial<ArticleBase>) => {
      if (!article.id) {
        return
      }
      navigate(`/artikel/${article.id}`)
    },
    [navigate],
  )

  const tableArticles: ArticlesForTable[] | undefined = data?.map(
    ({images, meta_id: metaId, publisher, title: articleTitle}) => ({
      id: metaId.id,
      image: images?.[0],
      publisher, // TODO add to table once API is ready
      title: articleTitle,
      type: metaId.type,
    }),
  )

  const columns: Column<ArticlesForTable>[] = [
    {
      title: 'Titel',
      content: [{key: 'title'}],
    },
    {
      title: 'Type bericht',
      content: [
        {
          key: 'type',
          renderer: type => (type === 'article' ? 'Nieuws' : 'App'),
        },
      ],
    },
    {
      title: '',
      content: [
        {
          key: 'image',
          renderer: image => image && <Image image={image} />,
        },
      ],
    },
  ]

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
    <Table columns={columns} data={tableArticles} onRowClick={onRowClick} />
  )
}

export default ArticlesTable
