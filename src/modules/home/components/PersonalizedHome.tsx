import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import useGetHomeComponents from 'modules/home/hooks.ts/useGetHomeComponents'
import slugToTitle from 'utils/slugToTitle'

const PersonalizedHome = () => {
  const homeComponents = useGetHomeComponents()

  if (!homeComponents.length) {
    return null
  }

  return (
    <Column gutter="md">
      <Phrase>Wat wil je beheren?</Phrase>
      <Column gutter="lg">
        {homeComponents.map(
          ({Component, slug}) =>
            Component && (
              <Column gutter="sm" key={slug}>
                <Phrase emphasis="strong">{slugToTitle[slug]}</Phrase>
                <Component />
              </Column>
            ),
        )}
      </Column>
    </Column>
  )
}

export default PersonalizedHome
