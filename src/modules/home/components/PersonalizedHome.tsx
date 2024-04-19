import {useMemo} from 'react'
import useAuthorizedModules from 'authentication/hooks/useAuthorizedModules'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import {Module, ModuleType} from 'modules/types'
import slugToTitle from 'utils/slugToTitle'

type ModulesByTypeProps = {
  modules: Module[]
  type: ModuleType
}

const ModulesByType = ({modules, type}: ModulesByTypeProps) => {
  const title =
    type === ModuleType.contentManagement
      ? 'Wat wil je beheren?'
      : 'Andere mogelijkheden'

  return (
    <Column gutter="md">
      <Phrase>{title}</Phrase>
      <Column gutter="lg">
        {modules.map(
          ({HomeComponent, slug}) =>
            HomeComponent && (
              <Column gutter="sm" key={slug}>
                <Phrase emphasis="strong">{slugToTitle[slug]}</Phrase>
                <HomeComponent />
              </Column>
            ),
        )}
      </Column>
    </Column>
  )
}

const PersonalizedHome = () => {
  const authorizedModules = useAuthorizedModules()
  const contentManagementModules = useMemo(
    () =>
      authorizedModules.filter(
        ({type}) => type === ModuleType.contentManagement,
      ),
    [authorizedModules],
  )

  const otherModules = useMemo(
    () => authorizedModules.filter(({type}) => type === ModuleType.other),
    [authorizedModules],
  )

  if (!authorizedModules.length) {
    return null
  }

  return (
    <Column gutter="xl">
      {contentManagementModules?.length > 0 && (
        <ModulesByType
          modules={contentManagementModules as Module[]}
          type={ModuleType.contentManagement}
        />
      )}
      {otherModules?.length > 0 && (
        <ModulesByType
          modules={otherModules as Module[]}
          type={ModuleType.other}
        />
      )}
    </Column>
  )
}

export default PersonalizedHome
