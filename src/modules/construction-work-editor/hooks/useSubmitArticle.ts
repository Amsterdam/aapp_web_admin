import {useCallback, useState} from 'react'
import useNavigate from '@/hooks/useNavigate'
import {ArticleFormData} from '@/modules/construction-work-editor/components/Article/ArticleForm'
import {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
} from '@/modules/construction-work-editor/services/articles'
import {ConstructionWorkEditorRoute} from '@/modules/construction-work-editor/types/routes'
import {escapeHtml} from '@/utils/escapeHtml'

type RequestBodyBase = {
  body: string
  warning_image?: {
    id: number
    description: string
  } | null
  send_push_notification: boolean
  title: string
}

type Params = {
  dirtyFields: Partial<
    Readonly<Record<keyof ArticleFormData, boolean | undefined>>
  >
  id?: number
  projectId?: string
  imageId?: number
}

const getImageBlob = (blobUrl: string): Promise<Blob> =>
  fetch(blobUrl).then(response => response.blob())

// Escape HTML and replace newlines with <br /> tags
const encodeBody = (input: string) => escapeHtml(input).replace(/\n/g, '<br />')

const useSubmitArticle = ({dirtyFields, id, projectId, imageId}: Params) => {
  const [isBeforeNavigation, setIsBeforeNavigation] = useState<boolean>(false)
  const navigate = useNavigate()
  const [
    addProjectWarningImage,
    {isLoading: isAddProjectImageLoading, error: addProjectImageError},
  ] = useAddProjectWarningImageMutation()
  const [
    addProjectWarning,
    {isLoading: isAddProjectLoading, error: addProjectError},
  ] = useAddProjectWarningMutation()
  const [
    editProjectWarning,
    {isLoading: isEditProjectLoading, error: editProjectError},
  ] = useEditProjectWarningMutation()
  const isNewArticle = !id

  const addWarning = useCallback(
    (requestBody: RequestBodyBase) => {
      if (!projectId) {
        // eslint-disable-next-line no-console
        console.error('Project ID is required for new articles')

        return
      }
      const addProjectWarningRequestBody = {
        ...requestBody,
        projectId,
      }
      setIsBeforeNavigation(true)
      addProjectWarning(addProjectWarningRequestBody)
        .unwrap()
        .then(() => {
          navigate(ConstructionWorkEditorRoute.project, {projectId})
        })
    },
    [addProjectWarning, navigate, projectId],
  )
  const editWarning = useCallback(
    (requestBody: RequestBodyBase) => {
      if (!id) {
        // eslint-disable-next-line no-console
        console.error('Warning ID is required to edit a warning')

        return
      }

      const editProjectWarningRequestBody = {
        ...requestBody,
        id,
      }
      setIsBeforeNavigation(true)
      editProjectWarning(editProjectWarningRequestBody)
        .unwrap()
        .then(() => {
          if (projectId) {
            navigate(ConstructionWorkEditorRoute.project, {projectId})
          }
        })
    },
    [editProjectWarning, id, navigate, projectId],
  )

  const onSubmit = useCallback(
    async ({
      body,
      image,
      imageFileName,
      imageDescription,
      sendPushNotification,
      title,
    }: ArticleFormData) => {
      const requestBody: RequestBodyBase = {
        body: encodeBody(body),
        send_push_notification: sendPushNotification ?? false,
        title,
      }
      let newImageId = imageId
      if (image) {
        if (dirtyFields.image) {
          const blobImageData = await getImageBlob(image)
          const formData = new FormData()

          formData.append('image', blobImageData, imageFileName ?? 'test.jpg')
          const description = imageDescription ?? 'Vervangende afbeelding'

          formData.append('description', description)
          // eslint-disable-next-line camelcase
          const {warning_image_id} =
            await addProjectWarningImage(formData).unwrap()
          // eslint-disable-next-line camelcase
          newImageId = warning_image_id
        }
      } else {
        newImageId = undefined
      }
      if (newImageId) {
        requestBody.warning_image = {
          // eslint-disable-next-line camelcase
          id: newImageId,
          description: imageDescription,
        }
      }
      if (isNewArticle) {
        addWarning(requestBody)
      } else {
        editWarning(requestBody)
      }
    },
    [
      addProjectWarningImage,
      addWarning,
      dirtyFields.image,
      editWarning,
      isNewArticle,
      imageId,
    ],
  )

  return {
    error: addProjectError || editProjectError || addProjectImageError,
    isBeforeNavigation,
    isLoading:
      isAddProjectLoading || isEditProjectLoading || isAddProjectImageLoading,
    onSubmit,
  }
}

export default useSubmitArticle
