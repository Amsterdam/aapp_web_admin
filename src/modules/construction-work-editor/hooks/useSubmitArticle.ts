import {useCallback, useState} from 'react'
import {FormData} from 'modules/construction-work-editor/components/Article/ArticleForm'
import {
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
} from 'modules/construction-work-editor/services/articles'

type RequestBodyBase = {
  body: string
  image: {
    data: string
    description: string
    main: boolean
  }
  send_push_notification: boolean
  title: string
}

const useSubmitArticle = (id?: string, projectId?: string) => {
  const [isBeforeNavigation, setIsBeforeNavigation] = useState<boolean>(false)
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
        project_id: projectId,
      }
      setIsBeforeNavigation(true)
      addProjectWarning(addProjectWarningRequestBody)
    },
    [addProjectWarning, projectId],
  )
  const editWarning = useCallback(
    (requestBody: RequestBodyBase) => {
      if (!id) {
        // eslint-disable-next-line no-console
        console.error('Warning ID is required for to edit a warning')

        return
      }
      const editProjectWarningRequestBody = {
        ...requestBody,
        id,
      }
      setIsBeforeNavigation(true)
      editProjectWarning(editProjectWarningRequestBody)
    },
    [editProjectWarning, id],
  )

  const onSubmit = useCallback(
    ({
      body,
      image,
      imageDescription,
      sendPushNotification,
      title,
    }: FormData) => {
      const requestBody = {
        body,
        image: {
          data: image,
          description: imageDescription,
          main: true,
        },
        send_push_notification: sendPushNotification,
        title,
      }
      if (isNewArticle) {
        addWarning(requestBody)
      } else {
        editWarning(requestBody)
      }
    },
    [addWarning, editWarning, isNewArticle],
  )

  return {
    error: addProjectError || editProjectError,
    isBeforeNavigation,
    isLoading: isAddProjectLoading || isEditProjectLoading,
    onSubmit,
  }
}

export default useSubmitArticle
