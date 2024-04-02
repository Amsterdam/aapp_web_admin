import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useGetModulesQuery} from 'services/modules'
import {useCreateReleaseMutation, useGetLatestReleaseQuery, useGetReleaseQuery} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ModuleVersion} from 'types/module'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'
import {getPreviousPatchVersion} from 'utils/getHotfixVersion'
import ReleaseForm from '../../components/features/ReleaseForm'
import LoadingScreen from '../Loading.screen'
import ErrorScreen from './Error.screen'

type Props = {
  hotfixVersion?: string
}

const CreateRelease = ({hotfixVersion}: Props) => {
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<ReleaseBase>(hotfixVersion ? {defaultValues: {version: hotfixVersion}} : undefined)
  const {watch} = form
  const releaseVersion = hotfixVersion ?? watch('version')
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  const getLatestReleaseQuery = useGetLatestReleaseQuery(hotfixVersion ? skipToken : undefined)

  const getReplaceReleaseQuery = useGetReleaseQuery(
    hotfixVersion ? {version: getPreviousPatchVersion(releaseVersion)} : skipToken,
  )

  const {data: previousRelease, isLoading: isLoadingPreviousRelease} = hotfixVersion
    ? getReplaceReleaseQuery
    : getLatestReleaseQuery

  const {data: previousModules, isLoading: isLoadingPreviousModules} = useGetModulesQuery(undefined, {
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
      navigate('/mbs/releases')
    }
  }

  if (isLoadingPreviousRelease || isLoadingPreviousModules) {
    return <LoadingScreen />
  }

  if (!previousRelease && !releaseIfNoPreviousRelease) {
    return <ErrorScreen message="Er zijn geen modules die aan een release toegevoegd kunnen worden." />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Nieuwe release"
          title={`Amsterdam App ${releaseVersion ?? ''}`}
        />
        <FormProvider {...form}>
          <ReleaseForm
            canEditVersion={!hotfixVersion}
            onSubmit={handleCreateRelease}
            release={previousRelease ?? releaseIfNoPreviousRelease ?? ({} as ReleaseWithModuleVersions)}
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateRelease
