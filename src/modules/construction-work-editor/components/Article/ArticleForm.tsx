import {FormProvider, useForm} from 'react-hook-form'
import LoadingButton from 'components/ui/button/LoadingButton'
import CheckboxField from 'components/ui/forms/CheckboxField/CheckboxField'
import ImageField from 'components/ui/forms/ImageField/ImageField'
import TextArea from 'components/ui/forms/TextArea'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import useSubmitArticle from 'modules/construction-work-editor/hooks/useSubmitArticle'
import {ArticleWarning} from 'modules/construction-work-editor/types/article'

const MAX_LENGTH = {
  TITLE: 100,
  BODY: 500,
}

export type FormData = {
  body: string
  image: string
  imageDescription: string
  sendPushNotification: boolean
  title: string
}

type Props = {
  article?: ArticleWarning
  id?: string
  projectId?: string
}

const ArticleForm = ({article, id, projectId}: Props) => {
  const form = useForm<FormData>()
  const {handleSubmit} = form
  const {
    onSubmit,
    error: submitError,
    isLoading: submitIsLoading,
  } = useSubmitArticle(id, projectId)

  return (
    <Column gutter="md">
      <FormProvider {...form}>
        <TextField
          defaultValue={article?.title ?? ''}
          label="Titel"
          maxLength={MAX_LENGTH.TITLE}
          name="title"
          rules={{
            required: 'Geef het bericht een titel.',
          }}
          width="half"
        />
        <TextArea
          defaultValue={article?.body ?? ''}
          label="Inhoud"
          maxLength={MAX_LENGTH.BODY}
          name="body"
          rows={8}
          rules={{
            required: 'Voeg inhoud toe aan het bericht.',
          }}
        />
        <ImageField
          description={article?.image?.alternativeText}
          label="Voeg een afbeelding toe"
          name="image"
          src={article?.image?.sources?.[0]?.uri}
        />
        {!article?.is_already_pushed && (
          <CheckboxField
            label="Verstuur ook een pushbericht"
            name="sendPushNotification"
          />
        )}
      </FormProvider>
      <LoadingButton
        error={submitError}
        label="Opslaan"
        loading={submitIsLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </Column>
  )
}

export default ArticleForm
