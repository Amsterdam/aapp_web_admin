import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import BlockLink from 'components/ui/button/BlockLink'
import Button from 'components/ui/button/Button'
import Module from 'components/ui/containers/Module'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import LoadingScreen from 'components/ui/screens/Loading.screen'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {ReleasesRoute} from 'modules/releases/routes'
import {useGetModulesQuery} from 'modules/releases/services/modules'

const ModulesScreen = () => {
  const navigate = useNavigate()
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
        <Button
          label="Module toevoegen"
          onClick={() => {
            navigate(ReleasesRoute.createModule)
          }}
        />
        {sortedModules ? (
          <List>
            {sortedModules.map(({icon, moduleSlug, title}) => (
              <ListItem key={moduleSlug}>
                <BlockLink to={`/module/${moduleSlug}`}>
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
