import {skipToken} from '@reduxjs/toolkit/query'
import {useParams} from 'react-router-dom'
import BlockLink from 'components/ui/button/BlockLink'
import LoadingButton from 'components/ui/button/LoadingButton'
import NavigationButton from 'components/ui/button/NavigationButton'
import Module from 'components/ui/containers/Module'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ErrorScreen from 'components/ui/screens/Error.screen'
import LoadingScreen from 'components/ui/screens/Loading.screen'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {
  useEditModuleMutation,
  useGetModuleQuery,
} from 'modules/releases/services/modules'
import {ModuleStatus} from 'modules/releases/types/module'
import {ReleasesRoute} from 'modules/releases/types/routes'
import getUrl from 'utils/getUrl'

type Params = {
  slug: string
}

const ModuleScreen = () => {
  const {slug} = useParams() as Params
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const latestVersion = module?.versions[0]
  const [editModule, {isLoading: isEditingModule, error: editModuleError}] =
    useEditModuleMutation()

  const handleModuleStatusChange = () => {
    if (!module) {
      return
    }
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Bevestig dat je alle versies van de module ‘${latestVersion?.title}’ ${
          module?.status ? 'uit' : 'aan'
        } wil zetten.`,
      )
    ) {
      editModule({
        slug: module?.slug,
        status:
          module?.status === ModuleStatus.active
            ? ModuleStatus.inactive
            : ModuleStatus.active,
      })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!module?.versions.length) {
    return (
      <ErrorScreen message={`Geen versies gevonden van module ‘${slug}’.`} />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Module" title={latestVersion?.title} />
        <NavigationButton
          label="Moduleversie toevoegen"
          route={getUrl(ReleasesRoute.createModuleVersion, {slug})}
        />
        <List>
          {module.versions.map(({icon, title, version}) => (
            <ListItem key={version}>
              <BlockLink
                to={getUrl(ReleasesRoute.editModuleVersion, {slug, version})}>
                <Box>
                  <Module icon={icon} title={title} version={version} />
                </Box>
              </BlockLink>
            </ListItem>
          ))}
        </List>
        <LoadingButton
          error={editModuleError}
          label={
            module?.status === ModuleStatus.active ? 'Uitzetten' : 'Aanzetten'
          }
          loading={isEditingModule}
          onClick={handleModuleStatusChange}
          variant="secondary"
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
