import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Box from 'components/ui/layout/Box'
import {useAddPublisherMutation} from 'modules/construction-work-editor/services/publisher'
import {PublisherFormType} from 'modules/construction-work-editor/types/publisher'

// TODO: Fix mutate endpoint when BE is ready

const CreatePublisher = () => {
  const navigate = useNavigate()
  const form = useForm<PublisherFormType>()
  const {handleSubmit} = form

  const [
    createPublisher,
    {isLoading: isMutatePublisherLoading, isError: isMutatePublisherError},
  ] = useAddPublisherMutation()

  const handleOnClick = useCallback(
    async (data: PublisherFormType) => {
      await createPublisher({email: data.email})
      if (!isMutatePublisherError) {
        navigate('/publisher/edit/1234')
      }
    },
    [createPublisher, isMutatePublisherError, navigate],
  )

  return (
    <Box>
      <FormProvider {...form}>
        <TextField label="E-mail" name="email" />
        <Button
          label="Doorgaan"
          onClick={handleSubmit(handleOnClick)}
          disabled={isMutatePublisherLoading}
        />
      </FormProvider>
    </Box>
  )
}

export default CreatePublisher
