import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Box from 'components/ui/layout/Box'
import {Table} from 'components/ui/table/Table'
import {useProjectsQuery} from 'modules/construction-work-editor/services/projects'
import {ManagerFormType} from 'modules/construction-work-editor/types/manager'
import {ProjectBase} from '../types/projects'

const CreateManagerForm = () => {
  const form = useForm<ManagerFormType>()
  const {handleSubmit} = form
  const {data, isError, isLoading} = useProjectsQuery({page_size: 10})
  const projects: ProjectBase[] | undefined = data?.result?.map(project => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
  }))

  const columns: {keys: Array<keyof ProjectBase>; title: string}[] = [
    {keys: ['title', 'subtitle'], title: 'Titel'},
    {keys: ['image'], title: ''},
  ]

  const onSubmit = useCallback((formData: ManagerFormType) => {
    console.log(formData)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !projects?.length) {
    return <Error message="Projecten kunnen niet worden getoond" />
  }

  return (
    <Box>
      <FormProvider {...form}>
        <TextField label="Naam" name="name" width="half" />
        <TextField label="E-mail" name="email" width="half" />
        {!!data && !isError && !isLoading && (
          <Table columns={columns} data={projects} isSelectable />
        )}
        {/* TODO: Save manager but waiting for BE endpoint */}
        <Button label="Opslaan" onClick={handleSubmit(onSubmit)} />
      </FormProvider>
    </Box>
  )
}

export default CreateManagerForm
