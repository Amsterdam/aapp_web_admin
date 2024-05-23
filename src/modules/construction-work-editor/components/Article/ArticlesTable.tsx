import {useCallback} from 'react'
import NavigationButton from 'components/ui/button/NavigationButton'
import Column from 'components/ui/layout/Column'
import Image, {ImageHeight} from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import useNavigate from 'hooks/useNavigate'
import ProjectWarningFallbackImage from 'modules/construction-work-editor/assets/project-warning-fallback.svg'
import {ArticleWarning} from 'modules/construction-work-editor/types/article'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import getDateFromString from 'utils/getDateFromString'
import type {ColumnConfig} from 'components/ui/table/types'

type ArticlesItem = Pick<
  ArticleWarning,
  | 'images'
  | 'meta_id'
  | 'modification_date'
  | 'title'
  | 'project'
  | 'publisher'
  | 'publication_date'
>

type TableImageProps = {
  images: ArticleWarning['images']
}

const TableImage = ({images}: TableImageProps) => {
  const image = images?.find(({main}) => main)
  if (image) {
    return <Image image={image} />
  }

  return (
    <img
      alt="App bericht afbeelding"
      height={ImageHeight.table}
      src={ProjectWarningFallbackImage}
    />
  )
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
    key: 'publisher',
    id: 'publisher',
    renderer: ({publisher}) => <Phrase>{publisher.name}</Phrase>,
    title: 'Geschreven door',
  },
  {
    key: 'modification_date',
    id: 'modification_date',
    renderer: ({modification_date: modificationDate}) =>
      getDateFromString(modificationDate),
    title: 'Bewerkt op',
  },
  {
    key: 'images',
    id: 'image',
    renderer: ({images}) => <TableImage images={images} />,
    title: '',
  },
]

type Props = {
  projectId: string
  warnings?: ArticleWarning[]
}

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

  return (
    <Column gutter="md">
      {!warnings?.length ? (
        <Phrase>Er zijn geen app berichten voor dit project.</Phrase>
      ) : (
        <Table
          config={columns}
          data={warnings}
          keyGetter={({meta_id: {id, type}}) => `${type}${id}`}
          onRowClick={onRowClick}
        />
      )}
      <NavigationButton
        label="Schrijf app bericht"
        url={ConstructionWorkEditorRoute.article}
        params={{projectId}}
      />
    </Column>
  )
}

export default ArticlesTable
