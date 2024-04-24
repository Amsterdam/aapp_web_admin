import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import Button from 'components/ui/button/Button'
import TextArea from 'components/ui/forms/TextArea'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import DragDropModules from 'modules/releases/components/DragDropModules'
import VersionField from 'modules/releases/components/form-fields/VersionField'
import {setModules} from 'modules/releases/slices/release.slice'
import {
  ReleaseBase,
  ReleaseWithModuleVersions,
} from 'modules/releases/types/release'

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
        // eslint-disable-next-line max-len
        description="De publicatiedatum bepaalt vanaf wanneer de release niet meer als pre-release te zien is en de release in aanmerking komt voor voor gebruik als latest version in update meldingen."
        label="Gepubliceerd"
        name="published"
        type="date"
        width="half"
      />
      <TextField
        // eslint-disable-next-line max-len
        description="De deprecateddatum bepaalt vanaf wanneer gebruikers van deze release een update suggestie melding krijgen."
        label="Deprecated"
        name="deprecated"
        type="date"
        width="half"
      />
      <TextField
        // eslint-disable-next-line max-len
        description="De ongepubliceerd datum bepaalt vanaf wanneer gebruikers van deze release een geforceerde update melding krijgen en de app voor deze gebruikers onbruikbaar is."
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
