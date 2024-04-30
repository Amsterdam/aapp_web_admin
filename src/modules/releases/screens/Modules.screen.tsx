import {useMemo} from 'react'
import BlockLink from 'components/ui/button/BlockLink'
import NavigationButton from 'components/ui/button/NavigationButton'
import Module from 'components/ui/containers/Module'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import LoadingScreen from 'components/ui/screens/Loading.screen'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useGetModulesQuery} from 'modules/releases/services/modules'
import {ReleasesRoute} from 'modules/releases/types/routes'
import getUrl from 'utils/getUrl'

const ModulesScreen = () => {
  const {data: modules, isLoading} = useGetModulesQuery()

  const sortedModules = useMemo(
    () =>
      modules &&
      [...modules].sort((a, b) => a.title.localeCompare(b.title, 'nl')),
    [modules],
  )

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Modules" />
        <NavigationButton
          label="Module toevoegen"
          route={ReleasesRoute.createModule}
        />
        {sortedModules ? (
          <List>
            {sortedModules.map(({icon, moduleSlug, title}) => (
              <ListItem key={moduleSlug}>
                <BlockLink
                  to={getUrl(ReleasesRoute.module, {slug: moduleSlug})}>
                  <Box>
                    <Module icon={icon} title={title} />
                  </Box>
                </BlockLink>
              </ListItem>
            ))}
          </List>
        ) : (
          <Phrase>Geen modules gevonden.</Phrase>
        )}
      </Column>
    </Screen>
  )
}

export default ModulesScreen
