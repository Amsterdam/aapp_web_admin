import {useParams} from 'react-router-dom'
import SwaggerUI from 'swagger-ui-react'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import 'swagger-ui-react/swagger-ui.css'
import useNavigate from 'hooks/useNavigate'
import {openAPIUrls} from '../constants'
import {SwaggerRoute} from '../types'

type Params = {
  slug?: string
}

const SwaggerScreen = () => {
  const {slug: activeSlug = openAPIUrls[0].slug} = useParams() as Params

  const active = openAPIUrls.find(({slug}) => slug === activeSlug)
  const navigate = useNavigate()

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Swagger" />
        <select
          onChange={({target: {value}}) => {
            navigate(SwaggerRoute.swagger, {slug: value})
          }}>
          {openAPIUrls.map(({url, name, slug}) => (
            <option value={slug} key={url} selected={slug === activeSlug}>
              {name}
            </option>
          ))}
        </select>
        <SwaggerUI url={active?.url} />
      </Column>
    </Screen>
  )
}

export default SwaggerScreen
