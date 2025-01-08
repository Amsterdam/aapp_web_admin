import {Select} from '@amsterdam/design-system-react'
import {Suspense, lazy} from 'react'
import {useParams} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import 'swagger-ui-react/swagger-ui.css'
import useNavigate from 'hooks/useNavigate'
import {defaultSlug, openAPIUrls} from '../constants'
import {SwaggerRoute} from '../types'

const SwaggerUI = lazy(() => import('swagger-ui-react'))

type Params = {
  slug?: string
}

const SwaggerScreen = () => {
  const {slug: activeSlug = defaultSlug} = useParams() as Params

  const active = openAPIUrls.find(({slug}) => slug === activeSlug)
  const navigate = useNavigate()

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Swagger" />
        <Select
          onChange={({target: {value}}) => {
            navigate(SwaggerRoute.swagger, {slug: value})
          }}>
          {openAPIUrls.map(({url, name, slug}) => (
            <Select.Option
              value={slug}
              key={url}
              selected={slug === activeSlug}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <Suspense fallback={<div>Swagger wordt geladen</div>}>
          <SwaggerUI url={active?.url} />
        </Suspense>
      </Column>
    </Screen>
  )
}

export default SwaggerScreen
