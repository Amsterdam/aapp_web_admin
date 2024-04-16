import {Slice} from '@reduxjs/toolkit'
import {RouteObject} from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Module<T extends Slice<any> = never> = {
  HomeComponent?: React.ComponentType
  routes: RouteObject[]
  reduxSlice?: T
}
