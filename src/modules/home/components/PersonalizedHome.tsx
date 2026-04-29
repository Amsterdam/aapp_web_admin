import {useMemo} from 'react'
import useAuthorizedModules from '@/authentication/hooks/useAuthorizedModules'
import Column from '@/components/ui/layout/Column'
import Phrase from '@/components/ui/text/Phrase'
import {Module, ModuleType} from '@/modules/types'

type ModulesByTypeProps = {
  modules: Module[]
  type: ModuleType
}

const ModulesByType = ({modules, type}: ModulesByTypeProps) => {
  const typeTitle =
    type === ModuleType.contentManagement
      ? 'Wat wil je beheren?'
      : 'Andere mogelijkheden'

  return (
    <Column gutter="md">
      <Phrase>{typeTitle}</Phrase>
      <Column gutter="lg">
        {modules.map(
          ({HomeComponent, slug, title}) =>
            HomeComponent && (
              <Column
                gutter="sm"
                key={slug}>
                <Phrase emphasis="strong">{title}</Phrase>
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
          modules={contentManagementModules}
          type={ModuleType.contentManagement}
        />
      )}
      {otherModules?.length > 0 && (
        <ModulesByType
          modules={otherModules}
          type={ModuleType.other}
        />
      )}
    </Column>
  )
}

export default PersonalizedHome
