import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Button from 'components/ui/button/Button'
import Loader from 'components/ui/containers/Loader'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/routes'
import {useAddPublisherMutation} from 'modules/construction-work-editor/services'
import {PublisherAddForm} from 'modules/construction-work-editor/types/publisher'

export const CreatePublisherForm = () => {
  const navigate = useNavigate()
  const form = useForm<PublisherAddForm>()
  const {handleSubmit, watch} = form
  const value = watch('email')

  const [createPublisher, {isLoading, isError}] = useAddPublisherMutation()

  const handleOnClick = useCallback(
    ({email}: PublisherAddForm) => {
      createPublisher({email})
        .unwrap()
        .then(data =>
          navigate(`${ConstructionWorkEditorRoute.publisher}/${data.email}`),
        )
    },
    [createPublisher, navigate],
  )

  if (isError) {
    return <ErrorComponent message="Er is iets misgegaan bij het opslaan." />
  }

  return (
    <Loader loading={isLoading}>
      <FormProvider {...form}>
        <Column gutter="md">
          <TextField label="E-mailadres" name="email" />
          <Button
            label="Opslaan en projecten kiezen"
            onClick={handleSubmit(handleOnClick)}
            disabled={isLoading || !value}
          />
        </Column>
      </FormProvider>
    </Loader>
  )
}
