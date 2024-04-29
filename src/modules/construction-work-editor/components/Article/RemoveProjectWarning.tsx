import {useNavigate} from 'react-router-dom'
import LoadingButton from 'components/ui/button/LoadingButton'
import {useRemoveProjectWarningMutation} from 'modules/construction-work-editor/services/articles'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

type Props = {
  id: string
  projectId: string
  setIsBeforeNavigation: (value: boolean) => void
}

const RemoveProjectWarning = ({
  id,
  projectId,
  setIsBeforeNavigation,
}: Props) => {
  const navigate = useNavigate()
  const [
    removeProjectWarning,
    {
      isLoading: isRemoveProjectWarningLoading,
      error: removeProjectWarningError,
    },
  ] = useRemoveProjectWarningMutation()

  const onDelete = () => {
    if (!id) {
      return
    }
    if (
      // eslint-disable-next-line no-alert
      window.confirm(`Weet je zeker dat je dit bericht wil verwijderen?`)
    ) {
      setIsBeforeNavigation(true)
      removeProjectWarning({
        id,
      })
        .unwrap()
        .then(() => {
          navigate(`${ConstructionWorkEditorRoute.project}/${projectId}`)
        })
    }
  }

  return (
    <LoadingButton
      error={removeProjectWarningError}
      label="Verwijderen"
      loading={isRemoveProjectWarningLoading}
      onClick={onDelete}
      variant="secondary"
    />
  )
}

export default RemoveProjectWarning
