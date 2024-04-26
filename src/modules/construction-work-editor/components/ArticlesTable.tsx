import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import NavigationButton from 'components/ui/button/NavigationButton'
import Column from 'components/ui/layout/Column'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import {useGetArticlesQuery} from 'modules/construction-work-editor/services'
import {
  ArticleType,
  type ArticlesItem,
} from 'modules/construction-work-editor/types/article'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import type {ColumnConfig} from 'components/ui/table/types'

type Props = {
  projectId?: string
}

const columns: ColumnConfig<ArticlesItem>[] = [
  {
    key: 'title',
    id: 'title',
    title: 'Titel',
  },
  {
    key: 'meta_id',
    id: 'type',
    renderer: ({meta_id: {type}}) => (type === 'article' ? 'Nieuws' : 'App'),
    title: 'Type bericht',
  },
  {
    key: 'images',
    id: 'image',
    renderer: ({images}) => images?.[0] && <Image image={images[0]} />,
    title: '',
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
    ({meta_id: {id, type}}: ArticlesItem) => {
      if (type !== ArticleType.warning) {
        return
      }
      navigate(`${ConstructionWorkEditorRoute.article}/${id}`)
    },
    [navigate],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <ErrorComponent message="Berichten konden niet worden opgehaald. Probeer het later opnieuw" />
    )
  }

  if (!data?.length) {
    return <Phrase>Er zijn geen berichten voor dit project</Phrase>
  }

  return (
    <Column>
      <Table
        config={columns}
        data={data}
        keyGetter={({meta_id: {id, type}}) => `${type}${id}`}
        onRowClick={onRowClick}
      />
      <NavigationButton
        label="Maak app bericht"
        route={ConstructionWorkEditorRoute.article}
      />
    </Column>
  )
}

export default ArticlesTable
