import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import LoadingButton from 'components/ui/button/LoadingButton'
import NavigationButton from 'components/ui/button/NavigationButton'
import CheckboxField from 'components/ui/forms/CheckboxField/CheckboxField'
import ImageField from 'components/ui/forms/ImageField/ImageField'
import TextArea from 'components/ui/forms/TextArea'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import useNavigate from 'hooks/useNavigate'
import useSubmitArticle from 'modules/construction-work-editor/hooks/useSubmitArticle'
import {ArticleWarning} from 'modules/construction-work-editor/types/article'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import {unescapeHtml} from 'utils/escapeHtml'

const MAX_LENGTH = {
  TITLE: 100,
  BODY: 1000,
}

export type ArticleFormData = {
  body: string
  image: string
  imageFileName: string
  imageDescription: string
  sendPushNotification: boolean
  title: string
}

type Props = {
  article?: ArticleWarning
  id?: number
  projectId: string
}

// Decode HTML and replace <br /> tags with newlines
const decodeBody = (input?: string | null) =>
  input && unescapeHtml(input).replace(/<br\s*\/?>/gi, '\n')

const ArticleForm = ({article, id, projectId}: Props) => {
  const image = article?.images?.[0]
  const form = useForm<ArticleFormData>({
    defaultValues: {
      body: decodeBody(article?.body) ?? undefined,
      image:
        image?.sources?.[2]?.uri ??
        image?.sources?.[1]?.uri ??
        image?.sources?.[0]?.uri ??
        undefined,
      imageFileName: article?.images?.[0]?.id?.toString() ?? undefined,
      imageDescription: article?.images?.[0]?.alternativeText ?? undefined,
      sendPushNotification: article?.notification_sent,
      title: article?.title ?? undefined,
    },
  })
  const navigate = useNavigate()
  const {
    formState: {dirtyFields},
    handleSubmit,
  } = form
  const {
    onSubmit,
    error: submitError,
    isLoading: submitIsLoading,
  } = useSubmitArticle({
    dirtyFields,
    id,
    projectId,
    imageId: article?.images?.[0]?.id,
  })

  const onClickSubmit = useCallback(() => {
    if (Object.keys(dirtyFields).length) {
      handleSubmit(onSubmit)()
    } else {
      navigate(ConstructionWorkEditorRoute.project, {projectId})
    }
  }, [dirtyFields, handleSubmit, navigate, onSubmit, projectId])

  return (
    <Column gutter="md">
      <FormProvider {...form}>
        <TextField
          label="Titel"
          maxLength={MAX_LENGTH.TITLE}
          name="title"
          rules={{
            required: 'Geef het bericht een titel.',
          }}
          width="half"
        />
        <TextArea
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
          src={
            image?.sources?.[2]?.uri ??
            image?.sources?.[1]?.uri ??
            image?.sources?.[0]?.uri
          }
        />
        {!article?.notification_sent && (
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
        onClick={onClickSubmit}
      />
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
