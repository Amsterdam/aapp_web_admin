import {
  Paragraph,
  Table as DesignSystemTable,
  Checkbox,
} from '@amsterdam/design-system-react'
import {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Box from 'components/ui/layout/Box'
import Row from 'components/ui/layout/Row'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services'
import {capitalizeString} from 'utils/capitalizeString'

type ManagerFormType = {
  name: string
  email: string
  projects: string[]
}

const CreateManagerForm = () => {
  const form = useForm<ManagerFormType>()
  const [pageIndex, setPageIndex] = useState(1)
  const {data, isLoading, isError} = useGetProjectsQuery({
    page_size: 10,
    page: pageIndex,
  })
  const projects = data?.result?.map(project => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
  }))

  return (
    <Box>
      <FormProvider {...form}>
        <TextField label="Naam" name="name" width="half" />
        <TextField label="E-mail" name="email" width="half" />
        {!!isLoading && <Loading />}
        {!!isError && <Error message="Kan projecten niet laden" />}
        {!!data && !isError && !isLoading && (
          <Box>
            <DesignSystemTable className="Table">
              <DesignSystemTable.Header>
                <DesignSystemTable.Row key={1}>
                  {['', 'Titel', ''].map(name => (
                    <DesignSystemTable.HeaderCell key={name}>
                      {capitalizeString(name)}
                    </DesignSystemTable.HeaderCell>
                  ))}
                </DesignSystemTable.Row>
              </DesignSystemTable.Header>
              <DesignSystemTable.Body>
                {projects?.map(({id, subtitle, title, image}) => (
                  <DesignSystemTable.Row key={title}>
                    <DesignSystemTable.Cell>
                      <Checkbox name={`${id}`} />
                    </DesignSystemTable.Cell>
                    <DesignSystemTable.Cell>
                      <Paragraph>
                        <strong>{title}</strong>
                      </Paragraph>
                      <Paragraph>{subtitle ?? ''}</Paragraph>
                    </DesignSystemTable.Cell>
                    <DesignSystemTable.Cell>
                      <img
                        src={image?.sources[1].uri}
                        alt={image?.alternativeText ?? ''}
                        height="100"
                      />
                    </DesignSystemTable.Cell>
                  </DesignSystemTable.Row>
                ))}
              </DesignSystemTable.Body>
            </DesignSystemTable>
            <Row>
              <Button
                variant="tertiary"
                disabled={pageIndex === 0}
                label="Vorige"
                onClick={() =>
                  setPageIndex(prev => {
                    if (prev === 0) {
                      return 0
                    }
                    return prev - 1
                  })
                }
              />
              <Button
                variant="tertiary"
                label="Volgende"
                onClick={() =>
                  setPageIndex(prev => {
                    return prev + 1
                  })
                }
              />
            </Row>
          </Box>
        )}
        {/* TODO: Save manager but waiting for BE endpoint */}
        {/* <Button label="Opslaan" onClick={() => console.log('click')} /> */}
      </FormProvider>
    </Box>
  )
}

export default CreateManagerForm
