import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BlockLink from 'components/ui/button/BlockLink'
import Button from 'components/ui/button/Button'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Screen from 'components/ui/layout/Screen'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import LoadingScreen from 'modules/releases/screens/Loading.screen'
import {useGetReleasesQuery} from 'modules/releases/services/releases'
import {getHotfixVersion} from 'modules/releases/utils/getHotfixVersion'

const ReleasesScreen = () => {
  const navigate = useNavigate()

  const {data: releases, isLoading} = useGetReleasesQuery()

  const [addHotfix, setAddHotfix] = useState(false)

  const releaseVersions = useMemo(
    () => releases?.map(({version}) => version),
    [releases],
  )

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Releases" />
        <Button
          label="Release toevoegen"
          onClick={() => navigate('/mbs/release/create')}
          variant={addHotfix ? 'secondary' : 'primary'}
        />
        {(releases?.length ?? 0) > 0 && (
          <Button
            label={
              addHotfix ? 'Hotfix toevoegen annuleren' : 'Hotfix toevoegen'
            }
            onClick={() => {
              setAddHotfix(value => !value)
            }}
            variant={addHotfix ? 'primary' : 'secondary'}
          />
        )}
        {releases?.length ? (
          <List>
            {releases.map(({version, isDeprecated, isSupported}) => {
              const hotfixVersion = getHotfixVersion(version, releaseVersions)
              return (
                <ListItem key={version}>
                  <BlockLink
                    to={
                      addHotfix
                        ? `/mbs/release/hotfix/${hotfixVersion}`
                        : `/mbs/release/${version}`
                    }>
                    <Box>
                      <Row align="between">
                        <Phrase>
                          Release {version}
                          {addHotfix ? ` -> Hotfix: ${hotfixVersion}` : ''}
                        </Phrase>

                        {!!isSupported && (
                          <Phrase emphasis="italic">
                            {isDeprecated ? 'Deprecated' : 'Supported'}
                          </Phrase>
                        )}
                      </Row>
                    </Box>
                  </BlockLink>
                </ListItem>
              )
            })}
          </List>
        ) : (
          <Phrase>Geen releases gevonden.</Phrase>
        )}
      </Column>
    </Screen>
  )
}

export default ReleasesScreen
