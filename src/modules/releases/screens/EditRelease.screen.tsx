import {skipToken} from '@reduxjs/toolkit/query'
import isEqual from 'lodash.isequal'
import {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {
  useEditReleaseVersionMutation,
  useGetReleaseQuery,
} from 'modules/releases/services/releases'
import {selectReleaseModules} from 'modules/releases/slices/release.slice'
import {ModuleVersionWithStatusInReleases} from 'modules/releases/types/module'
import {ReleaseBase} from 'modules/releases/types/release'
import ErrorScreen from '../../../components/ui/screens/Error.screen'
import LoadingScreen from '../../../components/ui/screens/Loading.screen'
import ReleaseForm from '../components/ReleaseForm'

type Params = {
  version: ReleaseBase['version']
}

const dateFields = ['deprecated', 'published', 'unpublished']

const replaceEmptyDates = <T,>(
  field: keyof ReleaseBase,
  value: T,
): T | null => {
  if (dateFields.includes(field)) {
    if (typeof value === 'string' && value === '') {
      return null
    }
  }
  return value
}

const EditReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {version: versionParam} = useParams<Params>()
  const {data: release, isLoading} = useGetReleaseQuery(
    versionParam && !isBeforeNavigation ? {version: versionParam} : skipToken,
  )

  const form = useForm<ReleaseBase>()
  const {formState, reset} = form

  useEffect(() => {
    if (release) {
      const {
        created,
        modified,
        published,
        deprecated,
        unpublished,
        ...releaseProps
      } = release
      reset({
        ...releaseProps,
        published: published ?? '',
        deprecated: deprecated ?? '',
        unpublished: unpublished ?? '',
      })
    }
  }, [release, reset])

  const {dirtyFields} = formState
  const navigate = useNavigate()
  const [editRelease] = useEditReleaseVersionMutation()
  const [initialReleaseModules, setInitialReleaseModules] = useState<
    ModuleVersionWithStatusInReleases[] | undefined
  >()

  useEffect(() => {
    if (!initialReleaseModules && releaseModules) {
      setInitialReleaseModules(releaseModules)
    }
  }, [initialReleaseModules, releaseModules])

  const handleEditRelease = async (data: ReleaseBase) => {
    if (!versionParam) {
      return
    }
    const dirtyFieldKeys = Object.keys(dirtyFields) as Array<keyof ReleaseBase>
    const isModulesModified = !isEqual(releaseModules, initialReleaseModules)
    setIsBeforeNavigation(true)
    if (!dirtyFieldKeys.length && !isModulesModified) {
      // No changes made
      navigate('/mbs/releases')
    } else {
      // Only send the fields that have been modified
      const dirtyFieldsOnly = dirtyFieldKeys.reduce<Partial<ReleaseBase>>(
        (acc, field) => ({
          ...acc,
          [field]: replaceEmptyDates(field, data[field]),
        }),
        {},
      )

      const preparedData = {
        ...dirtyFieldsOnly,
        modules: releaseModules.map(({moduleSlug, version}) => ({
          moduleSlug,
          status:
            release?.modules.find(module => module.moduleSlug === moduleSlug)
              ?.status ?? 1,
          version,
        })),
        pathVersion: versionParam,
      }

      const result = await editRelease(preparedData)
      if ('data' in result) {
        navigate('/mbs/releases')
      }
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!release) {
    return (
      <ErrorScreen message="De release versie kon niet worden opgehaald." />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Release"
          title={`Amsterdam App ${versionParam}`}
        />
        <FormProvider {...form}>
          <ReleaseForm
            onSubmit={handleEditRelease}
            release={release}
            versionDefaultValue={versionParam}
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditReleaseScreen
