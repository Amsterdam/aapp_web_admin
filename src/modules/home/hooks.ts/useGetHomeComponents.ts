import {useCallback} from 'react'
import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import modules from 'modules'
import {ModuleSlug} from 'modules/types'

interface Module {
  allowedAzureGroups?: string[]
  Component?: () => JSX.Element
  slug: ModuleSlug
}

const useGetHomeComponents = () => {
  const authorizedGroups = useGetAuthorizedGroups()

  const getHomeComponent = useCallback(
    () =>
      modules
        .filter(({slug}) => slug !== ModuleSlug.home)
        .reduce(
          (
            accumulator: Module[],
            {allowedAzureGroups, HomeComponent, slug},
          ) => {
            if (
              allowedAzureGroups?.some(group =>
                authorizedGroups.includes(group),
              )
            ) {
              accumulator.push({Component: HomeComponent, slug})
            }
            return accumulator
          },
          [],
        ),
    [authorizedGroups],
  )
  return getHomeComponent()
}

export default useGetHomeComponents
