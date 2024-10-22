import {useCallback, useState} from 'react'
import useNavigate from 'hooks/useNavigate'
import {FormData} from 'modules/construction-work-editor/components/Article/ArticleForm'
import {
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
} from 'modules/construction-work-editor/services/articles'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import {escapeHtml} from 'utils/escapeHtml'
import getBase64ImageData from 'utils/getBase64ImageData'

type RequestBodyBase = {
  body: string
  image?: {
    data: string
    description: string
    // TODO: property main should be removed after migration to monorepo for the backend
    main: boolean
  }
  send_push_notification: boolean
  title: string
}

type Params = {
  dirtyFields: Partial<Readonly<Record<keyof FormData, boolean | undefined>>>
  id?: number
  projectId?: string
}

// Escape HTML and replace newlines with <br /> tags
const encodeBody = (input: string) => escapeHtml(input).replace(/\n/g, '<br />')

const useSubmitArticle = ({dirtyFields, id, projectId}: Params) => {
  const [isBeforeNavigation, setIsBeforeNavigation] = useState<boolean>(false)
  const navigate = useNavigate()
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
      imageDescription,
      sendPushNotification,
      title,
    }: FormData) => {
      const requestBody: RequestBodyBase = {
        body: encodeBody(body),
        send_push_notification: sendPushNotification ?? false,
        title,
      }
      if (image && dirtyFields.image) {
        const base64ImageData = await getBase64ImageData(image)

        if (base64ImageData && typeof base64ImageData === 'string') {
          requestBody.image = {
            data: base64ImageData,
            description: imageDescription,
            // TODO: property main should be removed after migration to monorepo for the backend
            main: true,
          }
        }
      }
      if (isNewArticle) {
        addWarning(requestBody)
      } else {
        editWarning(requestBody)
      }
    },
    [addWarning, dirtyFields.image, editWarning, isNewArticle],
  )

  return {
    error: addProjectError || editProjectError,
    isBeforeNavigation,
    isLoading: isAddProjectLoading || isEditProjectLoading,
    onSubmit,
  }
}

export default useSubmitArticle
