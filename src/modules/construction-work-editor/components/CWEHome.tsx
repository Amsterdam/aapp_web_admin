import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Row from 'components/ui/layout/Row'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/routes'

const CWEHome = () => {
  const navigate = useNavigate()
  return (
    <Row gutter="md">
      <Button
        flex
        label="Werkzaamheden"
        onClick={() => navigate(ConstructionWorkEditorRoute.projects)}
      />
      <Button
        flex
        label="Redacteuren"
        onClick={() => navigate(ConstructionWorkEditorRoute.editors)}
      />
    </Row>
  )
}

export default CWEHome
