import {FormProvider, useForm} from 'react-hook-form'
import LoadingButton from 'components/ui/button/LoadingButton'
import NavigationButton from 'components/ui/button/NavigationButton'
import CheckboxField from 'components/ui/forms/CheckboxField/CheckboxField'
import ImageField from 'components/ui/forms/ImageField/ImageField'
import TextArea from 'components/ui/forms/TextArea'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import useSubmitArticle from 'modules/construction-work-editor/hooks/useSubmitArticle'
import {ArticleWarning} from 'modules/construction-work-editor/types/article'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

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
  id?: number
  projectId: string
}

const ArticleForm = ({article, id, projectId}: Props) => {
  const form = useForm<FormData>()
  const {formState, handleSubmit} = form
  const {dirtyFields} = formState
  const {
    onSubmit,
    error: submitError,
    isLoading: submitIsLoading,
  } = useSubmitArticle({dirtyFields, id, projectId})
  const image = article?.images?.find(({main}) => main)

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
          description={image?.alternativeText}
          label="Voeg een afbeelding toe"
          name="image"
          src={image?.sources?.[2]?.uri}
        />
        {!article?.is_already_pushed && (
          <CheckboxField
            label="Verstuur ook een pushbericht"
            name="sendPushNotification"
          />
        )}
      </FormProvider>
      {!!Object.keys(dirtyFields).length && (
        <LoadingButton
          error={submitError}
          label="Opslaan"
          loading={submitIsLoading}
          onClick={handleSubmit(onSubmit)}
        />
      )}
      <NavigationButton
        label={Object.keys(dirtyFields).length ? 'Annuleren' : 'Ga terug'}
        params={{projectId}}
        url={ConstructionWorkEditorRoute.project}
        variant="secondary"
      />
    </Column>
  )
}

export default ArticleForm
