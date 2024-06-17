import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import ErrorComponent from 'components/ui/Error'
import Button from 'components/ui/button/Button'
import Loader from 'components/ui/containers/Loader'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import useNavigate from 'hooks/useNavigate'
import {
  useAddPublisherMutation,
  useEditPublisherMutation,
} from 'modules/construction-work-editor/services/publishers'
import {
  AddPublisherQueryArgs,
  EditPublisherQueryArgs,
  Publisher,
} from 'modules/construction-work-editor/types/publisher'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

type Props = Partial<Publisher>

const PublisherForm = ({email: propsEmail, id, name: propsName}: Props) => {
  const navigate = useNavigate()
  const form = useForm<AddPublisherQueryArgs>({
    defaultValues: {name: propsName ?? '', email: propsEmail ?? ''},
  })
  const {
    formState: {isDirty},
    handleSubmit,
  } = form

  const [
    createPublisher,
    {isLoading: isCreateLoading, isError: isCreateError},
  ] = useAddPublisherMutation()
  const [editPublisher, {isLoading: isEditLoading, isError: isEditError}] =
    useEditPublisherMutation()
  const isError = isCreateError || isEditError
  const isLoading = isCreateLoading || isEditLoading
  const navigateToPublisherProjects = useCallback(
    (publisherId: number) =>
      navigate(ConstructionWorkEditorRoute.publisherProjects, {
        id: publisherId,
      }),
    [navigate],
  )

  const handleEditPublisher = useCallback(
    ({email, id: idParam, name}: EditPublisherQueryArgs) => {
      if (isDirty) {
        editPublisher({email, id: idParam, name})
          .unwrap()
          .then(() => navigateToPublisherProjects(idParam))
      } else {
        navigateToPublisherProjects(idParam)
      }
    },
    [editPublisher, isDirty, navigateToPublisherProjects],
  )

  const onSubmit = useCallback(
    ({email, name}: AddPublisherQueryArgs) => {
      if (id) {
        handleEditPublisher({email, id, name})
      } else {
        createPublisher({email, name})
          .unwrap()
          .then(data => navigateToPublisherProjects(data.id))
      }
    },
    [createPublisher, handleEditPublisher, id, navigateToPublisherProjects],
  )

  if (isError) {
    return <ErrorComponent message="Er is iets misgegaan bij het opslaan." />
  }

  return (
    <Loader loading={isLoading}>
      <FormProvider {...form}>
        <Column gutter="md">
          <TextField
            label="Naam"
            name="name"
            rules={{
              required: 'Naam is verplicht.',
            }}
            width="half"
          />
          <TextField
            label="E-mailadres"
            name="email"
            rules={{
              required: 'E-mailadres is verplicht.',
            }}
            width="half"
          />
          <Button
            label={isDirty ? 'Opslaan en projecten kiezen' : 'Projecten kiezen'}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </Column>
      </FormProvider>
    </Loader>
  )
}

export default PublisherForm
