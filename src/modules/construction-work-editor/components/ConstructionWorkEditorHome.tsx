import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import {AzureGroup} from 'authentication/types'
import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

const ConstructionWorkEditorHome = () => {
  const authorizedGroups = useGetAuthorizedGroups()

  return (
    <Row gutter="md">
      <NavigationButton
        flex
        label="Werkzaamheden"
        url={ConstructionWorkEditorRoute.projects}
      />
      {authorizedGroups.includes(AzureGroup.editor) && (
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
