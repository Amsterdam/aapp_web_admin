import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import LoadingButton from 'components/ui/button/LoadingButton'
import NavigationButton from 'components/ui/button/NavigationButton'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ErrorScreen from 'components/ui/screens/Error.screen'
import LoadingScreen from 'components/ui/screens/Loading.screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import useNavigate from 'hooks/useNavigate'
import ModuleDescriptionField from 'modules/releases/components/form-fields/ModuleDescriptionField'
import ModuleIconField from 'modules/releases/components/form-fields/ModuleIconField'
import ModuleTitleField from 'modules/releases/components/form-fields/ModuleTitleField'
import VersionField from 'modules/releases/components/form-fields/VersionField'
import {
  useDeleteModuleVersionMutation,
  useEditModuleVersionMutation,
  useGetModulesQuery,
  useGetModuleVersionQuery,
} from 'modules/releases/services/modules'
import {ModuleVersion} from 'modules/releases/types/module'
import {ReleasesRoute} from 'modules/releases/types/routes'

type Params = {
  slug: string
  version: string
}

const EditModuleScreen = () => {
  const navigate = useNavigate()

  const {slug: slugParam, version: versionParam} = useParams() as Params
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {data: moduleVersion, isLoading} = useGetModuleVersionQuery(
    slugParam && versionParam && !isBeforeNavigation
      ? {
          slug: slugParam,
          version: versionParam,
        }
      : skipToken,
  )
  const isInRelease = moduleVersion?.statusInReleases?.length

  const form = useForm<ModuleVersion>()
  const [
    editModuleVersion,
    {isLoading: isEditingModuleVersion, error: editingModuleError},
  ] = useEditModuleVersionMutation()
  const [
    deleteModuleVersion,
    {isLoading: isDeletingModule, error: deletingModuleError},
  ] = useDeleteModuleVersionMutation()
  const {data: latestModules} = useGetModulesQuery(undefined, {
    skip: isBeforeNavigation,
  })
  const isLatestVersion = latestModules?.some(
    module =>
      module.moduleSlug === slugParam && module.version === versionParam,
  )

  const {handleSubmit, formState} = form
  const {dirtyFields} = formState

  const handleRemoveModuleVersion = () => {
    if (!moduleVersion) {
      return
    }
    const {moduleSlug, version, title} = moduleVersion
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Weet je zeker dat je module ‘${title}’ v${version} wil verwijderen?`,
      )
    ) {
      setIsBeforeNavigation(true)
      deleteModuleVersion({
        moduleSlug,
        version,
      })
        .unwrap()
        .then(() => {
          navigate(ReleasesRoute.module, {slug: moduleSlug})
        })
    }
  }

  const onSubmit = (data: ModuleVersion) => {
    const dirtyFieldsOnly: Partial<ModuleVersion> = {}
    const dirtyFieldKeys = Object.keys(dirtyFields) as Array<
      keyof ModuleVersion
    >
    if (!moduleVersion) {
      return
    }

    const {moduleSlug, version} = moduleVersion

    if (!dirtyFieldKeys.length) {
      navigate(ReleasesRoute.module, {slug: moduleSlug})
    } else {
      dirtyFieldKeys.forEach(<K extends keyof ModuleVersion>(field: K) => {
        dirtyFieldsOnly[field] = data[field]
      })
      setIsBeforeNavigation(true)
      editModuleVersion({
        ...dirtyFieldsOnly,
        moduleSlug,
        pathVersion: version,
      }).then(response => {
        if ('data' in response) {
          navigate(ReleasesRoute.module, {slug: moduleSlug})
        }
      })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const versionFieldValue = form.watch('version') ?? moduleVersion?.version
  const titleFieldValue = form.watch('title') ?? moduleVersion?.title

  if (!moduleVersion) {
    return (
      <ErrorScreen
        message={`Versie ${versionParam} van module ‘${slugParam}’ niet gevonden.`}
      />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Moduleversie"
          title={`${titleFieldValue} ${versionFieldValue}`}
        />
        <FormProvider {...form}>
          <Column gutter="lg">
            <ModuleTitleField defaultValue={moduleVersion.title} />
            <ModuleDescriptionField defaultValue={moduleVersion.description} />
            <ModuleIconField defaultValue={moduleVersion.icon} />
            {!isInRelease && !!isLatestVersion && (
              <VersionField
                baseVersion={moduleVersion.version}
                defaultValue={moduleVersion.version}
              />
            )}
            <LoadingButton
              error={editingModuleError}
              label="Opslaan"
              loading={isEditingModuleVersion}
              onClick={handleSubmit(onSubmit)}
            />
            {isInRelease ? (
              <NavigationButton
                label="Aan- of uitzetten"
                params={{
                  slug: slugParam,
                  version: versionParam,
                }}
                url={ReleasesRoute.editModuleVersionStatus}
                variant="secondary"
              />
            ) : (
              <Column gutter="sm">
                <LoadingButton
                  error={deletingModuleError}
                  label="Verwijderen"
                  loading={isDeletingModule}
                  onClick={handleRemoveModuleVersion}
                  variant="secondary"
                />
              </Column>
            )}
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
