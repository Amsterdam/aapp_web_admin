import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect, useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import LoadingButton from 'components/ui/button/LoadingButton'
import {CheckboxIndicatorStatus} from 'components/ui/forms/CheckboxField/CheckboxIndicator'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import LoadingScreen from 'components/ui/screens/Loading.screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import useNavigate from 'hooks/useNavigate'
import ModuleStatusField from 'modules/releases/components/form-fields/ModuleStatusField'
import {
  useEditModuleVersionStatusMutation,
  useGetModuleVersionQuery,
} from 'modules/releases/services/modules'
import {ModuleStatusInRelease} from 'modules/releases/types/module'
import {ReleasesRoute} from 'modules/releases/types/routes'
import {
  getActiveReleases,
  getCombinedStatusInReleases,
} from 'modules/releases/utils/getCombinedStatusInReleases'

type Params = {
  slug: string
  version: string
}

type FormData = {
  allSelected: CheckboxIndicatorStatus
  releases: string[]
}

const EditModuleVersionStatusScreen = () => {
  const {slug, version} = useParams<Params>()
  const form = useForm<FormData>()
  const {handleSubmit, setValue, watch} = form
  const watchAll = watch('allSelected')
  const watchReleases = watch('releases')
  const [
    editModuleVersionStatus,
    {isLoading: isLoadingModuleVersionStatusMutation},
  ] = useEditModuleVersionStatusMutation()
  const navigate = useNavigate()

  const {data: moduleVersion, isLoading: isLoadingModuleVersion} =
    useGetModuleVersionQuery(
      slug && version
        ? {
            slug,
            version,
          }
        : skipToken,
    )

  const releases = useMemo(
    () =>
      moduleVersion?.statusInReleases
        ? getCombinedStatusInReleases(moduleVersion?.statusInReleases)
        : [],
    [moduleVersion?.statusInReleases],
  )

  const resetForm = useCallback(
    (newFormData: FormData) => {
      form.reset({...newFormData})
    },
    [form],
  )

  useEffect(() => {
    if (watchAll !== 'indeterminate') {
      const newFormData =
        watchAll === false
          ? {releases: [], allSelected: false}
          : {releases, allSelected: true}
      resetForm(newFormData)
    }
  }, [releases, resetForm, watchAll])

  useEffect(() => {
    if (watchReleases?.length === releases.length) {
      setValue('allSelected', true)
    } else if (!watchReleases?.length) {
      setValue('allSelected', false)
    } else {
      setValue('allSelected', 'indeterminate')
    }
  }, [releases, setValue, watchReleases])

  useEffect(() => {
    const activeReleases = moduleVersion?.statusInReleases
      ? getActiveReleases(moduleVersion?.statusInReleases)
      : []
    resetForm({
      releases: activeReleases,
      allSelected:
        // eslint-disable-next-line no-nested-ternary
        activeReleases.length === releases.length
          ? true
          : !activeReleases.length
          ? false
          : 'indeterminate',
    })
  }, [resetForm, releases, moduleVersion?.statusInReleases])

  const onSubmit = (data: FormData) => {
    if (!slug || !version) {
      return
    }

    const activeReleases: ModuleStatusInRelease = {status: 1, releases: []}
    const inactiveReleases: ModuleStatusInRelease = {status: 0, releases: []}

    releases.forEach(release => {
      if (data.releases.includes(release)) {
        activeReleases.releases.push(release)
      } else {
        inactiveReleases.releases.push(release)
      }
    })
    const statusInReleases = [inactiveReleases, activeReleases]

    editModuleVersionStatus({slug, version, statusInReleases}).then(
      response => {
        if ('data' in response) {
          navigate(ReleasesRoute.editModuleVersion, {slug, version})
        }
      },
    )
  }

  if (isLoadingModuleVersion) {
    return <LoadingScreen />
  }

  if (!moduleVersion?.statusInReleases) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Moduleversie"
          title={`${moduleVersion?.title} ${version}`}
        />
        <FormProvider {...form}>
          <ModuleStatusField releases={releases} />
        </FormProvider>
        <LoadingButton
          label="Opslaan"
          loading={isLoadingModuleVersionStatusMutation}
          onClick={handleSubmit(onSubmit)}
        />
      </Column>
    </Screen>
  )
}

export default EditModuleVersionStatusScreen
