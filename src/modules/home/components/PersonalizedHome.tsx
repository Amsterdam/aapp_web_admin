import useAuthorizedModules from 'authentication/hooks/useAuthorizedModules'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import slugToTitle from 'utils/slugToTitle'

const PersonalizedHome = () => {
  const authorizedModules = useAuthorizedModules()

  if (!authorizedModules.length) {
    return null
  }

  return (
    <Column gutter="md">
      <Phrase>Wat wil je beheren?</Phrase>
      <Column gutter="lg">
        {authorizedModules.map(
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

export default PersonalizedHome
