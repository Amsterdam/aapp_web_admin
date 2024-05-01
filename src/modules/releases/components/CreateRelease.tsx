import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Column from 'components/ui/layout/Column'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import ReleaseForm from 'modules/releases/components/ReleaseForm'
import {useGetModulesQuery} from 'modules/releases/services/modules'
import {
  useCreateReleaseMutation,
  useGetLatestReleaseQuery,
  useGetReleaseQuery,
} from 'modules/releases/services/releases'
import {selectReleaseModules} from 'modules/releases/slices/release.slice'
import {ModuleVersion} from 'modules/releases/types/module'
import {
  ReleaseBase,
  ReleaseWithModuleVersions,
} from 'modules/releases/types/release'
import {ReleasesRoute} from 'modules/releases/types/routes'
import {getPreviousPatchVersion} from 'modules/releases/utils/getHotfixVersion'

type Props = {
  hotfixVersion?: string
}

const CreateRelease = ({hotfixVersion}: Props) => {
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<ReleaseBase>(
    hotfixVersion ? {defaultValues: {version: hotfixVersion}} : undefined,
  )
  const {watch} = form
  const releaseVersion = hotfixVersion ?? watch('version')
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  const getLatestReleaseQuery = useGetLatestReleaseQuery(
    hotfixVersion ? skipToken : undefined,
  )

  const getReplaceReleaseQuery = useGetReleaseQuery(
    hotfixVersion
      ? {version: getPreviousPatchVersion(releaseVersion)}
      : skipToken,
  )

  const {data: previousRelease, isLoading: isLoadingPreviousRelease} =
    hotfixVersion ? getReplaceReleaseQuery : getLatestReleaseQuery

  const {data: previousModules, isLoading: isLoadingPreviousModules} =
    useGetModulesQuery(undefined, {
      skip: isLoadingPreviousRelease || !!previousRelease,
    })

  const releaseIfNoPreviousRelease = useMemo(() => {
    if (!previousModules) {
      return null
    }

    return {
      created: '',
      modified: '',
      isSupported: true,
      isDeprecated: false,
      version: '0.15.0',
      published: null,
      deprecated: null,
      unpublished: null,
      releaseNotes: '',
      modules: previousModules || ({} as ModuleVersion[]),
    }
  }, [previousModules])

  const handleCreateRelease = async (data: ReleaseBase) => {
    const preparedData = {
      ...data,
      published: data.published === '' ? null : data.published,
      deprecated: data.deprecated === '' ? null : data.deprecated,
      unpublished: data.unpublished === '' ? null : data.unpublished,
      modules: releaseModules.map(({moduleSlug, version}) => ({
        moduleSlug,
        version,
        status: 1,
      })),
    }
    const result = await createRelease(preparedData)
    if ('data' in result) {
      navigate(ReleasesRoute.releases)
    }
  }

  if (isLoadingPreviousRelease || isLoadingPreviousModules) {
    return <Loading />
  }

  if (!previousRelease && !releaseIfNoPreviousRelease) {
    return (
      <ErrorComponent message="Er zijn geen modules die aan een release toegevoegd kunnen worden." />
    )
  }

  return (
    <Column gutter="lg">
      <ScreenTitle
        subtitle="Nieuwe release"
        title={`Amsterdam App ${releaseVersion ?? ''}`}
      />
      <FormProvider {...form}>
        <ReleaseForm
          canEditVersion={!hotfixVersion}
          onSubmit={handleCreateRelease}
          release={
            previousRelease ??
            releaseIfNoPreviousRelease ??
            ({} as ReleaseWithModuleVersions)
          }
        />
      </FormProvider>
    </Column>
  )
}

export default CreateRelease
