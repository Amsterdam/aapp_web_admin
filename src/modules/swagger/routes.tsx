import {RouteObject} from 'react-router-dom'
import {swaggerModule} from 'modules/swagger'
import SwaggerScreen from 'modules/swagger/screens/Swagger.screen'
import {SwaggerRoute} from 'modules/swagger/types'

const loader = () => swaggerModule.allowedAzureGroups

export const routes: RouteObject[] = [
  {
    loader,
    path: SwaggerRoute.swagger,
    element: <SwaggerScreen />,
  },
]
