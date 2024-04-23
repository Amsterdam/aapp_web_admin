import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Row from 'components/ui/layout/Row'
import {ReleasesRoute} from 'modules/releases/types/routes'

const ReleasesHome = () => {
  const navigate = useNavigate()

  return (
    <Row gutter="md">
      <Button
        flex
        label="Modules"
        onClick={() => navigate(ReleasesRoute.modules)}
      />
      <Button
        flex
        label="Releases"
        onClick={() => navigate(ReleasesRoute.releases)}
      />
    </Row>
  )
}

export default ReleasesHome
