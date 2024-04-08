import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import TextArea from 'components/ui/forms/ControlledTextArea'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import {setModules} from 'slices/release.slice'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'

type Props = {
  canEditVersion?: boolean
  onSubmit: (data: ReleaseBase) => void
  release: ReleaseWithModuleVersions
  versionDefaultValue?: string
}

const ReleaseForm = ({
  canEditVersion,
  onSubmit,
  release,
  versionDefaultValue,
}: Props) => {
  const dispatch = useDispatch()
  const form = useFormContext<ReleaseBase>()
  const {handleSubmit, watch} = form
  const version = watch('version')

  useEffect(() => {
    if (release) {
      dispatch(setModules(release.modules))
    }
  }, [dispatch, release])

  return (
    <Column gutter="lg">
      {canEditVersion ? (
        <VersionField
          baseVersion={release.version}
          defaultValue={versionDefaultValue}
        />
      ) : (
        <Phrase color="muted">Versie: {version}</Phrase>
      )}
      <DragDropModules releaseVersion={release.version} />
      <TextField
        label="Gepubliceerd"
        name="published"
        type="date"
        width="half"
      />
      <TextField
        label="Deprecated"
        name="deprecated"
        type="date"
        width="half"
      />
      <TextField
        label="Ongepubliceerd (en niet meer supported)"
        name="unpublished"
        type="date"
        width="half"
      />
      <TextArea
        label="Release notes"
        name="releaseNotes"
        maxLength={500}
        rows={15}
      />
      <Button label="Opslaan" onClick={handleSubmit(onSubmit)} />
    </Column>
  )
}

export default ReleaseForm
