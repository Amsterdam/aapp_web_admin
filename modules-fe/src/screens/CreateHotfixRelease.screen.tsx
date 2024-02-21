import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useGetModulesQuery} from 'services/modules'
import {useCreateReleaseMutation, useGetReleaseQuery} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ModuleVersion} from 'types/module'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'
import {getPreviousPatchVersion} from 'utils/getHotfixVersion'
import ReleaseForm from '../components/features/ReleaseForm'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

type Params = {
  version?: string
}

const CreateHotfixReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const {version: releaseVersion} = useParams<Params>()
  const form = useForm<ReleaseBase>({defaultValues: {version: releaseVersion}})
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  const {data: replaceRelease, isLoading: isLoadingReplaceRelease} =
    useGetReleaseQuery(
      releaseVersion
        ? {version: getPreviousPatchVersion(releaseVersion)}
        : skipToken,
    )

  const {data: latestModules, isLoading: isLoadingLatestModules} =
    useGetModulesQuery(undefined, {
      skip: isLoadingReplaceRelease || !!replaceRelease,
    })

  const releaseIfNoReplaceRelease = useMemo(() => {
    if (!latestModules) {
      return null
    }
    return {
      created: '',
      modified: '',
      version: '0.15.0',
      published: null,
      unpublished: null,
      releaseNotes: '',
      modules: latestModules || ({} as ModuleVersion[]),
    }
  }, [latestModules])

  const handleCreateRelease = async (data: ReleaseBase) => {
    const preparedData = {
      ...data,
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

  if (isLoadingReplaceRelease || isLoadingLatestModules) {
    return <LoadingScreen />
  }

  if (!replaceRelease && !releaseIfNoReplaceRelease) {
    return (
      <ErrorScreen message="Er zijn geen modules die aan een release toegevoegd kunnen worden." />
    )
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
            canEditVersion={false}
            onSubmit={handleCreateRelease}
            release={
              replaceRelease ??
              releaseIfNoReplaceRelease ??
              ({} as ReleaseWithModuleVersions)
            }
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateHotfixReleaseScreen
