import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import ErrorComponent from '@/components/ui/Error'
import Button from '@/components/ui/button/Button'
import Loader from '@/components/ui/containers/Loader'
import TextField from '@/components/ui/forms/TextField'
import Column from '@/components/ui/layout/Column'
import useNavigate from '@/hooks/useNavigate'
import {
  useAddPublisherMutation,
  useEditPublisherMutation,
  useGetPublishersQuery,
} from '@/modules/construction-work-editor/services/publishers'
import {
  AddPublisherQueryArgs,
  EditPublisherQueryArgs,
  Publisher,
} from '@/modules/construction-work-editor/types/publisher'
import {ConstructionWorkEditorRoute} from '@/modules/construction-work-editor/types/routes'
import {isAmsterdamEmail} from '@/modules/construction-work-editor/utils/isAmsterdamEmail'
import {isNewPublisher} from '@/modules/construction-work-editor/utils/isNewPublisher'

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

  const {
    data: publishers = [],
    isError: isErrorGettingPublishers,
    isLoading: isLoadingGettingPublishers,
  } = useGetPublishersQuery()

  const [
    createPublisher,
    {isLoading: isCreateLoading, isError: isCreateError},
  ] = useAddPublisherMutation()

  const [editPublisher, {isLoading: isEditLoading, isError: isEditError}] =
    useEditPublisherMutation()

  const isError = isCreateError || isEditError
  const isLoading =
    isCreateLoading || isEditLoading || isLoadingGettingPublishers

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
        return editPublisher({email, id: idParam, name})
      }

      return Promise.resolve()
    },
    [editPublisher, isDirty],
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

  if (isErrorGettingPublishers) {
    return (
      <ErrorComponent message="Er is iets misgegaan bij het ophalen van bestaande publishers" />
    )
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
              validate: {
                isNewPublisher: input => isNewPublisher(input, publishers),
                isAmsterdamEmail,
              },
            }}
            width="half"
          />
          <Button
            label={id ? 'Opslaan' : 'Opslaan en projecten kiezen'}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </Column>
      </FormProvider>
    </Loader>
  )
}

export default PublisherForm
