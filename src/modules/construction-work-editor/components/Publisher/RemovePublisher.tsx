import LoadingButton from 'components/ui/button/LoadingButton'
import useNavigate from 'hooks/useNavigate'
import {useRemovePublisherMutation} from 'modules/construction-work-editor/services/publishers'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

type Props = {
  id: number
  name: string
  setIsBeforeNavigation: (value: boolean) => void
}

const RemovePublisher = ({id, name, setIsBeforeNavigation}: Props) => {
  const navigate = useNavigate()
  const [removePublisher, {isLoading, error}] = useRemovePublisherMutation()

  const onDelete = () => {
    if (!id) {
      return
    }
    if (
      // eslint-disable-next-line no-alert
      window.confirm(`Weet je zeker dat je ${name} wil verwijderen?`)
    ) {
      setIsBeforeNavigation(true)
      removePublisher(id)
        .unwrap()
        .then(() => {
          navigate(ConstructionWorkEditorRoute.publishers)
        })
    }
  }

  return (
    <LoadingButton
      error={error}
      label="Verwijderen"
      loading={isLoading}
      onClick={onDelete}
      variant="secondary"
    />
  )
}

export default RemovePublisher
