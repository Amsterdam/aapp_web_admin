/* eslint-disable no-console */
import {useMemo, useState} from 'react'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import {ProjectBase} from 'modules/construction-work-editor/types/project'
import {addSearchString, filterBySearchStringMatch} from 'utils/searchString'

type MockProject = ProjectBase & {test: unknown}

const MOCK_PROJECTS: MockProject[] = [
  {
    test: true,
    id: 1,
    title: 'Title 1',
    subtitle: 'Default render test column has a boolean',
    image: {
      alternativeText: 'foo',
      aspectRatio: 940 / 415,
      id: 'foo',
      sources: [
        {
          uri: 'https://www.amsterdam.nl/publish/pages/978692/940x415_oranje_loper.jpg',
          height: 415,
          width: 940,
        },
      ],
    },
  },
  {
    test: ['hello', 'world'],
    id: 2,
    title: 'Title 2',
    subtitle: 'Default render test column has an array',
    image: {
      alternativeText: 'foo',
      aspectRatio: 940 / 415,
      id: 'foo',
      sources: [
        {
          uri: 'https://www.amsterdam.nl/publish/pages/978692/940x415_oranje_loper.jpg',
          height: 415,
          width: 940,
        },
      ],
    },
  },
  {
    test: 42,
    id: 3,
    title: 'Title 3',
    subtitle: 'Default render test column has a number',
    image: {
      alternativeText: 'foo',
      aspectRatio: 940 / 415,
      id: 'foo',
      sources: [
        {
          uri: 'https://www.amsterdam.nl/publish/pages/978692/940x415_oranje_loper.jpg',
          height: 415,
          width: 940,
        },
      ],
    },
  },
  {
    test: 'Hello world',
    id: 4,
    title: 'Title 4',
    subtitle: 'Default render test column has a string',
    image: {
      alternativeText: 'foo',
      aspectRatio: 940 / 415,
      id: 'foo',
      sources: [
        {
          uri: 'https://www.amsterdam.nl/publish/pages/978692/940x415_oranje_loper.jpg',
          height: 415,
          width: 940,
        },
      ],
    },
  },
]

const projects = addSearchString(MOCK_PROJECTS, ['title', 'subtitle'])

/**
 * To do: remove when we can develop against a working back end
 */
export const TableFeatures = () => {
  const [query, setQuery] = useState<string>()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const filteredProjects = useMemo(
    () => filterBySearchStringMatch(projects, query),
    [query],
  )

  return (
    <Table
      config={[
        {
          id: 'i',
          key: 'image',
          renderer: ({image}) =>
            image && <Image image={image} key={image.id} />,
        },
        {
          title: 'ID',
          id: 'id',
          key: 'id',
        },
        {
          title: 'Titel (stiekem ook met subtitel)',
          id: 'title2',
          key: 'title',
          renderer: ({title, subtitle}) => (
            <>
              <Title level={3}>{title}</Title>
              <Phrase>{subtitle}</Phrase>
            </>
          ),
        },
        {
          title: 'Default render test',
          id: 'test',
          key: 'test',
        },
      ]}
      data={filteredProjects}
      filterCallback={setQuery}
      filterQuery={query}
      getIsRowSelected={({id}) => selectedIds.includes(id)}
      keyGetter={({id}) => id.toString()}
      onRowClick={(...args) => {
        console.log('onRowClick', ...args)
      }}
      onRowToggle={({id}) => {
        if (selectedIds.includes(id)) {
          setSelectedIds(ids => ids.filter(item => item !== id))
          return
        }
        setSelectedIds(ids => [...ids, id])
      }}
    />
  )
}
