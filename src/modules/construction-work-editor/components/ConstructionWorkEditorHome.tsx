import useGetAuthorizedRoles from 'authentication/hooks/useGetAuthorizedRoles'
import {AzureRole} from 'authentication/types'
import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

const ConstructionWorkEditorHome = () => {
  const authorizedGroups = useGetAuthorizedRoles()

  return (
    <Row gutter="md">
      <NavigationButton
        flex
        label="Werkzaamheden"
        url={ConstructionWorkEditorRoute.projects}
      />
      {(authorizedGroups.includes(AzureRole.constructionWorkEditor)
      || authorizedGroups.includes(AzureRole.constructionWorkEditorDeprecated))
          && (
        <NavigationButton
          flex
          label="Publishers"
          url={ConstructionWorkEditorRoute.publishers}
        />
      )}
    </Row>
  )
}

export default ConstructionWorkEditorHome
