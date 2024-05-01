import {useCallback} from 'react'
import NavigationButton from 'components/ui/button/NavigationButton'
import Column from 'components/ui/layout/Column'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import useNavigate from 'hooks/useNavigate'
import {ArticleWarning} from 'modules/construction-work-editor/types/article'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import type {ColumnConfig} from 'components/ui/table/types'

type Props = {
  projectId: string
  warnings?: ArticleWarning[]
}
type ArticlesItem = Pick<
  ArticleWarning,
  'image' | 'meta_id' | 'title' | 'project' | 'publisher' | 'publication_date'
>

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
    key: 'publisher',
    id: 'publisher',
    renderer: ({publisher}) => <Phrase>{publisher.name}</Phrase>,
    title: 'Geschreven door',
  },
  {
    key: 'image',
    id: 'image',
    renderer: ({image}) => image && <Image image={image} />,
    title: '',
  },
]

const ArticlesTable = ({projectId, warnings}: Props) => {
  const navigate = useNavigate()
  const onRowClick = useCallback(
    ({meta_id: {id}}: ArticlesItem) => {
      navigate(ConstructionWorkEditorRoute.article, {
        projectId,
        id,
      })
    },
    [navigate, projectId],
  )

  if (!warnings?.length) {
    return <Phrase>Er zijn geen app berichten voor dit project.</Phrase>
  }

  return (
    <Column>
      <Table
        config={columns}
        data={warnings}
        keyGetter={({meta_id: {id, type}}) => `${type}${id}`}
        onRowClick={onRowClick}
      />
      <NavigationButton
        label="Maak app bericht"
        url={ConstructionWorkEditorRoute.article}
        params={{projectId}}
      />
    </Column>
  )
}

export default ArticlesTable
