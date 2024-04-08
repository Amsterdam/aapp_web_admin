import {RouteObject} from 'react-router-dom'
import modules from 'modules'

export const routes: RouteObject[] = modules.map(module => module.routes).flat()
