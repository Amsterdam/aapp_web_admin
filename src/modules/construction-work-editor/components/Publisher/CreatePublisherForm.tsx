import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import ErrorComponent from 'components/ui/Error'
import Button from 'components/ui/button/Button'
import Loader from 'components/ui/containers/Loader'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import useNavigate from 'hooks/useNavigate'
import {useAddPublisherMutation} from 'modules/construction-work-editor/services/publishers'
import {AddPublisherQueryArgs} from 'modules/construction-work-editor/types/publisher'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

export const CreatePublisherForm = () => {
  const navigate = useNavigate()
  const form = useForm<AddPublisherQueryArgs>()
  const {handleSubmit} = form

  const [createPublisher, {isLoading, isError}] = useAddPublisherMutation()

  const onSubmit = useCallback(
    ({email, name}: AddPublisherQueryArgs) =>
      createPublisher({email, name})
        .unwrap()
        .then(data =>
          navigate(ConstructionWorkEditorRoute.publisher, {
            id: data.id,
          }),
        ),
    [createPublisher, navigate],
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
            label="Opslaan en projecten kiezen"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </Column>
      </FormProvider>
    </Loader>
  )
}
